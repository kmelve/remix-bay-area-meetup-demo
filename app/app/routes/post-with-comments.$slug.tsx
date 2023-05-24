import type { ActionArgs, LoaderArgs} from "@remix-run/node";
import { json} from "@remix-run/node";

import { useActionData, useLoaderData } from "@remix-run/react";
import type { CurrentSanityUser } from "@sanity/client";
import { useEffect, useState } from "react";
import { Article } from "~/components/Article";
import { CommentForm } from "~/components/CommentForm";
import { Comments } from "~/components/Comments";
import { NewComment } from "~/components/NewComment";
import { getPost, createComment, getUserData } from "~/utils/sanity";
import type { Comment, Post } from "~/utils/types";


export async function action({ request}: ActionArgs) {
  const body = await request.formData();
  const [postId, name, email, text, published ] = [
    body.get("postId"),
    body.get("name"),
    body.get("email"),
    body.get("text"),
    body.get("published"),
  ]
  const comment = await createComment({name, email, text, published}, postId)

  return json(comment)
}

export const loader = async ({ params }: LoaderArgs) => {
  const post = await getPost(params.slug as string);
  return post;
};

export default function PostRoute() {
  const post = useLoaderData<typeof loader>() as unknown as Post;
  const {comments} = post;

  const [user, setUser] = useState<CurrentSanityUser|null>(null)
  useEffect(() => {
    getUserData().then((userData) => {
      if(userData) {
        setUser(userData)
      }
    })

  })

  const newComment = useActionData<typeof action>() as unknown as Comment;

  return (<>
    <Article post={post} />
    <NewComment text={newComment?.text} />
    {!newComment && <CommentForm postId={post._id} user={user} />}
    <Comments comments={comments} />
  </>);
}

import type { ActionArgs, LoaderArgs} from "@remix-run/node";
import { json} from "@remix-run/node";

import { Outlet, useActionData, useLoaderData } from "@remix-run/react";
import { redirectBack } from "remix-utils";
import { Article } from "~/components/Article";
import { CommentForm } from "~/components/CommentForm";
import { Comments } from "~/components/Comments";
import { NewComment } from "~/components/NewComment";
import { getPost, createComment } from "~/utils/sanity";
import type { Comment, Post } from "~/utils/types";


export async function action({ request}: ActionArgs) {
  const body = await request.formData();
  const [postId, name, email, text ] = [
    body.get("postId"),
    body.get("name"),
    body.get("email"),
    body.get("text"),
  ]
  const comment = await createComment({postId, name, email, text})
  return json(comment)
}


export const loader = async ({ params }: LoaderArgs) => {
  const post = await getPost(params.slug as string);
  return post;
};

export default function PostRoute() {
  const post = useLoaderData<typeof loader>() as unknown as Post;
  const {comments} = post;
  const newComment = useActionData<typeof action>() as unknown as Comment;

  return <>
  <Article post={post} />
  <NewComment text={newComment.text} />
  <CommentForm postId={post._id} />
  <Comments comments={comments} />
  </>;
}

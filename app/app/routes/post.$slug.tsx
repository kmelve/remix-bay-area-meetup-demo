import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Article } from "~/components/Article";
import { getPost } from "~/utils/sanity";
import type { Post } from "~/utils/types";

export const loader = async ({ params }: LoaderArgs) => {
  const post = await getPost(params.slug as string);
  return post;
};

export default function PostRoute() {
  const post = useLoaderData<typeof loader>() as unknown as Post;


  return (<>
    <Article post={post} />
  </>);
}

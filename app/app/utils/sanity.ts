import { createClient } from "@sanity/client";
import groq from "groq";
import type { Post, PostWithComments } from "./types";


const { SANITY_PROJECT_ID, SANITY_DATASET } =
  typeof document === "undefined" ? process.env : window.ENV;

if (!SANITY_PROJECT_ID || !SANITY_DATASET) {
  throw new Error("Did you forget to run sanity init --env?");
}

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: "2023-03-20", // date of setup
});

export async function getPosts(): Promise<Post[]> {
  return await client.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
  );

}

export async function getPost(slug: string): Promise<Post> {
  return await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
      ...,
      "comments": *[_type == "comment" && ^._id == post._ref && published]
    }`,
    {
      slug,
    }
  );
}

export async function createComment(data: any) {
  const token = process.env.SANITY_WRITE_TOKEN
  if (!token) {
    throw new Error("No token")
  }
  const clientWithToken = client.withConfig({token})

  const { name, email, text } = data
  const commentBody = {
    _type: "comment",
    published: false,
    post: {
      _type: "reference",
      _ref: data.postId,
    },
    name,email,text,
  }
  return await clientWithToken.create(commentBody).catch((err) => { console.error(err) });


}
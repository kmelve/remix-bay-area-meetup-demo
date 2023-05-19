import { PortableText } from "@portabletext/react";
import { formatDate } from "~/utils";
import { urlFor } from "~/utils/image";
import type { Post } from "~/utils/types";



export function Article(props: {post: Post}) {
  const { post } = props;
  const { mainImage, title, excerpt, _createdAt, body } = post;
  return (<section className="post">
      {mainImage ? (
        <img
          className="post__cover"
          src={urlFor(mainImage).url()}
          alt="Cover"
        />
      ) : (
        <div className="post__cover--none" />
      )}
      <div className="post__container">
        <h1 className="post__title">{title}</h1>
        <p className="post__excerpt">{excerpt}</p>
        <p className="post__date">{formatDate(_createdAt)}</p>
        <div className="post__content">
          <PortableText value={body} />
        </div>
      </div>
    </section>)
}
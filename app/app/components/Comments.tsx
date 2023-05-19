import { formatDate } from "~/utils"
import type { Comment } from "~/utils/types"


export function Comments(props: {comments: Comment[]}) {
  const { comments } = props
  if (!comments.length) return null
  return (
  <section className="comments">
    <h2>Comments</h2>
    {comments.map(({_id, name, _createdAt, text }) => {
      return (<article key={_id} className="comment">
            <h3>{name}</h3>
            <section><small>{formatDate(_createdAt)}</small></section>
            <p>{text}</p>
          </article>)})}
  </section>)
  }
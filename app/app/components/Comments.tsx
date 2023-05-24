import { formatDate } from "~/utils"
import type { Comment } from "~/utils/types"
import Gravatar from 'react-gravatar'


export function Comments(props: {comments: Comment[]}) {

  const { comments } = props
  if (!comments.length) return null
  return (
  <section className="comments">
    <h2>Comments</h2>
    {comments.map(({_id, name, email, _createdAt, text }) => {
      return (<article key={_id} className="comment">
        <div className="comment__byline">
        <div>
          <Gravatar email={email} size={64} />
        </div>
        <div>
            <h3>{name}</h3>
            <section><small>{formatDate(_createdAt)}</small></section>
        <div className="comment_text">
        <p>{text}</p>
        </div>
        </div>
        </div>
          </article>)})}
  </section>)
  }
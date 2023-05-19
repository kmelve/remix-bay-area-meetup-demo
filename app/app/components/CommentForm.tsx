import { Form } from "@remix-run/react"


export function CommentForm(props: {postId: string}) {
  const {postId} = props
  return (<section><h3>Add a comment</h3>
    <p>Comments are moderated and may take up to 24 hours to appear.</p>
    <Form className="comment_form" method="POST">
      {<input type="hidden" name="postId" value={postId} />}
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Name"
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Email"
          />
        </div>
      <div>
        <label htmlFor="text" className="sr-only">
          Comment
        </label>
        <textarea
          id="text"
          name="text"
          rows={3}
          placeholder="Comment"
          required
        />
      </div>
      <div>
        <button
          type="submit"
        >
          Post comment
        </button>
      </div>
    </Form></section>
)
}
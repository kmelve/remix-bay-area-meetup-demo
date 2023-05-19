

export function NewComment(props) {
  const {text} = props
  if (!text) return null
  return (<p>Thanks for your comment! Here is a preview:</p>
      <blockquote>{text}</blockquote>)
}
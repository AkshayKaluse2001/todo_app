const CommentCard = ({
  comment,
}: {
  comment: { name: string; body: string };
}) => {
  return (
    <div className="p-4 border rounded shadow">
      <h3 className="font-bold">{comment.name}</h3>
      <p>{comment.body}</p>
    </div>
  );
};

export default CommentCard;

const PostCard = ({ post }: { post: { title: string; body: string } }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h3 className="font-bold ">{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
};

export default PostCard;

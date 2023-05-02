const BlogNotification = ({ message }) => {
  if (message === null) {
    return null;
  }
  if (message) {
    return <div className="blog-success">{message}</div>;
  }
};

export default BlogNotification;

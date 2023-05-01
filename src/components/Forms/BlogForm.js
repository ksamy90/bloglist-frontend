const BlogForm = ({
  addBlog,
  newBlog,
  newUrl,
  handleBlogChange,
  handleUrlChange,
}) => {
  return (
    <form onSubmit={addBlog}>
      title:- <input value={newBlog} onChange={handleBlogChange} />
      url:- <input value={newUrl} onChange={handleUrlChange} />
      <button type="submit">save</button>
    </form>
  );
};

export default BlogForm;

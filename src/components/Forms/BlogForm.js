import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = (evt) => {
    evt.preventDefault();
    const blogInfo = {
      title: newBlog,
      url: newUrl,
    };
    createBlog(blogInfo);
    setNewBlog("");
    setNewUrl("");
  };

  const handleBlogChange = (e) => setNewBlog(e.target.value);
  const handleUrlChange = (e) => setNewUrl(e.target.value);
  return (
    <form onSubmit={addBlog}>
      title:-{" "}
      <input
        value={newBlog}
        onChange={handleBlogChange}
        placeholder="input-title"
      />
      url:-{" "}
      <input
        value={newUrl}
        onChange={handleUrlChange}
        placeholder="input-url"
      />
      <button type="submit">save</button>
    </form>
  );
};

export default BlogForm;

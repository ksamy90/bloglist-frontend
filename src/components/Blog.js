import { useState } from "react";
const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [toggle, setToggle] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1,
  };
  const changeBlog = () => {
    updateBlog(blog.id, updatedBlog);
  };
  const deleteBlog = () => {
    removeBlog(blog.id);
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button className="togglebtn" onClick={() => setToggle(!toggle)}>
        {toggle ? "hide" : "view"}
      </button>
      <div>{toggle ? `${blog.url}` : ""}</div>
      <div className="blog">
        {toggle && `${blog.likes}`}
        {toggle && (
          <button className="editblog" onClick={changeBlog}>
            like
          </button>
        )}
        {toggle && <button onClick={deleteBlog}>remove</button>}
      </div>
      <div>{toggle ? `${blog.author}` : ""}</div>
    </div>
  );
};

export default Blog;

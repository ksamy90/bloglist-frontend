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

  const button1 = <button onClick={changeBlog}>like</button>;
  const button2 = <button onClick={deleteBlog}>remove</button>;
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setToggle(!toggle)}>
        {toggle ? "hide" : "view"}
      </button>
      <div>{toggle ? `${blog.url}` : ""}</div>
      <div>
        {toggle && `${blog.likes}`}
        {toggle && button1}
        {toggle && button2}
      </div>
      <div>{toggle ? `${blog.author}` : ""}</div>
    </div>
  );
};

export default Blog;

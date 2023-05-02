import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/Forms/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/Forms/BlogForm";
import BlogNotification from "./components/BlogNotification";
import Togglable from "./components/Forms/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const logoutUser = () => {
    window.localStorage.removeItem("loggedBlogUser");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    setMessage(`${blogObject.title} succesfully created`);
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const updateLike = (blogId, updatedBlog) => {
    const updatedBlogs = blogs.map((blog) => {
      if (blog.id === blogId) {
        blogService.update(blog.id, updatedBlog).then((returnedBlog) => {
          return returnedBlog;
        });
      }
      return blog;
    });
    setBlogs(updatedBlogs);
    console.log(updatedBlogs);
  };
  const deleteBlog = (blogId) => {
    const filterBlog = blogs.map((blog) => {
      if (blog.id === blogId && blog.author === user.username) {
        window.confirm(`${blog.title} succesfully removed`);
        blogService.deleteBlog(blogId).then(() => {
          return blog;
        });
      } else if (blog.id === blogId && blog.author !== user.username) {
        window.confirm("no permissions");
      }
      return blog;
    });
    setBlogs(filterBlog);
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification errorMessage={errorMessage} />
      <BlogNotification message={message} />
      {user === null && (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
      {user !== null && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logoutUser}>logout</button>
          <h2>create new</h2>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => {
              return (
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateBlog={updateLike}
                  removeBlog={deleteBlog}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default App;

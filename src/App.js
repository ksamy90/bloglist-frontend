import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/Forms/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/Forms/BlogForm";
import BlogNotification from "./components/BlogNotification";
import Togglable from "./components/Forms/Togglable";
import { createNotify, showError } from "./reducers/notifyReducer";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const notifyData = useSelector((notification) => notification);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [blogs]);

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
    setUser(null);
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
      // setErrorMessage("wrong username or password");
      dispatch(showError("wrong username or password"));
      setTimeout(() => {
        // setErrorMessage(null);
        dispatch(showError(""));
      }, 5000);
    }
  };
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    // setMessage(`${blogObject.title} succesfully created`);
    dispatch(createNotify(`${blogObject.title} succesfully created`));
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });
    setTimeout(() => {
      // setMessage(null);
      dispatch(createNotify(""));
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

  const handleUsernameChange = ({ target }) => setUsername(target.value);
  const handlePasswordChange = ({ target }) => setPassword(target.value);

  return (
    <div>
      <h2>blogs</h2>
      {notifyData.notification === "wrong username or password" && (
        <Notification errorMessage={notifyData.notification} />
      )}
      {notifyData.notification !== "wrong username or password" && (
        <BlogNotification message={notifyData.notification} />
      )}
      {user === null && (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
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

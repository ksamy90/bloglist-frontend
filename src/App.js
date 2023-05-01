import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/Forms/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/Forms/BlogForm";
import BloNotification from "./components/BlogNotification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);

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

  const handleBlogChange = (e) => setNewBlog(e.target.value);
  const handleUrlChange = (e) => setNewUrl(e.target.value);
  const addBlog = (e) => {
    e.preventDefault();
    const blogInfo = {
      title: newBlog,
      url: newUrl,
    };
    setMessage(`${blogInfo.title} succesfully created`);
    blogService.create(blogInfo).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog("");
      setNewUrl("");
    });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification errorMessage={errorMessage} />
      <BloNotification message={message} />
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
          <BlogForm
            newBlog={newBlog}
            newUrl={newUrl}
            addBlog={addBlog}
            handleBlogChange={handleBlogChange}
            handleUrlChange={handleUrlChange}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

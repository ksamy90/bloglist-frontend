import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog";
import userEvent from "@testing-library/user-event";

test("renders blog author/title", () => {
  const blog = {
    title: "advanced react parts",
    author: "lydia hallie",
    url: "http:hallie.io",
    likes: 22,
  };

  render(<Blog blog={blog} />);
  const element = screen.getByText("advanced react parts lydia hallie");
  expect(element).toBeDefined();
});

test("renders blog url/likes", async () => {
  const blog = {
    title: "advanced react parts",
    author: "lydia hallie",
    url: "http:hallie.io",
    likes: "22",
  };
  const user = userEvent.setup();
  const { container } = render(<Blog blog={blog} />);
  const button = container.querySelector(".togglebtn");
  await user.click(button);
  const element1 = screen.getByText("http:hallie.io");
  const element2 = screen.getByText("22");
  expect(element1).toBeDefined();
  expect(element2).toBeDefined();
});

xtest("clicking the like button calls the event handler", async () => {
  const blog = {
    title: "advanced react parts",
    author: "lydia hallie",
    url: "http:hallie.io",
    likes: 22,
  };
  const mockHandler = jest.fn();

  const { container } = render(<Blog blog={blog} updateBlog={mockHandler} />);
  const user = userEvent.setup();
  const button = container.querySelector(".editblog");
  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

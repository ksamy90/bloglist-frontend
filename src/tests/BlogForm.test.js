import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "../components/Forms/BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates state and calls submit", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const input1 = screen.getByPlaceholderText("input-title");
  const input2 = screen.getByPlaceholderText("input-url");
  const sendButton = screen.getByText("save");

  await user.type(input1, "awesome vue");
  await user.type(input2, "http://vue.io");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].content).toEqual("awesome vue");
  expect(createBlog.mock.calls[1][0].content).toBe("http://vue.io");
});

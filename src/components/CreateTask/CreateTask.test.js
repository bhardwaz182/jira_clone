import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CreateTask from "./CreateTask";

describe("CreateTask component", () => {
  test("renders input fields correctly", () => {
    const mockSubmit = jest.fn();
    render(<CreateTask tasks={[]} setTasks={mockSubmit}/>);

    expect(screen.getByLabelText("Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Description:")).toBeInTheDocument();
    expect(screen.getByLabelText("Deadline:")).toBeInTheDocument();
    expect(screen.getByLabelText("Story points:")).toBeInTheDocument();
    expect(screen.getByLabelText("Assign To:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  test("updates form data on input change", () => {
    const mockSubmit = jest.fn();
    render(<CreateTask tasks={[]} setTasks={mockSubmit}/>);

    const nameInput = screen.getByLabelText("Name:");
    const descriptionInput = screen.getByLabelText("Description:");
    const deadlineInput = screen.getByLabelText("Deadline:");
    const pointsInput = screen.getByLabelText("Story points:");
    const userInput = screen.getByLabelText("Assign To:");

    fireEvent.change(nameInput, { target: { value: "Task 1" } });
    fireEvent.change(descriptionInput, { target: { value: "Task description" } });
    fireEvent.change(deadlineInput, { target: { value: "2023-06-01" } });
    fireEvent.change(pointsInput, { target: { value: "5" } });
    fireEvent.change(userInput, { target: { value: "John Doe" } });

    expect(nameInput.value).toBe("Task 1");
    expect(descriptionInput.value).toBe("Task description");
    expect(deadlineInput.value).toBe("2023-06-01");
    expect(pointsInput.value).toBe("5");
    expect(userInput.value).toBe("John Doe");
  });

  test("validates required fields before submission", () => {
    const mockSubmit = jest.fn();
    render(<CreateTask tasks={[]} setTasks={mockSubmit} setShowAddTask={jest.fn()}/>);
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.click(submitButton);
    expect(screen.getByLabelText("Name:")).toHaveAttribute("required");
    expect(screen.getByLabelText("Deadline:")).toHaveAttribute("required");
  });

});

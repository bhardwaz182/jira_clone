import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskBoard from './TaskBoard';

describe('TaskBoard', () => {
  test('should render TaskBoard component', () => {
    render(<TaskBoard tasks={[]} setTasks={() => {}} />);
    const taskBoardElement = screen.getByTestId('task-board');
    expect(taskBoardElement).toBeInTheDocument();
  });

  test('should display column titles', () => {
    const columns = [
      { id: 1, title: 'To Do', tasks: [] },
      { id: 2, title: 'In Progress', tasks: [] },
      { id: 3, title: 'Done', tasks: [] },
    ];
    render(<TaskBoard tasks={[]} setTasks={() => {}} />);
    columns.forEach((column) => {
      const columnElement = screen.getByText(column.title);
      expect(columnElement).toBeInTheDocument();
    });
  });

  test('should render task cards', () => {
    const tasks = [
      {
        id: 1,
        name: 'Task 1',
        points: 5,
        user_image: 'https://example.com/user.jpg',
        status: 'To Do',
      },
      {
        id: 2,
        name: 'Task 2',
        points: 3,
        user_image: 'https://example.com/user.jpg',
        status: 'In Progress',
      },
    ];
    render(<TaskBoard tasks={tasks} setTasks={() => {}} />);
    tasks.forEach((task) => {
      const taskCard = screen.getByText(task.name);
      expect(taskCard).toBeInTheDocument();
    });
  });

});

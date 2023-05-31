import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Dropdown from './Dropdown';

describe('Dropdown', () => {
  const tasks = [
    {
        "name": "test",
        "description": "test",
        "deadline": "2023-05-08",
        "points": "6",
        "user": "john",
        "id": 1685559281649,
        "status": "To Do",
        "user_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFRmWtO1zrO6tt35ewAJOE9NpAb8yiwhbrBWyxjVQCZw&s"
    },
    {
        "name": "test1",
        "description": "test1",
        "deadline": "2023-05-25",
        "points": "8",
        "user": "john doe",
        "id": 1685559317124,
        "status": "To Do",
        "user_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFRmWtO1zrO6tt35ewAJOE9NpAb8yiwhbrBWyxjVQCZw&s"
    },
    {
        "name": "a",
        "description": "test",
        "deadline": "2023-05-18",
        "points": "9",
        "user": "john",
        "id": 1685559444131,
        "status": "To Do",
        "user_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFRmWtO1zrO6tt35ewAJOE9NpAb8yiwhbrBWyxjVQCZw&s"
    }
];

  test('should render dropdown with options', () => {
    render(<Dropdown tasks={tasks} setTasks={() => {}} />);
    
    const dropdownElement = screen.getByLabelText('Sort by:');
    const dateOption = screen.getByText('Date');
    const nameOption = screen.getByText('Name');
    
    expect(dropdownElement).toBeInTheDocument();
    expect(dateOption).toBeInTheDocument();
    expect(nameOption).toBeInTheDocument();
  });

  test('should call setTasks with sorted tasks when selecting "Name" option', () => {
    const setTasksMock = jest.fn();
    render(<Dropdown tasks={tasks} setTasks={setTasksMock} />);
    
    const dropdownElement = screen.getByLabelText('Sort by:');
    fireEvent.change(dropdownElement, { target: { value: 'name' } });
    
    expect(setTasksMock).toHaveBeenCalledTimes(1);
    expect(setTasksMock).toHaveBeenCalledWith([
        {
            "name": "a",
            "description": "test",
            "deadline": "2023-05-18",
            "points": "9",
            "user": "john",
            "id": 1685559444131,
            "status": "To Do",
            "user_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFRmWtO1zrO6tt35ewAJOE9NpAb8yiwhbrBWyxjVQCZw&s"
        },
        {
            "name": "test",
            "description": "test",
            "deadline": "2023-05-08",
            "points": "6",
            "user": "john",
            "id": 1685559281649,
            "status": "To Do",
            "user_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFRmWtO1zrO6tt35ewAJOE9NpAb8yiwhbrBWyxjVQCZw&s"
        },
        {
            "name": "test1",
            "description": "test1",
            "deadline": "2023-05-25",
            "points": "8",
            "user": "john doe",
            "id": 1685559317124,
            "status": "To Do",
            "user_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFRmWtO1zrO6tt35ewAJOE9NpAb8yiwhbrBWyxjVQCZw&s"
        }
    ]);
  });

  test('should call setTasks with sorted tasks when selecting "Date" option', () => {
    const setTasksMock = jest.fn();
    render(<Dropdown tasks={tasks} setTasks={setTasksMock} />);
    
    const dropdownElement = screen.getByLabelText('Sort by:');
    fireEvent.change(dropdownElement, { target: { value: 'Date' } });
    
    expect(setTasksMock).toHaveBeenCalledTimes(1);
    expect(setTasksMock).toHaveBeenCalledWith([
        {
            "name": "test",
            "description": "test",
            "deadline": "2023-05-08",
            "points": "6",
            "user": "john",
            "id": 1685559281649,
            "status": "To Do",
            "user_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFRmWtO1zrO6tt35ewAJOE9NpAb8yiwhbrBWyxjVQCZw&s"
        },
        {
            "name": "test1",
            "description": "test1",
            "deadline": "2023-05-25",
            "points": "8",
            "user": "john doe",
            "id": 1685559317124,
            "status": "To Do",
            "user_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFRmWtO1zrO6tt35ewAJOE9NpAb8yiwhbrBWyxjVQCZw&s"
        },
        {
            "name": "a",
            "description": "test",
            "deadline": "2023-05-18",
            "points": "9",
            "user": "john",
            "id": 1685559444131,
            "status": "To Do",
            "user_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFRmWtO1zrO6tt35ewAJOE9NpAb8yiwhbrBWyxjVQCZw&s"
        }
    ]);
  });
});

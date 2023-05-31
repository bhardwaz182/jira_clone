import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Card } from './Card';

describe('Card', () => {
  const mockOnDragStart = jest.fn();
  const mockStoryNumber = 1;
  const mockStoryPoints = 5;
  const mockUserImage = 'https://example.com/user-image.jpg';
  const mockChildren = 'Card Content';

  test('should render card with correct content and attributes', () => {
    render(
      <Card
        onDragStart={mockOnDragStart}
        story_number={mockStoryNumber}
        story_points={mockStoryPoints}
        user_image={mockUserImage}
      >
        {mockChildren}
      </Card>
    );

    const cardElement = screen.getByTestId('card');
    const contentElement = screen.getByText(mockChildren);
    const storyNumberElement = screen.getByText(mockStoryNumber.toString());
    const storyPointsElement = screen.getByText(mockStoryPoints.toString());
    const userImageElement = screen.getByAltText('User image');

    expect(cardElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
    expect(storyNumberElement).toBeInTheDocument();
    expect(storyPointsElement).toBeInTheDocument();
    expect(userImageElement).toBeInTheDocument();

    expect(cardElement).toHaveAttribute('draggable', 'true');
    expect(cardElement).toHaveAttribute('data-testid', 'card');
    expect(userImageElement).toHaveAttribute('src', mockUserImage);
    expect(userImageElement).toHaveAttribute('width', '20');
    expect(userImageElement).toHaveAttribute('height', '20');
  });

  test('should call onDragStart and set dataTransfer when dragging card', () => {
    render(
      <Card
        onDragStart={mockOnDragStart}
        story_number={mockStoryNumber}
        story_points={mockStoryPoints}
        user_image={mockUserImage}
      >
        {mockChildren}
      </Card>
    );

    const cardElement = screen.getByTestId('card');
    const dataTransfer = {
      setData: jest.fn(),
    };

    fireEvent.dragStart(cardElement, { dataTransfer });

    expect(mockOnDragStart).toHaveBeenCalledTimes(1);
    expect(mockOnDragStart).toHaveBeenCalledWith(expect.any(Object), mockStoryNumber);
    expect(dataTransfer.setData).toHaveBeenCalledTimes(1);
    expect(dataTransfer.setData).toHaveBeenCalledWith('taskId', mockStoryNumber);
  });
});

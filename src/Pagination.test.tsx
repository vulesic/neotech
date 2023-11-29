import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination component', () => {
  test('renders pagination buttons correctly', () => {
    const mockHandleClick = jest.fn();
    const count = 20;
    const limit = 5;

    render(<Pagination count={count} limit={limit} handleClick={mockHandleClick} />);

    // Check if pagination buttons render
    const page1Button = screen.getByText('1');
    const page2Button = screen.getByText('2');
    expect(page1Button).toBeInTheDocument();
    expect(page2Button).toBeInTheDocument();

    // Simulate click event on a button
    fireEvent.click(page2Button);
    expect(mockHandleClick).toHaveBeenCalledWith(2);
  });

  test('renders no pagination buttons if count is less than or equal to limit', () => {
    const mockHandleClick = jest.fn();
    const count = 5;
    const limit = 10;

    render(<Pagination count={count} limit={limit} handleClick={mockHandleClick} />);

    // Check that no pagination buttons are rendered
    const paginationButtons = screen.queryByRole('button');
    expect(paginationButtons).toBeNull();
  });

  test('updates pagination buttons when count changes', () => {
    const mockHandleClick = jest.fn();
    let count = 20;
    const limit = 5;

    const { rerender } = render(
      <Pagination count={count} limit={limit} handleClick={mockHandleClick} />
    );

    const page1Button = screen.getByText('1');
    const page2Button = screen.getByText('2');
    expect(page1Button).toBeInTheDocument();
    expect(page2Button).toBeInTheDocument();

    // Rerender with a different count
    count = 15;
    rerender(<Pagination count={count} limit={limit} handleClick={mockHandleClick} />);

    const page3Button = screen.getByText('3');
    expect(page3Button).toBeInTheDocument();
  });
});

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

describe('DeleteConfirmationDialog component', () => {
  test('renders delete confirmation dialog with buttons', () => {
    const handleClose = jest.fn();
    const handleDelete = jest.fn();
    const open = true;

    render(
      <DeleteConfirmationDialog
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    );

    // Check if the dialog title and content are rendered
    expect(screen.getByText('Delete Confirmation')).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to delete this employee?')
    ).toBeInTheDocument();

    // Check if the cancel and delete buttons are rendered
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    expect(cancelButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    // Simulate click event on cancel and delete buttons
    fireEvent.click(cancelButton);
    fireEvent.click(deleteButton);
    
    // Check if the handleClose and handleDelete functions are called
    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
  
  test('does not render dialog when not open', () => {
    const handleClose = jest.fn();
    const handleDelete = jest.fn();
    const open = false;

    render(
      <DeleteConfirmationDialog
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    );

    // Check that dialog elements are not rendered
    expect(screen.queryByText('Delete Confirmation')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Are you sure you want to delete this employee?')
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Delete' })).not.toBeInTheDocument();
  });
});

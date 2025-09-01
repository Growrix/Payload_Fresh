import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CommentForm from '@/components/blog/comments/CommentForm';

describe('CommentForm', () => {
  test('renders form fields and validates', async () => {
    render(<CommentForm postId="1" />);

    // fields present
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Comment/i)).toBeInTheDocument();

    // try submit empty
    fireEvent.click(screen.getByRole('button', { name: /Post Comment/i }));

    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Comment content is required/i)).toBeInTheDocument();
    });
  });
});

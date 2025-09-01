import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CommentList from '@/components/blog/comments/CommentList';

describe('CommentList', () => {
  test('renders empty state when no comments', async () => {
    render(<CommentList postId="non-existent" />);

    // Wait for loading skeleton to disappear and empty state to render
    await waitFor(() => {
      expect(screen.getByText(/No Comments Yet/i)).toBeInTheDocument();
    });
  });
});

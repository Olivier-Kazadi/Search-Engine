import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('searching for "cats" should display a list of images', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Search for images');
    const submitButton = screen.getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'cats' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);
    });
  });
});

/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Inventory from './Inventory';
import { act } from 'react-dom/test-utils';

test('renders initial inventory, adds a new row, and deletes a row', async () => {
  render(<Inventory />);

  await act(async () => {
    const initialRows = screen.getAllByRole('row');
    expect(initialRows).toHaveLength(3);

    const addButton = screen.getByRole('button', { name: /레코드 추가/i });
    userEvent.click(addButton);
  });

  expect(screen.getAllByRole('row')).toHaveLength(4);

  await act(async () => {
    const deleteButtons = screen.getAllByLabelText('Delete');
    userEvent.click(deleteButtons[deleteButtons.length - 1]);
  });

  expect(screen.getAllByRole('row')).toHaveLength(3);
});

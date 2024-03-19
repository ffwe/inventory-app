// App.test.tsx
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app with inventory and title', () => {
  render(<App />);
  const linkElement = screen.getByText(/재고 관리 앱/i);
  expect(linkElement).toBeInTheDocument();

  const inventoryComponent = screen.getByTestId('inventory');
  expect(inventoryComponent).toBeInTheDocument();
});

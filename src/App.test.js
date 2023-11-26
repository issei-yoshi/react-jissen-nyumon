import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  const {debug, baseElement } = render(<App />);
  debug(baseElement)
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
})

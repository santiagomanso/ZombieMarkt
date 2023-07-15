import { render, screen } from '@testing-library/react'
import App from './App'

test('renders h1 element title', () => {
  render(<App />)
  screen.findAllByText(/zombiemarkt/i).then((all) => console.log(all))
})

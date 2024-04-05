import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Hero from './Hero'

describe('Hero', () => {
  it('renders Launchpad title', () => {
    render(<Hero />);
    expect(screen.getByText('Launchpad')).toBeInTheDocument()
  })

  it('renders hero copy', () => {
    render(<Hero />)
    expect(screen.getByText('Upcoming launches, dockings, and expeditions')).toBeInTheDocument()
  })

  it('renders Moon component', () => {
    render(<Hero />)
    expect(screen.getByTestId('moon-component')).toBeInTheDocument()
  })
})

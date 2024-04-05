import React from 'react'
import { screen, render } from '@testing-library/react'

import Hero from './Hero'

describe('Hero', () => {
  it('renders title', () => {
    render(<Hero />)
    expect(screen.getByText('Launchpad')).toBeInTheDocument()
  })

  it('renders hero copy', () => {
    render(<Hero />)
    expect(screen.getByText('Upcoming launches, dockings, and expeditions')).toBeInTheDocument()
  })
})

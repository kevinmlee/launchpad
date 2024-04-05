import React from 'react'
import { screen, render } from '@testing-library/react'

import Cards from './Cards';

jest.mock('dayjs', () => {
  const dayjs = jest.requireActual('dayjs')
  const mockDay = jest.fn(() => ({
    isToday: jest.fn(() => true),
    format: jest.fn(() => 'Today')
  }))

  mockDay.extend = () => {}
  return mockDay
})

describe('Cards component', () => {
  test('renders launches', () => {
    const launches = {
      results: [
        {
          id: 1,
          net: '2024-04-05',
          mission: {
            name: 'Mission Name',
            type: 'Mission Type',
            description: 'Mission Description',
          },
          status: { abbrev: 'success' },
          launch_service_provider: { name: 'Launch Service Provider' },
          image: 'image-url'
        }
      ]
    }

    render(<Cards launches={launches} />)

    expect(screen.getByText('Mission Name')).toBeInTheDocument()
    expect(screen.getByText('Mission Type')).toBeInTheDocument()
    expect(screen.getByText('Launch Service Provider')).toBeInTheDocument()
  })

  test('renders expeditions', () => {
    const expeditions = {
      results: [
        {
          id: 1,
          name: 'Expedition Name',
          mission_patches: [{ image_url: 'image-url', agency: { name: 'Agency Name', type: 'Agency Type' } }],
          start: '2024-04-05',
          spacestation: { name: 'Spacestation Name' }
        }
      ]
    }

    render(<Cards expeditions={expeditions} />)

    expect(screen.getByText('Expedition Name')).toBeInTheDocument()
    expect(screen.getByText('Agency Type')).toBeInTheDocument()
    expect(screen.getByText('Spacestation Name')).toBeInTheDocument()
  })
})

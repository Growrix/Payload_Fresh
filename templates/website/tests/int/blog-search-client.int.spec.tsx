import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import BlogSearchClient from '@/components/blog/BlogSearchClient'

// Mock Next.js router
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('BlogSearchClient', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render search input and icon', () => {
    render(<BlogSearchClient />)

    const searchInput = screen.getByPlaceholderText('Search articles...')
    const searchIcon = screen.getByRole('img', { hidden: true }) // SVG icon

    expect(searchInput).toBeInTheDocument()
    expect(searchIcon).toBeInTheDocument()
  })

  it('should update input value when typing', () => {
    render(<BlogSearchClient />)

    const searchInput = screen.getByPlaceholderText('Search articles...')
    fireEvent.change(searchInput, { target: { value: 'test search' } })

    expect(searchInput).toHaveValue('test search')
  })

  it('should navigate to search page on form submission', () => {
    render(<BlogSearchClient />)

    const searchInput = screen.getByPlaceholderText('Search articles...')
    const form = searchInput.closest('form')

    fireEvent.change(searchInput, { target: { value: 'test query' } })
    fireEvent.submit(form!)

    expect(mockPush).toHaveBeenCalledWith('/blog/search?q=test%20query')
  })

  it('should handle empty search query', () => {
    render(<BlogSearchClient />)

    const searchInput = screen.getByPlaceholderText('Search articles...')
    const form = searchInput.closest('form')

    fireEvent.submit(form!)

    expect(mockPush).toHaveBeenCalledWith('/blog/search?q=')
  })

  it('should encode special characters in search query', () => {
    render(<BlogSearchClient />)

    const searchInput = screen.getByPlaceholderText('Search articles...')
    const form = searchInput.closest('form')

    fireEvent.change(searchInput, { target: { value: 'test & query' } })
    fireEvent.submit(form!)

    expect(mockPush).toHaveBeenCalledWith('/blog/search?q=test%20%26%20query')
  })

  it('should have proper accessibility attributes', () => {
    render(<BlogSearchClient />)

    const searchInput = screen.getByPlaceholderText('Search articles...')

    expect(searchInput).toHaveAttribute('type', 'text')
    expect(searchInput).toHaveAttribute('placeholder', 'Search articles...')
  })

  it('should have proper form structure', () => {
    render(<BlogSearchClient />)

    const form = screen.getByRole('form', { hidden: true })
    const searchInput = screen.getByPlaceholderText('Search articles...')

    expect(form).toContainElement(searchInput)
  })
})

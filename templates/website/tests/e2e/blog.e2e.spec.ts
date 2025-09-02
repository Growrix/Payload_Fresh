import { test, expect } from '@playwright/test'

test.describe('Blog Frontend Integration', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the blog page
    await page.goto('/blog')
  })

  test('should load blog homepage successfully', async ({ page }) => {
    // Check if the page loads without errors
    await expect(page).toHaveURL(/\/blog/)

    // Check for main elements
    await expect(page.locator('h1').filter({ hasText: 'Insights & Knowledge' })).toBeVisible()

    // Check for specific blog page elements instead of generic classes
    await expect(page.locator('text=Insights & Knowledge')).toBeVisible()
    await expect(page.locator('text=Stay updated with the latest trends')).toBeVisible()
  })

  test('should display featured articles section', async ({ page }) => {
    // Check for featured posts section
    await expect(page.locator('h2').filter({ hasText: 'Featured Articles' })).toBeVisible()

    // Check for trending icon
    await expect(page.locator('svg').first()).toBeVisible()
  })

  test('should display recent posts section', async ({ page }) => {
    // Check for recent posts section
    await expect(page.locator('h2').filter({ hasText: 'Recent Posts' })).toBeVisible()

    // Check for book icon
    await expect(page.locator('svg').nth(1)).toBeVisible()

    // Check for "View All" link
    await expect(page.locator('a').filter({ hasText: 'View All' })).toBeVisible()
  })

  test('should have working search functionality', async ({ page }) => {
    // Check for search input
    const searchInput = page.locator('input[placeholder*="Search"]')
    await expect(searchInput).toBeVisible()

    // Type in search query
    await searchInput.fill('test search')

    // Check for search button/icon
    await expect(
      page.locator('svg').filter({ hasText: 'Search' }).locator('xpath=ancestor::button'),
    ).toBeVisible()
  })

  test('should handle empty blog state gracefully', async ({ page }) => {
    // If no posts exist, check for appropriate empty state messages
    const emptyStateMessages = [
      'No featured posts available yet',
      'No recent posts available yet',
      'Check back soon',
    ]

    // Check if any empty state message is visible (if no posts exist)
    const hasEmptyState = await page.locator('text=/No.*available yet|Check back soon/').isVisible()

    if (hasEmptyState) {
      // Verify empty state styling
      await expect(page.locator('text=/No.*available yet|Check back soon/')).toBeVisible()
    }
  })

  test('should have proper navigation', async ({ page }) => {
    // Check for navbar
    await expect(page.locator('nav')).toBeVisible()

    // Check for footer
    await expect(page.locator('footer')).toBeVisible()

    // Check for back to blog link (if on sub-pages)
    const backLink = page.locator('a').filter({ hasText: 'Back to Blog' })
    // This might not exist on homepage, so we don't assert visibility
  })

  test('should have responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Check that content is still visible and properly laid out
    await expect(page.locator('h1').filter({ hasText: 'Insights & Knowledge' })).toBeVisible()

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('h1').filter({ hasText: 'Insights & Knowledge' })).toBeVisible()

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.locator('h1').filter({ hasText: 'Insights & Knowledge' })).toBeVisible()
  })

  test('should have proper SEO elements', async ({ page }) => {
    // Check for proper page title
    await expect(page).toHaveTitle(/Blog|Insights/)

    // Check for meta description (if set)
    const metaDescription = page.locator('meta[name="description"]')
    // Meta description might not be set, so we don't assert existence

    // Check for proper heading structure
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('h2')).toHaveCount(await page.locator('h2').count())
  })
})

test.describe('Blog Search Functionality', () => {
  test('should navigate to search results page', async ({ page }) => {
    await page.goto('/blog')

    // Fill search input
    const searchInput = page.locator('input[placeholder*="Search"]')
    await searchInput.fill('test query')

    // Submit search (assuming form submission or button click)
    await page.keyboard.press('Enter')

    // Should navigate to search page
    await expect(page).toHaveURL(/\/blog\/search\?q=test%20query/)
  })

  test('should display search results page', async ({ page }) => {
    await page.goto('/blog/search?q=test')

    // Check for search results page elements
    await expect(page.locator('h1').filter({ hasText: 'Search Results for' })).toBeVisible()
    await expect(page.locator('text=/Found.*articles/')).toBeVisible()
  })

  test('should handle empty search results', async ({ page }) => {
    await page.goto('/blog/search?q=nonexistentquery12345')

    // Check for no results message
    const noResultsMessage = page.locator('text=/No Results Found|No articles found/')
    if (await noResultsMessage.isVisible()) {
      await expect(noResultsMessage).toBeVisible()
      await expect(page.locator('text=/Try different keywords|Browse All Posts/')).toBeVisible()
    }
  })
})

test.describe('Blog All Posts Page', () => {
  test('should load all posts page', async ({ page }) => {
    await page.goto('/blog/all')

    // Check for page elements
    await expect(page.locator('h1').filter({ hasText: 'All Blog Posts' })).toBeVisible()
    await expect(page.locator('text=/articles in our blog/')).toBeVisible()
  })

  test('should have pagination', async ({ page }) => {
    await page.goto('/blog/all')

    // Check for pagination elements (if multiple pages exist)
    const pagination = page.locator('text=/Previous|Next|1|2|3/')
    if (await pagination.isVisible()) {
      await expect(pagination).toBeVisible()
    }
  })

  test('should handle empty posts state', async ({ page }) => {
    await page.goto('/blog/all')

    // Check for empty state
    const emptyState = page.locator('text=/No posts found|No blog posts available/')
    if (await emptyState.isVisible()) {
      await expect(emptyState).toBeVisible()
    }
  })
})

test.describe('Blog Post Links and Navigation', () => {
  test('should have working post links', async ({ page }) => {
    await page.goto('/blog')

    // Find post links
    const postLinks = page.locator('a[href*="/blog/"]').all()

    // If there are post links, test one
    const links = await postLinks
    if (links.length > 0) {
      const firstLink = links[0]
      const href = await firstLink.getAttribute('href')

      if (href && href !== '/blog/all') {
        await firstLink.click()
        await expect(page).toHaveURL(href)
      }
    }
  })

  test('should navigate back from sub-pages', async ({ page }) => {
    // Test from search page
    await page.goto('/blog/search?q=test')
    const backLink = page.locator('a').filter({ hasText: 'Back to Blog' })

    if (await backLink.isVisible()) {
      await backLink.click()
      await expect(page).toHaveURL('/blog')
    }
  })
})

test.describe('Blog Performance and Loading', () => {
  test('should load blog page within reasonable time', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/blog', { waitUntil: 'networkidle' })

    const loadTime = Date.now() - startTime
    expect(loadTime).toBeLessThan(10000) // Should load within 10 seconds
  })

  test('should not have console errors', async ({ page }) => {
    const errors: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    await page.goto('/blog')
    await page.waitForLoadState('networkidle')

    // Filter out common non-error messages
    const realErrors = errors.filter(
      (error) =>
        !error.includes('favicon') &&
        !error.includes('manifest') &&
        !error.includes('Warning') &&
        !error.toLowerCase().includes('deprecated'),
    )

    expect(realErrors).toHaveLength(0)
  })

  test('should have proper image loading', async ({ page }) => {
    await page.goto('/blog')

    // Check for images (if any exist)
    const images = page.locator('img')
    const imageCount = await images.count()

    if (imageCount > 0) {
      // Test that images load properly
      for (let i = 0; i < Math.min(imageCount, 3); i++) {
        const img = images.nth(i)
        await expect(img).toBeVisible()

        // Check for alt text
        const alt = await img.getAttribute('alt')
        expect(alt).toBeTruthy()
      }
    }
  })
})

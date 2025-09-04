// Simple in-memory rate limiting utility
// For production, use Redis or a proper rate limiting service

interface RateLimitEntry {
  count: number
  resetTime: number
}

class RateLimiter {
  private storage = new Map<string, RateLimitEntry>()
  private windowMs: number
  private maxRequests: number

  constructor(windowMs: number = 15 * 60 * 1000, maxRequests: number = 5) {
    this.windowMs = windowMs // 15 minutes default
    this.maxRequests = maxRequests // 5 requests default

    // Clean up expired entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000)
  }

  check(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now()
    const entry = this.storage.get(identifier)

    if (!entry || now > entry.resetTime) {
      // First request or window expired
      const resetTime = now + this.windowMs
      this.storage.set(identifier, { count: 1, resetTime })
      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        resetTime,
      }
    }

    if (entry.count >= this.maxRequests) {
      // Rate limit exceeded
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
      }
    }

    // Increment count
    entry.count++
    this.storage.set(identifier, entry)

    return {
      allowed: true,
      remaining: this.maxRequests - entry.count,
      resetTime: entry.resetTime,
    }
  }

  private cleanup() {
    const now = Date.now()
    for (const [key, entry] of this.storage.entries()) {
      if (now > entry.resetTime) {
        this.storage.delete(key)
      }
    }
  }

  // Get current status without incrementing
  getStatus(identifier: string): { count: number; remaining: number; resetTime: number } {
    const now = Date.now()
    const entry = this.storage.get(identifier)

    if (!entry || now > entry.resetTime) {
      return {
        count: 0,
        remaining: this.maxRequests,
        resetTime: now + this.windowMs,
      }
    }

    return {
      count: entry.count,
      remaining: Math.max(0, this.maxRequests - entry.count),
      resetTime: entry.resetTime,
    }
  }
}

// Contact form rate limiter: 5 submissions per 15 minutes per IP
export const contactRateLimiter = new RateLimiter(15 * 60 * 1000, 5)

// General API rate limiter: 50 requests per 15 minutes per IP
export const apiRateLimiter = new RateLimiter(15 * 60 * 1000, 50)

export default RateLimiter

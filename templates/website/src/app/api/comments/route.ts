import { NextRequest, NextResponse } from 'next/server'
import { createComment, getCommentThreads, type CreateCommentData } from '@/lib/api/comments'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const postId = searchParams.get('postId')

  if (!postId) {
    return NextResponse.json({ error: 'Post ID is required' }, { status: 400 })
  }

  try {
    const comments = await getCommentThreads(postId)
    return NextResponse.json({ comments }, { status: 200 })
  } catch (error) {
    console.error('Failed to fetch comments:', error)
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: CreateCommentData = await request.json()

    // Basic validation
    if (!data.postId || !data.content || !data.authorName || !data.authorEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (data.content.length < 10) {
      return NextResponse.json(
        { error: 'Comment must be at least 10 characters long' },
        { status: 400 },
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.authorEmail)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const comment = await createComment(data)
    return NextResponse.json({ comment }, { status: 201 })
  } catch (error) {
    console.error('Failed to create comment:', error)
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 })
  }
}

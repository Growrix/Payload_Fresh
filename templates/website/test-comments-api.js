// Test Comments API
console.log('Testing Comments API...')

// Get the post ID from the current blog post
const testPostId = '6744f1eebe04b74b5e4c3b6b' // This should be the actual post ID

async function testCommentsAPI() {
  try {
    console.log('Fetching comments for post:', testPostId)

    const response = await fetch(`http://localhost:3002/api/comments?postId=${testPostId}`)

    if (!response.ok) {
      console.error('API Response not OK:', response.status, response.statusText)
      const errorText = await response.text()
      console.error('Error text:', errorText)
      return
    }

    const data = await response.json()
    console.log('API Response:', JSON.stringify(data, null, 2))
    console.log('Number of comments:', data.comments?.length || 0)

    // Log each comment
    if (data.comments && data.comments.length > 0) {
      data.comments.forEach((comment, index) => {
        console.log(`Comment ${index + 1}:`)
        console.log('  Status:', comment.status)
        console.log('  Author:', comment.author?.name)
        console.log('  Content preview:', comment.content ? 'Has content' : 'No content')
        console.log('  Created:', comment.createdAt)
      })
    } else {
      console.log('No comments found')
    }
  } catch (error) {
    console.error('Error testing API:', error)
  }
}

// Run the test
testCommentsAPI()

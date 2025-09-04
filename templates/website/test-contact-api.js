// Test script for contact form API
const testContactAPI = async () => {
  try {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Company',
      projectType: 'website',
      budget: '5k-15k',
      message: 'This is a test message from API to verify the contact form is working correctly.',
    }

    console.log('Testing contact form API...')
    console.log('Test data:', testData)

    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    })

    const result = await response.json()

    console.log('Response status:', response.status)
    console.log('Response data:', result)

    if (result.success) {
      console.log('✅ Contact form API is working correctly!')
      console.log('Submission ID:', result.submissionId)
    } else {
      console.log('❌ Contact form API failed:')
      console.log('Error:', result.error)
      if (result.validationErrors) {
        console.log('Validation errors:', result.validationErrors)
      }
    }
  } catch (error) {
    console.error('❌ API test failed:', error.message)
  }
}

testContactAPI()

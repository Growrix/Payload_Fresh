// Test script for Prompt 10 features
import { checkSlugUnique, pickFeaturedImage } from '../lib/mocks/blogAdapter';

async function testFeatures() {
  console.log('Testing Prompt 10 features...');
  
  // Test 1: Slug check
  console.log('\n1. Testing slug check:');
  try {
    const result1 = await checkSlugUnique('hello-world');
    console.log('hello-world:', result1);
    
    const result2 = await checkSlugUnique('my-new-post');
    console.log('my-new-post:', result2);
  } catch (error) {
    console.error('Slug check error:', error);
  }
  
  // Test 2: Featured image picker
  console.log('\n2. Testing featured image picker:');
  try {
    const asset = await pickFeaturedImage();
    console.log('Picked asset:', asset);
  } catch (error) {
    console.error('Featured image error:', error);
  }
}

testFeatures();

# OAuth Authentication Setup Guide

## Current Status ⚠️

- **Frontend**: Signin and signup pages ready with beautiful UI ✅
- **API Endpoints**: NextAuth.js configured ✅
- **Google OAuth**: Needs real API keys ❌
- **Apple OAuth**: Structured but needs additional setup ❌

## Quick Fix for Google OAuth

### Step 1: Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Google+ API** or **Google Identity API**
4. Go to **APIs & Services** → **Credentials**
5. Click **Create Credentials** → **OAuth 2.0 Client IDs**
6. Configure OAuth consent screen if prompted:
   - Application type: **Web application**
   - Application name: **GrowRix Website**
   - Authorized domains: `localhost` (for development)
7. For the OAuth 2.0 Client ID:
   - Application type: **Web application**
   - Name: **GrowRix OAuth Client**
   - Authorized JavaScript origins: `http://localhost:3002`
   - Authorized redirect URIs: `http://localhost:3002/api/auth/callback/google`

### Step 2: Update Environment Variables

Replace the placeholder values in `.env`:

```bash
# Replace these with your real Google OAuth credentials
GOOGLE_CLIENT_ID=your-actual-google-client-id-here
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret-here
```

### Step 3: Test OAuth Flow

1. Restart your development server
2. Go to http://localhost:3002/signin
3. Click "Continue with Google"
4. You should see Google's account selection screen

## Why It's Not Working Currently

The current issue is that we have placeholder credentials:

- `GOOGLE_CLIENT_ID=test-google-client-id`
- `GOOGLE_CLIENT_SECRET=test-google-client-secret`

These are not real OAuth credentials, so Google's OAuth service rejects the authentication requests.

## Apple OAuth Setup (Optional)

Apple OAuth requires:

1. Apple Developer Account ($99/year)
2. App ID configuration
3. Service ID for Sign in with Apple
4. Private key for authentication

For now, Google OAuth is sufficient for testing.

## Testing Instructions

### 1. Start Development Server

```bash
cd F:\PROJECTS\GROWRIX PROJECT\Payload_Fresh\templates\website
npm run dev
```

### 2. Test Pages

- **Signin**: http://localhost:3002/signin
- **Signup**: http://localhost:3002/signup
- **Admin**: http://localhost:3002/admin

### 3. Test Flows

1. **Email/Password**: Works with mock authentication
2. **Google OAuth**: Will redirect to OAuth flow (needs real API keys)
3. **Apple OAuth**: Shows setup message

## Next Steps

1. **Get Google OAuth Keys**: Follow setup guide above
2. **Update .env file**: Add real Google credentials
3. **Test OAuth Flow**: Verify Google signin works
4. **Integrate with Payload CMS**: Connect OAuth users to Payload user system
5. **Add Apple OAuth**: If needed for production

## File Structure

```
src/
├── app/
│   ├── api/auth/
│   │   ├── [...nextauth]/route.ts    # NextAuth configuration
│   │   ├── signin/route.ts           # Email/password signin
│   │   └── signup/route.ts           # Email/password signup
│   └── (frontend)/
│       ├── signin/page.tsx           # Signin UI
│       └── signup/page.tsx           # Signup UI
└── providers/
    └── AuthProvider.tsx              # NextAuth session provider
```

## Security Notes

- Never commit real API keys to version control
- Use environment variables for all secrets
- Set up proper CORS in production
- Validate all inputs on server side

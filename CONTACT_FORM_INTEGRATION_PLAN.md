# Contact Form Integration Plan

## Current Status Audit

### ✅ **Existing Components:**

- **ContactForm Component**: Basic UI-only form with local state management
- **DirectContactCard**: Static contact information display
- **Contact Page**: Proper layout structure with ContactForm + DirectContactCard

### ❌ **Missing/Non-Functional:**

- **Backend API**: No API endpoint for form submission
- **Database Collection**: No Payload CMS collection for contact submissions
- **Form Validation**: Basic HTML validation only
- **File Upload**: Mock implementation only
- **Email Integration**: No email sending functionality
- **reCAPTCHA**: No spam protection
- **Admin Dashboard**: No admin interface for managing submissions
- **Success/Error Handling**: Fake success message only

---

## Implementation Plan

### Phase 1: Database & Collection Setup

#### 1.1 Create Contact Submissions Collection

**File**: `src/collections/ContactSubmissions.ts`

```typescript
- Collection: 'contact-submissions'
- Fields:
  * name (text, required)
  * email (email, required)
  * company (text, optional)
  * projectType (select: Website, Mobile App, Design, Other)
  * budget (select: $5k-$15k, $15k-$50k, $50k+)
  * message (textarea, required)
  * attachments (upload, multiple files)
  * status (select: New, In Review, Contacted, Closed)
  * source (text: 'website-contact-form')
  * ipAddress (text)
  * userAgent (text)
  * submittedAt (date, auto)
```

#### 1.2 Update Payload Config

**File**: `src/payload.config.ts`

- Add ContactSubmissions to collections array
- Configure admin panel grouping

### Phase 2: API Development

#### 2.1 Contact Form API Endpoint

**File**: `src/app/api/contact/route.ts`

```typescript
POST /api/contact
- Validate form data (server-side)
- Verify reCAPTCHA token
- Handle file uploads
- Store in Payload CMS
- Send notification emails
- Return success/error response
```

#### 2.2 File Upload API

**File**: `src/app/api/contact/upload/route.ts`

```typescript
POST /api/contact/upload
- Handle multiple file uploads
- Validate file types/sizes
- Store in Payload Media collection
- Return file IDs for form submission
```

### Phase 3: Frontend Enhancement

#### 3.1 Enhanced ContactForm Component

**File**: `src/components/growrix/ContactForm.tsx`

**Features to Add:**

- **Form Validation**: Client-side validation with error messages
- **File Upload**: Drag & drop functionality with progress indicators
- **reCAPTCHA**: Google reCAPTCHA v3 integration
- **Loading States**: Loading spinners and disabled states
- **Error Handling**: Proper error message display
- **Success Handling**: Success confirmation with animation
- **Form Reset**: Clear form after successful submission
- **TypeScript**: Proper type definitions

#### 3.2 File Upload Component

**File**: `src/components/growrix/FileUpload.tsx`

```typescript
- Drag & drop zone
- File preview with thumbnails
- Progress indicators
- File validation (type, size)
- Remove uploaded files
- Multiple file support
```

### Phase 4: Email Integration

#### 4.1 Email Service Setup

**Options:**

1. **SendGrid** (Recommended - reliable, good free tier)
2. **Resend** (Modern, developer-friendly)
3. **Nodemailer + SMTP** (AWS SES, Gmail)

#### 4.2 Email Templates

**Files**: `src/email-templates/`

1. **Admin Notification Email**:

   - New contact form submission alert
   - Include all form data
   - Link to admin panel

2. **User Confirmation Email**:
   - Thank you message
   - Next steps information
   - Contact information

#### 4.3 Email Sending Logic

**File**: `src/lib/email.ts`

```typescript
- sendAdminNotification()
- sendUserConfirmation()
- Email template rendering
- Error handling and retries
```

### Phase 5: reCAPTCHA Integration

#### 5.1 Google reCAPTCHA Setup

**Requirements:**

- Register domain with Google reCAPTCHA
- Get Site Key and Secret Key
- Add to environment variables

#### 5.2 Frontend Integration

**File**: `src/components/growrix/ContactForm.tsx`

```typescript
- Load reCAPTCHA script
- Generate token on form submission
- Handle reCAPTCHA errors
- Invisible reCAPTCHA v3 implementation
```

#### 5.3 Backend Verification

**File**: `src/lib/recaptcha.ts`

```typescript
- Verify reCAPTCHA token with Google API
- Score validation (v3)
- Error handling
```

### Phase 6: Admin Dashboard Enhancement

#### 6.1 Contact Submissions Admin Panel

**Features:**

- List view with filtering/sorting
- Status management (New → In Review → Contacted → Closed)
- Search functionality
- Export to CSV
- Bulk actions
- Response tracking

#### 6.2 Email Templates Management

**Features:**

- Admin interface for email template editing
- Preview functionality
- Template variables

### Phase 7: Advanced Features

#### 7.1 Analytics & Tracking

- Form submission tracking
- Conversion rate monitoring
- Source tracking (UTM parameters)
- A/B testing for form variations

#### 7.2 Webhook Integration

- Slack notifications for new submissions
- CRM integration (HubSpot, Salesforce)
- Zapier webhook for automation

#### 7.3 Rate Limiting

- Prevent spam submissions
- IP-based rate limiting
- CAPTCHA for suspicious activity

---

## Technical Stack

### Backend:

- **Database**: MongoDB (existing)
- **CMS**: Payload CMS (existing)
- **API**: Next.js API Routes
- **Email**: SendGrid/Resend
- **File Storage**: Payload Media Collection

### Frontend:

- **Framework**: Next.js 15 (existing)
- **Styling**: Tailwind CSS (existing)
- **Animation**: Framer Motion (existing)
- **Validation**: Zod/Yup
- **File Upload**: react-dropzone
- **reCAPTCHA**: react-google-recaptcha

### Environment Variables Needed:

```bash
# Email Service
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=

# reCAPTCHA
RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=

# Contact Form
ADMIN_EMAIL=
CONTACT_WEBHOOK_URL=
```

---

## Security Considerations

1. **Input Validation**: Server-side validation for all inputs
2. **File Upload Security**: File type validation, size limits, virus scanning
3. **Rate Limiting**: Prevent spam and abuse
4. **CSRF Protection**: Built-in Next.js protection
5. **Data Sanitization**: Prevent XSS attacks
6. **reCAPTCHA**: Spam prevention
7. **IP Logging**: Track submission sources

---

## Performance Optimizations

1. **Lazy Loading**: Load reCAPTCHA script only when needed
2. **Image Optimization**: Compress uploaded images
3. **Caching**: Cache form validation rules
4. **Background Processing**: Async email sending
5. **CDN**: Use CDN for file uploads

---

## Testing Strategy

### Unit Tests:

- Form validation functions
- Email sending functions
- File upload utilities
- reCAPTCHA verification

### Integration Tests:

- API endpoint testing
- Database operations
- Email delivery
- File upload workflow

### E2E Tests:

- Complete form submission flow
- File upload functionality
- Error handling scenarios
- Success confirmation

---

## Deployment Checklist

1. **Environment Variables**: Set up all required env vars
2. **Email Service**: Configure SendGrid/Resend
3. **reCAPTCHA**: Register domain and configure keys
4. **File Storage**: Configure file upload limits
5. **Database**: Ensure collection indexes
6. **DNS**: Set up SPF/DKIM for email delivery
7. **Monitoring**: Set up error tracking
8. **Backup**: Database backup strategy

---

## Timeline Estimate

- **Phase 1-2** (Backend): 2-3 days
- **Phase 3** (Frontend): 2-3 days
- **Phase 4** (Email): 1-2 days
- **Phase 5** (reCAPTCHA): 1 day
- **Phase 6** (Admin): 1-2 days
- **Phase 7** (Advanced): 2-3 days
- **Testing & Polish**: 2-3 days

**Total**: 11-17 days

---

## Success Metrics

1. **Functionality**: 100% form submission success rate
2. **Security**: Zero spam submissions post-reCAPTCHA
3. **Performance**: <2s form submission time
4. **UX**: <5% form abandonment rate
5. **Deliverability**: >95% email delivery rate
6. **Admin**: <1 minute response time for admins

---

## Next Steps

1. **Approve Plan**: Review and approve this implementation plan
2. **Environment Setup**: Configure required services (SendGrid, reCAPTCHA)
3. **Phase 1 Implementation**: Start with database collection creation
4. **Incremental Development**: Implement phases sequentially
5. **Testing**: Test each phase thoroughly before moving to next
6. **Deployment**: Deploy to staging environment for final testing

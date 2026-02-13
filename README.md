# Thrivelab Giveaway - Multi-Step Form

A production-ready multi-step giveaway form built with Next.js, TypeScript, and PostgreSQL.

## Live Demo

[View Live Application](https://thrivelab-giveaway-test-git-main-fersycodes-projects.vercel.app/giveaway)

## Features

- Multi-step form with progress tracking
- Client-side validation with visual feedback
- Phone number masking (US format)
- Draft persistence using localStorage
- Duplicate email detection (409 Conflict)
- Error handling with user-friendly messages
- Fully responsive design
- Backend API with Zod validation
- PostgreSQL database via Supabase

## Tech Stack

**Frontend:**
- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS
- React Context API for state management

**Backend:**
- Next.js API Routes
- Zod for validation
- Supabase (PostgreSQL)

## Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### 1. Clone the repository
```bash
git clone https://github.com/fersycode/thrivelab-giveaway-test.git
cd thrivelab-giveaway-test
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=supabase_anon_key
```

### 4. Set up Supabase database

Run this SQL in your Supabase SQL Editor:
```sql
CREATE TABLE giveaway_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  instagram_handle TEXT,
  phone TEXT NOT NULL,
  pain_area TEXT NOT NULL,
  pain_area_other TEXT,
  why_not_yet TEXT[] NOT NULL,
  interest_level TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 5. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing the Application

### Happy Path
1. Fill all required fields in Step 1
2. Select a pain area in Step 2
3. Select at least one reason in Step 3
4. Select interest level in Step 4
5. Submit the form
6. See success confirmation

### Error Scenarios
- Try submitting with empty required fields → Button should be disabled
- Submit same email twice → Should show "You have already entered this giveaway"
- Refresh page mid-flow → Progress should be preserved

## Project Structure
```
├── app/
│   ├── api/giveaway/route.ts    # API endpoint
│   ├── giveaway/page.tsx        # Main form page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── ui/                      # Reusable UI components
│   └── steps/                   # Form step components
├── lib/
│   ├── FormContext.tsx          # React Context for form state
│   ├── types.ts                 # TypeScript types
│   ├── validation.ts            # Zod schemas
│   ├── utils.ts                 # Utility functions
│   └── supabase.ts              # Supabase client
└── .env.local                   # Environment variables
```

## Key Implementation Details

### State Persistence
Form data persists in `localStorage` to handle page refreshes. This ensures users don't lose progress if they accidentally close the browser.

### Validation Strategy
- **Client-side:** Real-time validation with visual feedback
- **Server-side:** Zod schema validation in API route
- **Database:** Email uniqueness constraint

### Error Handling
- 409 Conflict: Duplicate email
- 400 Bad Request: Validation failure
- 500 Internal Server Error: Database issues

## Trade-offs & Assumptions

### Assumptions Made
- Phone numbers are US-only format: `(XXX) XXX-XXXX`
- Instagram handle is optional and not validated
- Single submission per email (business requirement)

### Trade-offs Due to Time Constraints
1. **No animations between steps** - Would add smoother UX with Framer Motion
2. **Basic phone validation** - Could use libphonenumber-js for international support
3. **No email verification** - Production would send confirmation emails
4. **localStorage for drafts** - Production might use database-backed drafts
5. **No rate limiting** - Would add in production to prevent spam

## What I Would Improve With More Time

1. **Testing**: Add unit tests (Jest) and E2E tests (Playwright)
2. **Accessibility**: Enhanced ARIA labels, keyboard navigation
3. **Analytics**: Track step completion rates, drop-off points
4. **Email Service**: Send confirmation emails via SendGrid/Resend
5. **Admin Dashboard**: View and manage entries
6. **Internationalization**: Support multiple languages
7. **Advanced Validation**: 
   - Email deliverability check
   - Phone number international support
   - Spam detection
8. **Performance**: 
   - Image optimization
   - Code splitting
   - Lazy loading components
9. **Security**:
   - CSRF protection
   - Rate limiting
   - Input sanitization

## API Documentation

### POST `/api/giveaway`

Submit a giveaway entry.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "instagramHandle": "@johndoe",
  "phone": "(555) 123-4567",
  "painArea": "knee",
  "painAreaOther": "",
  "whyNotYet": ["cost", "learning"],
  "interestLevel": "explore"
}
```

**Responses:**

- `201 Created`: Entry successfully created
- `400 Bad Request`: Validation error
- `409 Conflict`: Email already exists
- `500 Internal Server Error`: Database error

## License

This project was created as a technical assessment for Thrivelab.

## Author

Fersy Martínez
- GitHub: https://github.com/fersycode
- LinkedIn: https://www.linkedin.com/in/fersy-mart%C3%ADnez-b49b11262/
# Strategic AI Academy - Next.js Full-Stack Platform

🎓 **Complete learning management system with:**
- ✅ User authentication (NextAuth.js)
- ✅ PostgreSQL database (Vercel Postgres)
- ✅ Payment processing (Stripe)
- ✅ Course enrollment & progress tracking
- ✅ Diagnostic assessment with radar chart visualization
- ✅ Responsive UI (Tailwind CSS + Lucide icons)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### 3. Set Up Vercel Postgres Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project or create a new one
3. Go to Storage tab
4. Create a new Postgres database
5. Copy the connection strings to your `.env.local`

### 4. Initialize Database

Run the schema and seed files:

```bash
# You can run these in Vercel Postgres Query Editor
# Or use the Vercel CLI:
vercel env pull .env.local
```

Then execute the SQL files:
- `src/lib/db/schema.sql` - Creates tables
- `src/lib/db/seed.sql` - Populates initial data

### 5. Configure NextAuth

Generate a secret for NextAuth:

```bash
openssl rand -base64 32
```

Add it to `.env.local`:
```
NEXTAUTH_SECRET=your_generated_secret
```

### 6. Set Up Stripe

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your API keys from Developers → API keys
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

### 7. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
nextjs-app/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── api/               # API routes
│   │   ├── (auth)/           # Auth pages (login, signup)
│   │   ├── dashboard/        # User dashboard
│   │   ├── courses/          # Course pages
│   │   └── layout.tsx        # Root layout
│   ├── components/            # React components
│   ├── lib/                   # Utilities
│   │   ├── db/               # Database functions
│   │   ├── auth.ts           # NextAuth config
│   │   └── stripe.ts         # Stripe config
│   └── types/                 # TypeScript types
├── public/                    # Static files
└── package.json
```

## 🔑 Key Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Vercel Postgres Database
- ✅ NextAuth.js Authentication
- ✅ Stripe Payment Integration
- ✅ Course Progress Tracking
- ✅ Diagnostic Assessment
- ✅ User Dashboard

## 📊 Database Schema

### Tables:
- `users` - User accounts
- `diagnostic_results` - Quiz results
- `courses` - Course information
- `course_tracks` - Individual course levels
- `enrollments` - User course enrollments
- `user_progress` - Module completion tracking
- `subscriptions` - Stripe subscriptions
- `payments` - Payment records

## 🌐 Deployment

### Deploy to Vercel

```bash
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Environment Variables on Vercel

Make sure to add all environment variables from `.env.local` to your Vercel project settings.

## 📝 Development Notes

### Adding a New API Route

Create a file in `src/app/api/your-route/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello' });
}
```

### Protected Routes

Use NextAuth session in server components:

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const session = await getServerSession(authOptions);
if (!session) {
  redirect('/login');
}
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Vercel Postgres
- **Auth**: NextAuth.js
- **Payments**: Stripe
- **Charts**: Recharts
- **Deployment**: Vercel

## 📧 Support

For issues or questions, create an issue on GitHub.

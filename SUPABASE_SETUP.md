# SiteArtisan - Supabase Setup Guide

This guide will help you set up Supabase to make the admin panel fully functional with a database backend.

## Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up or log in with your account
3. Click "New Project"
4. Fill in:
   - **Project name**: `siteartisan` (or your preferred name)
   - **Database password**: Choose a strong password (you'll need this)
   - **Region**: Select the closest region to your users (e.g., `eu-west-1` for Europe)
5. Click "Create new project" and wait for initialization (~2 minutes)

## Step 2: Create the Database Schema

Once your project is ready:

1. Go to the **SQL Editor** section in your Supabase dashboard
2. Click "New Query"
3. Copy and paste the contents of `/supabase/schema.sql` from this repository
4. Click "Run" to execute the SQL and create the `artisans` table

The table will include all necessary fields for artisans:
- Contact info (name, email, phone)
- Business details (company name, trade, specialties)
- Location (address, city, intervention zone)
- Ratings (review count, average rating)
- Metadata (created date, modification date, active status)

## Step 3: Get Your API Keys

In your Supabase dashboard:

1. Go to **Project Settings** (gear icon at bottom left)
2. Click **API**
3. Copy these values:
   - **Project URL**: This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon (public) key**: This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Service role key**: This is your `SUPABASE_SERVICE_ROLE_KEY` (keep this private!)

## Step 4: Update Environment Variables

Edit `.env.local` in your project root and replace the placeholder values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password_here
```

**Important**:
- Replace `YOUR_PROJECT_ID` with your actual project ID (visible in the URL)
- Never commit `.env.local` to Git (it's already in `.gitignore`)
- Keep `SUPABASE_SERVICE_ROLE_KEY` private - it has admin privileges

## Step 5: Test the Connection

1. Restart your Next.js dev server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000/admin`

3. Log in with the password you set in `NEXT_PUBLIC_ADMIN_PASSWORD`

4. If Supabase is properly configured, the artisans list should be empty initially

## Step 6: Add Your First Artisan

1. From the admin panel, click "Ajouter un artisan"
2. Fill in the form with artisan details
3. Click "Enregistrer" to save to Supabase

The artisan data is now stored in your Supabase database!

## Step 7: Enable Row Level Security (RLP) - Optional but Recommended

For additional security, you can enable Supabase's Row Level Security:

1. Go to **Authentication** → **Policies** in your Supabase dashboard
2. Enable RLP on the `artisans` table
3. Use the SQL in `/supabase/schema.sql` which includes RLP policies

This ensures:
- Anyone can read active artisans (public directory)
- Only authenticated admin users can insert/update/delete

## Fallback Behavior

If Supabase is not configured (keys are empty), the admin panel will:
- Display the mock artisan data from `/src/data/artisans.ts`
- Show a warning in the browser console
- Still allow you to view/manage artisans locally (changes not persisted)

## Troubleshooting

### "Supabase not configured" error
- Check that `.env.local` has valid values
- Restart your dev server after updating `.env.local`
- Ensure keys are copied exactly without extra spaces

### Connection timeout
- Check your internet connection
- Verify the project URL is correct
- Try accessing Supabase dashboard directly to confirm the project is active

### 401 Unauthorized errors
- Make sure `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- Check that RLP policies allow the operation
- Verify the table name is exactly `artisans` (lowercase)

### Changes not saving
- Verify `SUPABASE_SERVICE_ROLE_KEY` is correct
- Check browser console for error messages
- Ensure `NEXT_PUBLIC_SUPABASE_URL` doesn't have trailing slash

## Next Steps

After Supabase is set up, you can:

1. **Set up authentication** for artisans to manage their own profiles
2. **Add review/rating system** with a separate `reviews` table
3. **Implement image uploads** using Supabase Storage
4. **Add email notifications** when new artisans register
5. **Create analytics dashboards** to track directory growth

## API Reference

The Supabase client functions are in `/lib/supabase.ts`:

- `fetchArtisans()` - Get all active artisans
- `fetchArtisanById(id)` - Get specific artisan
- `createArtisan(data)` - Add new artisan
- `updateArtisan(id, updates)` - Update artisan details
- `deleteArtisan(id)` - Soft delete (marks as inactive)

## Security Notes

1. **Never commit `.env.local`** - It's in `.gitignore` for a reason
2. **Rotate service role keys** periodically in Supabase settings
3. **Use RLP policies** to restrict access to sensitive data
4. **Enable 2FA** on your Supabase account
5. **Monitor API usage** in Supabase dashboard for unusual activity

---

Need help? Check Supabase docs: https://supabase.com/docs

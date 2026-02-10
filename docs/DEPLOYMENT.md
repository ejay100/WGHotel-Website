# Deployment Guide - Winners Gold Hotel

## Hosting Architecture

```
┌─────────────────────────────────────────┐
│   Winners Gold Hotel - Full Stack       │
├─────────────────────────────────────────┤
│ Frontend (Next.js)    → Vercel          │
│ Admin Dashboard       → Vercel/AWS      │
│ PostgreSQL Database   → Supabase        │
│ File Storage         → Supabase         │
│ Authentication       → Supabase Auth    │
│ Real-time Updates    → Supabase RT      │
│ Payments            → Paystack/Hubtel   │
└─────────────────────────────────────────┘
```

## Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Supabase account
- Paystack account
- Hubtel account (for Mobile Money)

## Step 1: Supabase Setup

### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Enter project name: `winners-gold-hotel`
4. Choose region: Ghana (or nearest)
5. Create database

### Run Database Schema
1. Copy SQL from `docs/database-schema.sql`
2. Go to Supabase Dashboard → SQL Editor
3. Create new query → Paste SQL → Run

### Get API Keys
1. Dashboard → Settings → API
2. Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
3. Copy `Anon Key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Copy `Service Key` → Keep secure (for server-side)

## Step 2: Payment Setup

### Paystack
1. Go to [paystack.com](https://paystack.com)
2. Create account
3. Verify business
4. Get API keys from Settings
5. Copy Public Key → `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`

### Hubtel (Ghana Mobile Money)
1. Go to [hubtel.com](https://hubtel.com)
2. Sign up as merchant
3. Verify merchant account
4. Get API credentials
5. Copy Client ID → `NEXT_PUBLIC_HUBTEL_CLIENT_ID`

## Step 3: Environment Configuration

### Create .env.local
```bash
cp .env.example .env.local
```

### Fill in values
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Payments
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxxxx
NEXT_PUBLIC_HUBTEL_CLIENT_ID=xxxx-xxxx

# Admin
ADMIN_SECRET_KEY=your-32-char-secret-key-here
JWT_SECRET=your-32-char-jwt-secret-here

# URLs
NEXT_PUBLIC_APP_URL=https://winnersgoldhotel.com
NEXT_PUBLIC_ADMIN_URL=https://admin.winnersgoldhotel.com
```

## Step 4: Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Admin portal (separate terminal)
npm run dev:admin

# Access:
# - Guest site: http://localhost:3000
# - Admin: http://localhost:3001
```

## Step 5: Production Deployment

### Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
# → Settings → Environment Variables → Add values from .env.local
```

### Admin Dashboard (Vercel or AWS)

```bash
# Vercel
vercel --prod --name=admin-winnersgoldhotel

# AWS Amplify
amplify init
amplify add hosting
amplify publish
```

## Step 6: Custom Domain

### Setup Domain (Vercel)
1. Go to Vercel Project Settings
2. Domains → Add
3. Enter `winnersgoldhotel.com`
4. Update DNS records at registrar:
   ```
   CNAME: www → cname.vercel-dns.com
   CNAME: admin → cname.vercel-dns.com
   ```

## Step 7: SSL Certificates

Vercel automatically provides free SSL via Let's Encrypt ✅

## Step 8: Database Backups

### Supabase Automatic Backups
- Daily backups (30-day retention)
- Point-in-time restore available
- No additional setup needed ✅

### Manual Backup
```bash
# Via Supabase Dashboard
Dashboard → Backups → Create Backup

# Or via CLI
supabase db push --dry-run
```

## Step 9: Monitoring

### Vercel Analytics
- Dashboard → Analytics
- Monitor deployment frequency
- Track performance metrics

### Supabase Monitoring
- Dashboard → Logs
- Monitor database performance
- Check API usage

## Step 10: Security Checklist

- [ ] Environment variables set on hosting
- [ ] Database backups enabled
- [ ] SSL/TLS configured
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Password policies enforced
- [ ] 2FA enabled for admin
- [ ] Audit logging active
- [ ] Sensitive data encrypted
- [ ] Regular security updates

## Rollback Procedure

### If issues after deployment:

```bash
# Rollback to previous version on Vercel
vercel rollback
# Select previous deployment ID

# Or manually:
git revert HEAD
git push
# Vercel will auto-deploy
```

### Database rollback:
1. Supabase Dashboard → Backups
2. Select backup
3. Click "Restore"
4. Confirm

## Monitoring & Alerts

### Set up alerts:
1. Vercel → Project → Integrations → Add Slack
2. Supabase → Project → Notifications → Enable

### Check logs regularly:
- Monitor API response times
- Track error rates
- Review security logs

## Performance Optimization

### Already Implemented:
- ✅ Next.js automatic code splitting
- ✅ Image optimization
- ✅ Gzip compression
- ✅ Database query optimization
- ✅ Caching headers
- ✅ CDN via Vercel

### Monitor:
- Lighthouse scores
- Core Web Vitals
- Time to First Byte (TTFB)

## Cost Estimates

### Monthly Costs (Approximate):
| Service | Cost | Notes |
|---------|------|-------|
| Vercel | $20 | Pro plan |
| Supabase | $25 | 2GB database |
| Paystack | 1.5% | Per transaction |
| Hubtel | 1% | Per transaction |
| **Total** | **~$50+** | Plus payment fees |

## Support & Documentation

- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Paystack Docs**: https://paystack.com/docs
- **Hubtel Docs**: https://developers.hubtel.com

---

**Deployment Date:** February 2026
**Version:** 1.0.0
**Status:** Production Ready ✅

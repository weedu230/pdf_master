# PDF Master - Deployment Guide

This guide covers deploying PDF Master to production using Vercel (frontend) and Render (backend).

## Architecture

```
┌─────────────────┐         ┌──────────────────┐
│   Vercel CDN    │         │   Render.com     │
│  (Frontend)     │◄────────┤  (Backend API)   │
│  React + Vite   │         │  FastAPI        │
└─────────────────┘         └──────────────────┘
```

## Deployment Steps

### Phase 1: Prepare Repository

1. **Initialize Git** (if not already done)
```bash
git init
git add .
git commit -m "PDF Master - Initial commit"
```

2. **Push to GitHub**
```bash
git remote add origin https://github.com/yourusername/pdf-master.git
git branch -M main
git push -u origin main
```

### Phase 2: Deploy Backend to Render

#### 1. Create Render Account
- Visit [render.com](https://render.com)
- Sign up with GitHub
- Connect your GitHub account

#### 2. Create New Web Service
- Click "New +" → "Web Service"
- Select your `pdf-master` repository
- Choose "pdf-master" repo (or create new if needed)
- Branch: `main`

#### 3. Configure Service
- **Name**: `pdf-master-api`
- **Environment**: `Python 3`
- **Build Command**: `pip install -r backend/requirements.txt`
- **Start Command**: 
  ```
  cd backend && uvicorn app.main:app --host 0.0.0.0 --port 8000
  ```
- **Plan**: Start with "Free" tier (0.5 CPU, 512MB RAM)

#### 4. Add Environment Variables
In Render dashboard:
- Click "Environment" tab
- Add variable:
  ```
  SECRET_KEY=<generate-random-string>
  FASTAPI_ENV=production
  ```

#### 5. Deploy
- Click "Deploy"
- Wait for deployment (2-5 minutes)
- Your API URL will be: `https://pdf-master-api.onrender.com`

#### 6. Test Backend
```bash
curl https://pdf-master-api.onrender.com/health
```

Should return: `{"status":"healthy"}`

### Phase 3: Deploy Frontend to Vercel

#### 1. Create Vercel Account
- Visit [vercel.com](https://vercel.com)
- Sign up with GitHub

#### 2. Import Project
- Click "New Project"
- Select "Import Git Repository"
- Choose your `pdf-master` repo
- Configure:
  - **Framework Preset**: `Vite`
  - **Root Directory**: `frontend`
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist`

#### 3. Add Environment Variables
In Vercel dashboard:
- Click "Settings" → "Environment Variables"
- Add for all environments:
  ```
  VITE_API_URL=https://pdf-master-api.onrender.com
  ```

#### 4. Deploy
- Click "Deploy"
- Wait for deployment (1-3 minutes)
- Your site URL will be displayed

### Phase 4: Configure CORS

Update backend CORS settings for production:

Edit `backend/app/main.py`:

```python
# Change from
allow_origins=["*"]

# To
allow_origins=[
    "https://pdf-master.vercel.app",
    "https://www.yourdomain.com",
]
```

Push changes and Render will auto-redeploy.

### Phase 5: Custom Domain (Optional)

#### For Frontend (Vercel)
1. Go to Vercel project settings
2. Click "Domains"
3. Add your domain (e.g., pdfmaster.com)
4. Follow DNS configuration instructions

#### For Backend (Render)
1. Go to Render web service settings
2. Click "Custom Domain"
3. Add your API domain (e.g., api.pdfmaster.com)
4. Follow DNS configuration instructions

Update environment variables after:
- Frontend: `VITE_API_URL=https://api.pdfmaster.com`

## Production Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] Environment variables configured
- [ ] CORS properly configured
- [ ] API health endpoint responds
- [ ] All PDF tools tested in production
- [ ] SSL certificates installed (auto on Vercel/Render)
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] robots.txt accessible at `/robots.txt`
- [ ] Analytics configured (optional)
- [ ] Error monitoring configured (optional)

## Monitoring & Maintenance

### Render Dashboard
- View logs: Web Service → Logs
- Monitor resources: Dashboard overview
- Set up alerts for failures

### Vercel Dashboard
- View analytics: Dashboard → Analytics
- Monitor performance: Analytics → Web Vitals
- Check error rates: Monitoring

## Scaling Considerations

### Backend (Render)
**Current limits (Free tier):**
- 0.5 CPU
- 512 MB RAM
- Auto-shutdowns after 15 min inactivity
- Cold start time: 30-60s

**For production:**
- Upgrade to "Starter" or "Standard" plan
- Increase CPU to 1-2
- Increase RAM to 1-2GB
- Enable dedicated instance

### Frontend (Vercel)
**Current specs (Free tier):**
- Unlimited deployments
- Automatic scaling
- Global CDN
- Sufficient for most production use

## Database (Optional)

For saving user history, add:

1. **PostgreSQL** (Render offers managed PostgreSQL)
2. **Update backend** with database models
3. **Create migrations** using Alembic
4. **Deploy with new code**

## Performance Optimization

### Frontend
- Images are already optimized with Vite
- CSS is minified with Tailwind
- Consider adding service workers for offline support

### Backend
- Add request caching with Redis
- Implement rate limiting
- Use async task queue (Celery) for large files
- Monitor memory usage for PDF processing

## Cost Estimates (Monthly)

- **Render Backend**: $7-25 (depending on plan)
- **Vercel Frontend**: Free (generous free tier)
- **Custom Domain**: $10-15/year
- **Total**: ~$17-40/month

## Troubleshooting Production

### Backend not responding
1. Check Render logs
2. Verify environment variables
3. Check memory usage
4. Restart service

### Frontend can't reach API
1. Check CORS settings in backend
2. Verify `VITE_API_URL` environment variable
3. Check API health: `curl https://api-domain.onrender.com/health`
4. Check browser console for CORS errors

### Files downloading slowly
1. Check backend file size limits
2. Monitor Render CPU/memory
3. Consider caching intermediate results

## Rollback Strategy

If deployment fails:

**Frontend (Vercel):**
1. Go to Deployments
2. Find last successful deployment
3. Click "Redeploy"

**Backend (Render):**
1. Go to Deploy History
2. Find last successful deploy
3. Click "Redeploy"

## CI/CD Pipeline (Optional)

Consider adding GitHub Actions for:
- Automated testing
- Linting checks
- Build validation
- Auto-deploy on push to main

## Security Hardening

- [ ] Enable HTTPS (auto on Render/Vercel)
- [ ] Set secure headers
- [ ] Implement request size limits
- [ ] Add rate limiting
- [ ] Validate file uploads
- [ ] Sanitize user input
- [ ] Use environment variables for secrets
- [ ] Regular dependency updates

## Support & Resources

- **Render Support**: https://render.com/docs
- **Vercel Support**: https://vercel.com/docs
- **FastAPI Deploy**: https://fastapi.tiangolo.com/deployment/
- **React Deploy**: https://react.dev/learn/deployment

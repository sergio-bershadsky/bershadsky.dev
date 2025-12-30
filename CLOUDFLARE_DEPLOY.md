# Deploying to Cloudflare Pages

This guide explains how to deploy your static blog to Cloudflare Pages.

## Prerequisites

- A Cloudflare account (free tier works)
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Option 1: Connect Git Repository (Recommended)

### Step 1: Push to GitHub

If your code isn't already on GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Create Cloudflare Pages Project

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Workers & Pages** in the sidebar
3. Click **Create application** → **Pages** → **Connect to Git**
4. Select your GitHub repository
5. Click **Begin setup**

### Step 3: Configure Build Settings

| Setting | Value |
|---------|-------|
| **Project name** | your-site-name |
| **Production branch** | main |
| **Framework preset** | None |
| **Build command** | `npm run build` |
| **Build output directory** | `dist/public` |

### Step 4: Environment Variables

No environment variables are required for this static site.

### Step 5: Deploy

Click **Save and Deploy**. Cloudflare will build and deploy your site.

Your site will be available at: `https://your-project-name.pages.dev`

## Option 2: Direct Upload

If you prefer not to connect a Git repository:

### Step 1: Build Locally

```bash
npm install
npm run build
```

### Step 2: Upload to Cloudflare

1. Go to **Workers & Pages** → **Create application** → **Pages**
2. Select **Direct Upload**
3. Name your project
4. Drag and drop the `dist/public` folder
5. Click **Deploy site**

## Custom Domain

To add a custom domain:

1. Go to your Pages project
2. Click **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter your domain (e.g., `blog.example.com`)
5. Follow the DNS configuration instructions

## Automatic Deployments

When connected to Git, Cloudflare automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you create a pull request

## Build Output Structure

After running `npm run build`, the `dist/public` folder contains:
- `index.html` - Main entry point
- `assets/` - JavaScript, CSS, and other assets
- `data/` - Static YAML and Markdown content files
- `attached_assets/` - Generated images

## Troubleshooting

### Build Fails

Make sure your `package.json` has the correct build script:
```json
{
  "scripts": {
    "build": "tsx script/build.ts"
  }
}
```

### 404 on Page Refresh

Cloudflare Pages handles SPA routing automatically. If you still get 404s, create a `_redirects` file in `client/public/`:

```
/*    /index.html   200
```

### Assets Not Loading

Verify the build output directory is set to `dist/public` (not just `dist`).

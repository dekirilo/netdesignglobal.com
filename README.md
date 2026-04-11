# NetDesignGlobal — Static Site

Static marketing site for NetDesignGlobal, hosted on GitHub Pages with a custom local admin panel for editing content.

---

## Project Structure

```
netdesignglobal/
│
├── .github/workflows/deploy.yml  ← Auto-deploys to GitHub Pages on push
│
├── content/                      ← Edit these to update the site
│   ├── settings.yml              ← Site name, email, colors, social links
│   ├── hero.yml                  ← Hero headline, stats, CTA buttons
│   ├── services.yml              ← 8 service cards
│   ├── why.yml                   ← Why choose us section
│   ├── industries.yml            ← Industries served
│   ├── process.yml               ← 4-step process
│   ├── tech.yml                  ← Tech stack + certifications
│   └── cta.yml                   ← Contact section + form services list
│
├── build.js                      ← Reads content/*.yml → builds public/index.html
├── api.js                        ← Local admin API server (Docker only)
├── package.json                  ← Only dependency: js-yaml
│
├── public/                       ← GitHub Pages serves this folder
│   ├── index.html                ← Built automatically — do not edit by hand
│   ├── 404.html                  ← Same as index.html (SPA fallback)
│   ├── CNAME                     ← Custom domain: netdesignglobal.com
│   ├── admin/index.html          ← Local CMS admin UI (works via Docker only)
│   └── assets/
│       ├── css/main.css
│       └── js/main.js
│
├── docker-compose.yml            ← Local dev + admin panel
├── nginx.conf                    ← Local nginx config
└── Dockerfile                    ← CMS container
```

---

## GitHub Pages Deployment (Production)

### First-time setup

```bash
# 1. Clone / unzip project
cd netdesignglobal

# 2. Initialize git and push
git init
git remote add origin https://github.com/dekirilo/public-netdesignglobal.com.git
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

### Enable GitHub Pages

1. Go to your repo → **Settings → Pages**
2. Source → **GitHub Actions**
3. Save

The first deploy triggers automatically and takes about 60 seconds.

### Custom Domain (netdesignglobal.com)

**Cloudflare DNS records:**

| Type  | Name | Content              |
|-------|------|----------------------|
| A     | @    | 185.199.108.153      |
| A     | @    | 185.199.109.153      |
| A     | @    | 185.199.110.153      |
| A     | @    | 185.199.111.153      |
| CNAME | www  | dekirilo.github.io   |

Set all records to **DNS only** (grey cloud — not proxied).

In GitHub → Settings → Pages → Custom domain → type `netdesignglobal.com` → Save.

---

## Editing Content

### Option A — Edit on GitHub.com (no tools needed)

1. Go to `github.com/dekirilo/public-netdesignglobal.com`
2. Navigate to `content/` → click any `.yml` file
3. Click the ✏️ pencil icon → edit in the browser
4. Click **Commit changes**
5. GitHub Actions rebuilds and deploys in ~20 seconds

### Option B — Edit locally and push

```bash
# Edit any content file
nano content/services.yml

# Commit and push → triggers auto-deploy
git add content/
git commit -m "Update services"
git push
```

### Option C — Visual admin panel (local Docker)

```bash
docker compose up --build -d
open http://localhost/admin
```

Edit in the visual form UI → click Save → site rebuilds in ~1 second.
To publish changes: `git add content/ public/index.html && git commit -m "Update" && git push`

---

## Contact Form

1. Sign up free at **formspree.io**
2. Create a new form → copy the Form ID (e.g. `xpzgkdqr`)
3. Edit `content/cta.yml`:
   ```yaml
   formspree_id: xpzgkdqr
   ```
4. Commit and push

---

## Local Development (Docker)

```bash
# Start
docker compose up --build -d

# Site
open http://localhost

# Admin panel
open http://localhost/admin

# Stop
docker compose down

# View logs
docker compose logs -f cms
```

---

## How the Build Works

```
content/*.yml  →  build.js  →  public/index.html
```

`build.js` reads all 8 YAML files, assembles them into a single self-contained HTML file (CSS and JS inlined), and writes it to `public/index.html`.

GitHub Actions runs this automatically on every push to `main` that touches `content/`, `build.js`, or `public/assets/`.

---

## Manual Rebuild

```bash
# Locally (requires Node.js + npm install first)
npm install
node build.js

# Via Docker
docker exec ndg_cms node build.js
```

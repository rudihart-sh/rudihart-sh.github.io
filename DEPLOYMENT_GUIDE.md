# 📋 Project Management Chat Widget - Deployment Guide

Panduan lengkap untuk deploy Chat Widget dengan OpenAI GPT-4 ke Vercel dan mengintegrasikan dengan GitHub Pages.

---

## 🎯 Overview

Chat Widget ini dirancang khusus untuk **IT Project Manager** dengan fitur:
- ✅ Floating chat button di bawah kanan halaman
- ✅ Real-time conversation dengan GPT-4
- ✅ Knowledge base dari project files (README, Word, PDF)
- ✅ Assessment & timeline tracking
- ✅ Responsive design (desktop & mobile)

---

## 📁 File Structure

```
rudihart-sh.github.io/
├── index.html                 # Main landing page (updated with chat widget)
├── chat-widget.js             # Chat widget logic (JavaScript)
├── chat-widget.css            # Chat widget styling
├── vercel.json                # Vercel configuration
├── requirements.txt           # Python dependencies
├── projects-data/             # Knowledge base folder
│   ├── project-1.md          # Sample project 1
│   ├── project-2.md          # Sample project 2
│   └── assessment-guide.md   # Assessment methodology
└── api/
    ├── index.py              # FastAPI application (entry point)
    └── chat_service.py       # Chat logic & project data loading
```

---

## 🚀 Step 1: Setup OpenAI API Key

### 1.1 Get OpenAI API Key
1. Go to https://platform.openai.com/api/keys
2. Create a new API key
3. Copy the key (⚠️ Simpan dengan aman, jangan share!)

### 1.2 Test API Key Locally (Optional)
```bash
# Install dependencies
pip install -r requirements.txt

# Test the service
python -c "
import os
os.environ['OPENAI_API_KEY'] = 'your-api-key-here'
from api.chat_service import load_project_data, chat_with_gpt4

data = load_project_data()
response = chat_with_gpt4('Berapa timeline Website Redesign?', data, [])
print(response)
"
```

---

## 🔧 Step 2: Deploy Backend API to Vercel

### 2.1 Install Vercel CLI
```bash
npm install -g vercel
# atau jika pakai yarn
yarn global add vercel
```

### 2.2 Login ke Vercel
```bash
vercel login
# Pilih continue with GitHub untuk lebih mudah
```

### 2.3 Deploy Repository
```bash
cd rudihart-sh.github.io
vercel --prod
```

### 2.4 Set Environment Variables di Vercel Dashboard

1. Go to: https://vercel.com/dashboard
2. Select project `rudihart-sh-github-io` (atau nama project Anda)
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - Name: `OPENAI_API_KEY`
   - Value: `sk-...` (paste API key Anda)
   - Select environments: **Production**, **Preview**, **Development**
5. Click **Save**

### 2.5 Redeploy dengan Environment Variable
```bash
vercel --prod
```

---

## 🎨 Step 3: Update Chat Widget Configuration

### 3.1 Get Your Vercel API URL
Setelah deploy, Vercel akan memberi URL. Format:
```
https://your-project-name.vercel.app
```

### 3.2 Update index.html
Buka `index.html` dan update bagian script di bawah `<script src="chat-widget.js"></script>`:

```html
<script>
  document.addEventListener("DOMContentLoaded", () => {
    // Update dengan URL Vercel Anda
    window.chatWidget.setApiUrl("https://your-project-name.vercel.app");
  });
</script>
```

**Contoh:**
```html
<script>
  document.addEventListener("DOMContentLoaded", () => {
    window.chatWidget.setApiUrl("https://rudihart-portfolio-api.vercel.app");
  });
</script>
```

### 3.3 Push ke GitHub
```bash
git add index.html
git commit -m "Update chat widget API URL"
git push origin main
```

---

## ✅ Step 4: Test Chat Widget

### 4.1 Local Testing
```bash
# Jika menggunakan local Python server
python -m http.server 8000

# Buka browser
# http://localhost:8000
```

### 4.2 Production Testing
1. Go to: https://rudihart-sh.github.io
2. Klik floating chat button di bawah kanan
3. Test queries:
   - "Berapa timeline Website Redesign?"
   - "Apa saja tasks di Mobile App?"
   - "Berapa progress project saat ini?"
   - "Estimasi waktu untuk frontend development?"

---

## 📊 Testing Chat Queries

Beberapa contoh query yang bisa ditest:

```
1. "Berapa estimasi waktu untuk Website Redesign project?"
2. "Apa saja tasks di Mobile App project dan berapa lama waktu untuk setiap task?"
3. "Proyek mana yang sudah selesai?"
4. "Berapa total hari untuk testing & QA?"
5. "Status project apa yang sedang In Progress?"
6. "Jelaskan assessment methodology"
7. "Berapa durasi fase Planning untuk Mobile App?"
```

---

## 🔄 Step 5: Add/Update Project Data

### 5.1 Format Project File
Buat file markdown di folder `projects-data/`:

```markdown
# Project: [Project Name]

## Overview
Deskripsi project

## Client
Nama client

## Timeline
Target: X minggu

## Tasks & Assessment

### [Category Name]
- [Task 1]: [X] hari
- [Task 2]: [Y] hari
**Total: [Z] hari**

## Status
[Planning / In Progress / Review / Completed / On Hold]

## Progress
[X]% Complete

## Notes
Catatan tambahan
```

### 5.2 Push New Project Data
```bash
git add projects-data/
git commit -m "Add/update project data"
git push origin main
```

### 5.3 Redeploy API to Vercel
```bash
vercel --prod
```

---

## 🛠️ Troubleshooting

### Problem 1: Chat tidak bisa connect ke API
**Solution:**
- Verify Vercel API URL di `index.html`
- Check browser console untuk error messages (F12 → Console)
- Ensure OPENAI_API_KEY environment variable sudah set di Vercel

### Problem 2: API returns "Error: Invalid API Key"
**Solution:**
- Verify API key di Vercel environment variables
- Check API key masih valid (tidak expired)
- Login ke OpenAI dashboard untuk confirm

### Problem 3: Chat slow response
**Solution:**
- GPT-4 memang lebih lambat dari GPT-3.5
- Check network connection
- Vercel cold start bisa cause delay pertama kali

### Problem 4: Knowledge base tidak terupdate
**Solution:**
```bash
# Redeploy API
vercel --prod

# Atau force clear browser cache
# Ctrl + Shift + Delete (Chrome) → Clear browsing data
```

---

## 📱 Mobile Optimization

Chat widget sudah responsive untuk:
- ✅ Desktop (> 768px)
- ✅ Tablet (481px - 768px)
- ✅ Mobile (< 480px)

Widget akan automatically adjust ukuran berdasarkan device.

---

## 🔐 Security Notes

1. **Never commit API keys to GitHub**
   - Use Vercel environment variables (✅ sudah configured)
   - Never push `.env` file

2. **CORS is enabled**
   - Widget bisa diakses dari domain manapun
   - Untuk production, bisa restrict ke specific domains

3. **Rate limiting**
   - OpenAI API memiliki rate limiting
   - Monitor usage di: https://platform.openai.com/account/usage/overview

---

## 💰 Cost Estimation

**GPT-4 Pricing (per 1K tokens):**
- Input: $0.03 per 1K tokens
- Output: $0.06 per 1K tokens

**Estimasi biaya per bulan (100 chats/hari, avg 500 tokens per chat):**
- ~$45/bulan (worst case)
- ~$15/bulan (average case)

**Tips menghemat:**
- Switch ke GPT-3.5-turbo ($0.0005/$0.0015 per 1K tokens) - 90% lebih murah
- Update `api/index.py` line 36: `model="gpt-3.5-turbo"`

---

## 📝 Next Steps

### Optional Enhancements:
1. **Add persistent database**
   - Store conversation history di database
   - Use: Supabase, Firebase, atau PostgreSQL

2. **Add document upload**
   - Allow user upload Word/PDF files
   - Automatic indexing ke knowledge base

3. **Add analytics**
   - Track chat usage
   - Analyze common questions
   - Use: Mixpanel, Amplitude, atau custom logging

4. **Multi-language support**
   - Add language selector
   - Support English, Bahasa Indonesia

5. **Custom styling**
   - Change colors (update `chat-widget.css`)
   - Add company branding

---

## 📚 Resources

- [OpenAI API Docs](https://platform.openai.com/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Pages Guide](https://pages.github.com)

---

## ⚡ Quick Reference

**Deploy API:**
```bash
vercel --prod
```

**Update code:**
```bash
git add .
git commit -m "message"
git push origin main
vercel --prod
```

**Set environment variable:**
```
Vercel Dashboard → Settings → Environment Variables → Add OPENAI_API_KEY
```

**Test locally:**
```bash
pip install -r requirements.txt
python -c "..."
```

---

**Selesai! 🎉**

Chat widget Anda sekarang siap digunakan untuk project management assistant!

Jika ada pertanyaan, check troubleshooting section atau contact developer support.

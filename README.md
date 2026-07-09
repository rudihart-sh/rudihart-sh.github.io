# 🚀 Project Management Chat Widget

**A smart floating chat assistant powered by GPT-4 for IT Project Managers**

![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Python](https://img.shields.io/badge/python-3.8+-blue)
![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow)

---

## ✨ Features

- 💬 **Real-time Chat** - Floating chat widget with GPT-4 AI
- 📊 **Project Intelligence** - Ask about project status, timeline, and tasks
- ⏱️ **Assessment Tracking** - Automatic time estimation for tasks
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 💾 **Persistent History** - Saves conversation in browser localStorage
- 🔒 **Secure** - API keys stored safely in Vercel environment variables

---

## 🎯 Quick Start

### Prerequisites
- Python 3.8+
- Node.js (for Vercel CLI)
- GitHub account
- OpenAI API key

### 1️⃣ Clone Repository
```bash
git clone https://github.com/rudihart-sh/rudihart-sh.github.io.git
cd rudihart-sh.github.io
```

### 2️⃣ Get OpenAI API Key
1. Visit https://platform.openai.com/api/keys
2. Create new API key
3. Copy and keep it safe ✅

### 3️⃣ Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 4️⃣ Set Environment Variables
1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add `OPENAI_API_KEY` with your API key value
5. Redeploy: `vercel --prod`

### 5️⃣ Update API URL
Edit `index.html` and update the API URL:
```html
<script>
  document.addEventListener("DOMContentLoaded", () => {
    window.chatWidget.setApiUrl("https://your-vercel-url.vercel.app");
  });
</script>
```

### 6️⃣ Done! 🎉
Visit https://rudihart-sh.github.io and click the chat button!

---

## 📁 Project Structure

```
├── index.html              # Landing page + chat widget integration
├── chat-widget.js          # Chat widget logic (JavaScript)
├── chat-widget.css         # Widget styling
├── vercel.json             # Vercel config
├── requirements.txt        # Python dependencies
├── DEPLOYMENT_GUIDE.md     # Full deployment guide
├── projects-data/
│   ├── project-1.md       # Website Redesign project
│   ├── project-2.md       # Mobile App project
│   └── assessment-guide.md # Assessment methodology
└── api/
    ├── index.py           # FastAPI app (entry point)
    └── chat_service.py    # Chat logic & data loading
```

---

## 💬 Example Queries

Try asking the chat widget:

```
✅ "Berapa timeline Website Redesign?"
✅ "Apa saja tasks di Mobile App?"
✅ "Berapa progress project saat ini?"
✅ "Estimasi waktu untuk frontend development?"
✅ "Status project-project saat ini?"
✅ "Proyek mana yang sudah 60% selesai?"
✅ "Jelaskan assessment methodology"
```

---

## 🔧 Configuration

### Chat Widget Appearance
Edit `chat-widget.css` to customize:
- Colors (primary, dark, backgrounds)
- Size and position
- Animations and transitions

### API Model
By default uses GPT-4. To switch to GPT-3.5-turbo (90% cheaper):
```python
# In api/index.py, line 36
response = client.chat.completions.create(
    model="gpt-3.5-turbo",  # Change from "gpt-4"
    ...
)
```

### Add Project Data
1. Create file in `projects-data/project-name.md`
2. Use same format as existing projects
3. Push to GitHub
4. Redeploy API: `vercel --prod`

---

## 📊 Knowledge Base

The chat widget uses project data from:
- `project-1.md` - Website Redesign project
- `project-2.md` - Mobile App project
- `assessment-guide.md` - Assessment methodology

Each project includes:
- Overview and client info
- Timeline and tasks breakdown
- Assessment (time estimates)
- Current status and progress

---

## 🌐 Deployment

### GitHub Pages (Frontend)
- Automatically deployed when you push to `main`
- Visit: https://rudihart-sh.github.io

### Vercel (Backend API)
- Deploy with: `vercel --prod`
- Get API URL from Vercel dashboard
- Update in `index.html`

### Environment Variables
Set in Vercel Dashboard:
```
OPENAI_API_KEY = sk-...
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Chat not connecting | Verify API URL in index.html |
| "Invalid API Key" | Check OPENAI_API_KEY in Vercel |
| Slow responses | GPT-4 can be slow, try GPT-3.5-turbo |
| Knowledge base not updating | Redeploy API with `vercel --prod` |

See **DEPLOYMENT_GUIDE.md** for detailed troubleshooting.

---

## 💰 Cost Breakdown

**OpenAI API Usage:**
- GPT-4: ~$45/month (100 chats/day, 500 tokens/chat avg)
- GPT-3.5-turbo: ~$5/month (90% cheaper alternative)

**Vercel Hosting:**
- Free tier included
- Upgrade if needed for more API calls

---

## 📚 Documentation

- **DEPLOYMENT_GUIDE.md** - Complete setup and deployment guide
- **projects-data/assessment-guide.md** - Assessment methodology
- **chat-widget.js** - Widget implementation details

---

## 🚀 Next Steps

### Enhance the Widget
- [ ] Add persistent database for conversation history
- [ ] Support document uploads (PDF, Word)
- [ ] Add analytics to track usage
- [ ] Multi-language support
- [ ] Custom branding options

### Improve Knowledge Base
- [ ] Add more projects
- [ ] Include technical documentation
- [ ] Add resource allocation info
- [ ] Add risk assessment

---

## 🛠️ Tech Stack

**Frontend:**
- HTML5
- CSS3 (with custom properties)
- Vanilla JavaScript (no dependencies)

**Backend:**
- Python 3.8+
- FastAPI
- OpenAI API (GPT-4)

**Deployment:**
- GitHub Pages (frontend)
- Vercel (API)

---

## 📖 Usage Example

```javascript
// Initialize widget (automatic)
window.chatWidget = new ChatWidget();

// Set API URL
window.chatWidget.setApiUrl("https://your-api.vercel.app");

// Send message programmatically (optional)
// The widget is fully interactive via UI
```

---

## 🔐 Security & Privacy

✅ **Secure:**
- API keys stored in Vercel environment variables
- CORS enabled for flexibility
- No data stored on backend (stateless)
- Conversations stored locally in browser

⚠️ **Note:**
- Never commit API keys to GitHub
- Conversations are stored in browser localStorage
- Clear browser data to delete conversation history

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Contributions welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

---

## 📧 Support

For issues and questions:
- Check **DEPLOYMENT_GUIDE.md** troubleshooting section
- Review existing code comments
- Check browser console for errors (F12)

---

## 🎓 Learning Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [GitHub Pages Guide](https://pages.github.com)

---

<div align="center">

**Made with ❤️ for Project Managers**

[View Live](https://rudihart-sh.github.io) • [Deployment Guide](./DEPLOYMENT_GUIDE.md) • [Project Data](./projects-data/)

</div>

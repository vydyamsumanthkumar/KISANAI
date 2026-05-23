# 🌾 KisanAI - AI Crop Disease Detector

An AI-powered web application that helps Indian farmers 
detect crop diseases instantly using Google Gemini Vision AI.

## 💡 Problem Statement

Farmers lose crores every year due to undetected crop diseases.
KisanAI solves this by analyzing crop photos using AI and 
providing instant diagnosis in both Telugu and English.

## 🚀 Features

- 📷 Upload crop photo → AI detects disease instantly
- 🗣️ Results in Telugu + English language
- 🌾 Supports Rice, Cotton, Chilli, Tomato, Maize, Sugarcane
- 💊 Shows Disease, Cause, Treatment, Prevention
- ⚡ Severity indicator (Low / Medium / High)
- 📱 Mobile-friendly clean UI

## 🛠️ Tech Stack

| Technology               | Purpose |
|--------------------------|---------|
| React.js                 | Frontend UI |
| Tailwind CSS (CDN)       | Styling |
| Google Gemini Vision API | AI Disease Detection |
| JavaScript Fetch API     | API Calls |
| Vercel                   | Deployment |

## ⚙️ How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/vydyamsumanthkumar/KISANAI.git
cd KISANAI
```

### 2. Add Your Gemini API Key
Open `src/App.js` and replace:
```js
const API_KEY = "YOUR_API_KEY_HERE";
```
with your actual Gemini API key from aistudio.google.com

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Project
```bash
npm start
```
App runs at `http://localhost:3000`

---

## 🌐 Live Demo
[Click here to view live app](#) ← Vercel link add చేయి తర్వాత!

---

## 👨‍💻 Developer

**Vydyam Sumanth Kumar**  
Built for ByteHearts × Ranovex AI Hackathon 2026 🚀

---

## 🎯 Future Scope

- Voice input support for farmers
- Offline mode with local AI model  
- Government scheme recommendations
- Crop calendar & weather integration

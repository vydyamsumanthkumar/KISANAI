import { useState } from "react";

// ─── WELCOME PAGE ───
function WelcomePage({ onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-600 flex flex-col items-center justify-center px-4">
      
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="text-8xl mb-4">🌾</div>
        <h1 className="text-5xl font-bold text-white mb-2">KisanAI</h1>
        <p className="text-green-200 text-lg">Smart Crop Disease Detector</p>
        <p className="text-green-300 text-sm mt-1">తెలివైన పంట వ్యాధి నిర్ధారణ వ్యవస్థ</p>
      </div>

      {/* Features */}
      <div className="bg-white bg-opacity-10 rounded-2xl p-6 mb-8 max-w-sm w-full">
        <div className="space-y-3 text-white">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📷</span>
            <span>పంట ఫోటో upload చేయండి</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🤖</span>
            <span>AI వెంటనే వ్యాధి గుర్తిస్తుంది</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">💊</span>
            <span>Telugu లో చికిత్స తెలుసుకోండి</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">📥</span>
            <span>Report download చేయండి</span>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={onStart}
        className="bg-white text-green-700 font-bold text-xl px-12 py-4 rounded-full shadow-lg hover:bg-green-50 transition-all transform hover:scale-105"
      >
        🚀 Start చేయండి | Get Started
      </button>

      {/* JAI KISAN Quote */}
      <div className="mt-12 text-center">
        <p className="text-green-200 text-sm mb-1">భారత రైతుకు అంకితం</p>
        <p className="text-white text-3xl font-bold tracking-widest">🙏 జై కిసాన్ 🙏</p>
        <p className="text-green-300 text-sm mt-1">JAI KISAN — Jai Jawan, Jai Kisan, Jai Vigyan</p>
      </div>

    </div>
  );
}

// ─── MAIN APP ───
function App() {
  const [showApp, setShowApp] = useState(false);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [cropType, setCropType] = useState("Rice");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const crops = [
    "Rice","Cotton","Chilli","Tomato","Maize","Sugarcane",
    "Wheat","Groundnut","Soybean","Onion","Potato","Banana",
    "Jowar (జొన్న)"
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1];
        setImageBase64(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  // ─── BEAUTIFUL PDF DOWNLOAD ───
  const downloadResult = () => {
    if (!result) return;
    const printWindow = window.open("", "_blank");
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>KisanAI Report - ${cropType}</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 30px; color: #333; }
          .header { background: #16a34a; color: white; padding: 24px; border-radius: 12px; text-align: center; margin-bottom: 24px; }
          .header h1 { margin: 0; font-size: 28px; }
          .header p { margin: 4px 0 0; font-size: 14px; opacity: 0.9; }
          .badge { display: inline-block; padding: 6px 16px; border-radius: 20px; color: white; font-weight: bold; margin-bottom: 20px;
            background: ${result.severity === "High" ? "#ef4444" : result.severity === "Medium" ? "#f59e0b" : "#22c55e"}; }
          .section { border-radius: 10px; padding: 16px; margin-bottom: 16px; }
          .section h3 { margin: 0 0 8px; font-size: 15px; }
          .section p { margin: 4px 0; font-size: 14px; }
          .telugu { color: #555; font-size: 13px; }
          .disease { background: #fef2f2; border-left: 4px solid #ef4444; }
          .cause { background: #fefce8; border-left: 4px solid #f59e0b; }
          .treatment { background: #eff6ff; border-left: 4px solid #3b82f6; }
          .prevention { background: #f0fdf4; border-left: 4px solid #22c55e; }
          .shop-tip { background: #fff7ed; border: 1px solid #fb923c; border-radius: 10px; padding: 16px; margin-top: 16px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; border-top: 1px solid #eee; padding-top: 16px; }
          @media print { body { padding: 10px; } button { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🌾 KisanAI — పంట వ్యాధి నివేదిక</h1>
          <p>Crop Disease Report | పంట: ${cropType}</p>
        </div>

        <div class="badge">⚠️ తీవ్రత | Severity: ${result.severity}</div>

        <div class="section disease">
          <h3>🦠 వ్యాధి | Disease</h3>
          <p><strong>${result.disease_name_english}</strong></p>
          <p class="telugu">${result.disease_name_telugu}</p>
        </div>

        <div class="section cause">
          <h3>⚠️ కారణం | Cause</h3>
          <p>${result.cause_english}</p>
          <p class="telugu">${result.cause_telugu}</p>
        </div>

        <div class="section treatment">
          <h3>💊 చికిత్స | Treatment</h3>
          <p>${result.treatment_english}</p>
          <p class="telugu">${result.treatment_telugu}</p>
        </div>

        <div class="section prevention">
          <h3>🛡️ నివారణ | Prevention</h3>
          <p>${result.prevention_english}</p>
          <p class="telugu">${result.prevention_telugu}</p>
        </div>

        <div class="shop-tip">
          <h3>🏪 దుకాణానికి వెళ్ళేముందు</h3>
          <p>ఈ report తీసుకుని మీ దగ్గరలోని fertilizer shop కి వెళ్ళండి. పై చికిత్సలో చెప్పిన మందులు అడగండి.</p>
        </div>

        <div class="footer">
          <p>🌾 KisanAI — Built with ❤️ for Indian Farmers | 🙏 జై కిసాన్</p>
          <p>kisanai-vgfv.vercel.app</p>
        </div>

        <script>window.onload = function(){ window.print(); }</script>
      </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  const analyzeImage = async () => {
    if (!imageBase64) return;
    setLoading(true);
    setResult(null);

    const prompt = `You are an expert agricultural scientist. Analyze this ${cropType} crop image and identify any diseases.
    Respond ONLY in this exact JSON format (no extra text):
    {
      "disease_name_english": "Disease name",
      "disease_name_telugu": "వ్యాధి పేరు",
      "cause_english": "Cause",
      "cause_telugu": "కారణం",
      "treatment_english": "Treatment",
      "treatment_telugu": "చికిత్స",
      "prevention_english": "Prevention tips",
      "prevention_telugu": "నివారణ చిట్కాలు",
      "severity": "Low/Medium/High",
      "is_healthy": false
    }
    If crop is healthy, set is_healthy to true.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: prompt },
                { inline_data: { mime_type: "image/jpeg", data: imageBase64 } }
              ]
            }]
          })
        }
      );

      console.log("Status:", response.status);
      const data = await response.json();
      console.log("API Response:", JSON.stringify(data));

      const text = data.candidates[0].content.parts[0].text;
      const clean = text.replace(/```json|```/g, "").trim();
      setResult(JSON.parse(clean));
    } catch (err) {
      console.log("Error:", err.message);
      setResult({ error: "విశ్లేషణ విఫలమైంది. మళ్ళీ try చేయండి." });
    }
    setLoading(false);
  };

  // Show Welcome Page First
  if (!showApp) {
    return <WelcomePage onStart={() => setShowApp(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">

      {/* Header */}
      <header className="bg-green-700 text-white py-4 px-4 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">🌾 KisanAI</h1>
            <p className="text-green-200 text-xs">
              Smart Crop Disease Detector | తెలివైన పంట వ్యాధి నిర్ధారణ
            </p>
          </div>
          <button
            onClick={() => { setShowApp(false); setResult(null); setImage(null); }}
            className="text-green-200 hover:text-white text-sm"
          >
            🏠 Home
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">

        {/* Crop Selector */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            🌱 పంట రకం ఎంచుకోండి | Select Crop Type
          </h2>
          <div className="flex flex-wrap gap-2">
            {crops.map((crop) => (
              <button
                key={crop}
                onClick={() => setCropType(crop)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  cropType === crop
                    ? "bg-green-600 text-white shadow"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            📷 పంట ఫోటో అప్లోడ్ చేయండి | Upload Crop Photo
          </h2>
          <label className="block w-full border-2 border-dashed border-green-400 rounded-xl p-6 text-center cursor-pointer hover:bg-green-50 transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {image ? (
              <img src={image} alt="Uploaded crop"
                className="max-h-64 mx-auto rounded-lg object-contain" />
            ) : (
              <div>
                <p className="text-4xl mb-2">📸</p>
                <p className="text-green-600 font-medium">Click to upload photo</p>
                <p className="text-gray-400 text-sm mt-1">ఇక్కడ ఫోటో అప్లోడ్ చేయండి</p>
              </div>
            )}
          </label>

          {image && (
            <button
              onClick={analyzeImage}
              disabled={loading}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all shadow"
            >
              {loading
                ? "🔍 విశ్లేషిస్తున్నాం... Analyzing..."
                : "🔍 వ్యాధి గుర్తించు | Detect Disease"}
            </button>
          )}
        </div>

        {/* Result Section */}
        {result && !result.error && (
          <div className={`bg-white rounded-2xl shadow-md p-6 mb-6 border-l-4 ${
            result.is_healthy ? "border-green-500" : "border-red-500"
          }`}>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">📋 ఫలితం | Result</h2>
              <button
                onClick={downloadResult}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg"
              >
                📥 Download PDF
              </button>
            </div>

            <div className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium mb-4 ${
              result.is_healthy ? "bg-green-500" :
              result.severity === "High" ? "bg-red-500" :
              result.severity === "Medium" ? "bg-yellow-500" : "bg-orange-400"
            }`}>
              {result.is_healthy ? "✅ Healthy" : `⚠️ Severity: ${result.severity}`}
            </div>

            <div className="space-y-4">
              <div className="bg-red-50 rounded-xl p-4">
                <p className="font-bold text-red-700">🦠 వ్యాధి | Disease</p>
                <p className="text-gray-800">{result.disease_name_english}</p>
                <p className="text-gray-600 text-sm">{result.disease_name_telugu}</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4">
                <p className="font-bold text-yellow-700">⚠️ కారణం | Cause</p>
                <p className="text-gray-800">{result.cause_english}</p>
                <p className="text-gray-600 text-sm">{result.cause_telugu}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="font-bold text-blue-700">💊 చికిత్స | Treatment</p>
                <p className="text-gray-800">{result.treatment_english}</p>
                <p className="text-gray-600 text-sm">{result.treatment_telugu}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <p className="font-bold text-green-700">🛡️ నివారణ | Prevention</p>
                <p className="text-gray-800">{result.prevention_english}</p>
                <p className="text-gray-600 text-sm">{result.prevention_telugu}</p>
              </div>

              {/* Farmer Shop Tip */}
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                <p className="font-bold text-orange-700">🏪 దుకాణానికి వెళ్ళేముందు</p>
                <p className="text-gray-700 text-sm mt-1">
                  ఈ report download చేసుకుని fertilizer shop కి తీసుకెళ్ళండి.
                  పై చికిత్సలో చెప్పిన మందులు అడగండి.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Download this report and show it at your nearest fertilizer shop.
                </p>
              </div>
            </div>
          </div>
        )}

        {result && result.error && (
          <div className="bg-red-50 rounded-2xl p-6 text-center text-red-600">
            <p className="text-2xl mb-2">❌</p>
            <p>{result.error}</p>
          </div>
        )}
      </main>

      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>🌾 KisanAI — Built with ❤️ for Indian Farmers</p>
        <p className="font-bold text-green-700 mt-1">🙏 జై కిసాన్ | JAI KISAN 🙏</p>
      </footer>
    </div>
  );
}

export default App;
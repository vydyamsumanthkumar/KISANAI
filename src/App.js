import { useState } from "react";

function App() {
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [cropType, setCropType] = useState("Rice");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const crops = ["Rice","Cotton","Chilli","Tomato","Maize","Sugarcane"];

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

  const analyzeImage = async () => {
    if (!imageBase64) return;
    setLoading(true);
    setResult(null);

    const API_KEY ="YOUR_API_KEY_HERE";

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
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${API_KEY}`,
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">

      {/* Header */}
      <header className="bg-green-700 text-white py-6 px-4 shadow-lg">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold">🌾 KisanAI</h1>
          <p className="text-green-200 mt-1">
            Smart Crop Disease Detector | తెలివైన పంట వ్యాధి నిర్ధారణ
          </p>
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
              <img
                src={image}
                alt="Uploaded crop"
                className="max-h-64 mx-auto rounded-lg object-contain"
              />
            ) : (
              <div>
                <p className="text-4xl mb-2">📸</p>
                <p className="text-green-600 font-medium">Click to upload photo</p>
                <p className="text-gray-400 text-sm mt-1">
                  ఇక్కడ ఫోటో అప్లోడ్ చేయండి
                </p>
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
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              📋 ఫలితం | Result
            </h2>
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

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>🌾 KisanAI — Built with ❤️ for Indian Farmers | భారతీయ రైతుల కోసం</p>
      </footer>
    </div>
  );
}

export default App;
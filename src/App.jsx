import { useEffect, useState } from "react";
import CustomInput from "../src/shared/CustomInput";

const inputs = [
  { name: "destination", type: "text", label: "Where did you go? 📍" },
  { name: "experience", type: "textarea", label: "Tell us about your adventure... ✨" },
  { name: "tripType", type: "select", label: "Trip Type", options: ["Solo Adventure", "Family Trip", "Honeymoon", "Friends Trip"] },
  { name: "heroImage", type: "file", label: "Upload a beautiful photo 📸" },
  { name: "momentVideo", type: "file", label: "Upload a short video clip 🎥" },
  { name: "recommend", type: "checkbox", label: "I highly recommend visiting this place!" },
  { name: "privacy", type: "radio", label: "Public Post (Everyone can see)", value: "public" },
  { name: "privacy", type: "radio", label: "Private Post (Only me)", value: "private" },
];

function App() {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("travelPost");
    return saved ? JSON.parse(saved) : {};
  });

  function handleOnChange(name, value, type) {
    let finalValue = value;
    if (type === "file") {
      const file = value.target?.files?.[0];
      if (file) {
        finalValue = {
          url: URL.createObjectURL(file),
          fileType: file.type
        };
      }
    } else if (type === "radio") {
      finalValue = value;
    } else if (value?.target) {
      finalValue = value.target.value;
    }
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  }

  useEffect(() => {
    localStorage.setItem("travelPost", JSON.stringify(formData));
  }, [formData]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen font-sans bg-white">
      <div className="p-8 lg:p-12 border-r overflow-y-auto">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-black mb-2 text-blue-600 italic tracking-tight">Kazdura Editor</h2>
          <p className="text-gray-400 mb-8 text-sm">Design your travel story in real-time.</p>

          <div className="space-y-6">
            {inputs.map((item, idx) => (
              <div key={idx} className="pb-2 border-b border-gray-50">
                <CustomInput
                  key={item.name}
                  type={item.type}
                  label={item.label}
                  value={item.type === "radio" ? item.value : (formData[item.name] || "")}
                  checked={item.type === "radio" ? formData[item.name] === item.value : undefined}
                  onChange={(val) => handleOnChange(item.name, val, item.type)}
                  options={item.options}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-8 lg:p-12 bg-slate-50 flex items-center justify-center sticky top-0 h-screen overflow-y-auto">
        <div className="w-full max-w-sm">
          <h2 className="text-center text-slate-300 font-bold tracking-[0.3em] mb-8 uppercase text-[10px]">Live Experience Preview</h2>
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border border-white relative">
            <div className="h-64 bg-gray-100 relative shadow-inner">
              {formData.heroImage?.url ? (
                <img src={formData.heroImage.url} alt="Travel" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                  <span className="text-4xl mb-2">🖼️</span>
                  <span className="text-xs italic tracking-wide">Awaiting your masterpiece</span>
                </div>
              )}
              {formData.tripType && (
                <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black text-blue-600 shadow-xl uppercase">
                  {formData.tripType}
                </div>
              )}
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                {formData.destination || "Where to next?"}
              </h3>

              {formData.recommend && (
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1 rounded-lg text-[9px] font-bold mb-4 uppercase tracking-tighter">
                  <span className="text-sm">✨</span> Must Visit Place
                </div>
              )}

              <p className="text-gray-500 text-sm leading-relaxed mb-8 font-light italic">
                "{formData.experience || "The world is a book, and those who do not travel read only one page..."}"
              </p>

              {formData.momentVideo?.url && (
                <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-video bg-black">
                  <video controls className="w-full h-full object-cover">
                    <source src={formData.momentVideo.url} type={formData.momentVideo.fileType} />
                  </video>
                </div>
              )}

              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-200">
                    T
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 tracking-tight">Tasnem</p>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                      <p className="text-[9px] text-gray-400 font-medium uppercase tracking-widest">
                        {formData.privacy || "Draft"}
                      </p>
                    </div>
                  </div>
                </div>
                <button className="bg-slate-50 hover:bg-red-50 p-2 rounded-full transition-colors duration-300">
                  <span className="text-red-400">❤️</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
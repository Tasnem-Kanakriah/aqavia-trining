import { useEffect, useState } from "react";
import CustomInput from "../src/shared/CustomInput";

const commentInputs = [
  { name: "name", type: "text", label: "Your Name" },
  { name: "email", type: "email", label: "Email Address" },
  { name: "body", type: "textarea", label: "Share your travel experience..." },
];
const API_URL = "https://jsonplaceholder.typicode.com/comments";

function App() {
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadComments = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}?_limit=30`);
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.error("Error loading comments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, []);
  
  function handleOnChange(name, val) {
    const finalValue = val?.target ? val.target.value : val;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API_URL}/${isEditing}` : API_URL;

    if (isEditing) {
      setComments(comments.map(c => c.id === isEditing ? { ...c, ...formData } : c));
    } else {
      const newComment = { ...formData, id: Date.now() };
      setComments([newComment, ...comments]);
    }

    setFormData({});
    setIsEditing(null);

    fetch(url, {
      method: method,
      body: JSON.stringify(formData),
      headers: { "Content-type": "application/json" },
    });
  };

  const handleDelete = (id) => {
    setComments(comments.filter((c) => c.id !== id));
    fetch(`${API_URL}/${id}`, { method: "DELETE" });
  };

  const startEdit = (comment) => {
    setFormData(comment);
    setIsEditing(comment.id);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-slate-50 font-sans">
      <div className="p-8 bg-white border-r">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-black mb-2 text-blue-600 italic">Kazdura Reviews</h2>
          <p className="text-gray-400 mb-8 text-sm">Help others by sharing your journey.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {commentInputs.map((item, idx) => (
              <CustomInput
                key={idx}
                type={item.type}
                label={item.label}
                value={formData[item.name] || ""}
                onChange={(val) => handleOnChange(item.name, val)}
              />
            ))}
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
              {isEditing ? "Update My Review" : "Post My Experience"}
            </button>
          </form>
        </div>
      </div>

      <div className="p-8 overflow-y-auto max-h-screen">
        <h2 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] mb-6">Latest Travel Stories</h2>

        {loading ? <p className="text-center italic text-blue-500">Loading memories...</p> : (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white p-6 rounded-4xl shadow-sm border border-gray-100 relative group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold uppercase text-xs">
                      {comment.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm capitalize">{comment.name}</h4>
                      <p className="text-[10px] text-gray-400">{comment.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 ">
                    <button onClick={() => startEdit(comment)} className="text-blue-400 cursor-pointer hover:text-blue-600 text-base font-bold">Edit</button>
                    <button onClick={() => handleDelete(comment.id)} className="text-red-400 cursor-pointer hover:text-red-600 text-base font-bold">Delete</button>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed italic">"{comment.body}"</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
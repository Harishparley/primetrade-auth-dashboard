import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api';
import { Plus, Trash2, LogOut, Search } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await api.get('/notes');
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes");
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    setLoading(true);
    try {
      await api.post('/notes', { title, content });
      setTitle('');
      setContent('');
      fetchNotes();
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  // Filter logic for Search
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(search.toLowerCase()) || 
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
          <p className="text-gray-600 text-sm">{user?.email}</p>
        </div>
        <button onClick={logout} className="flex items-center gap-2 text-red-600 hover:bg-red-50 p-2 rounded-lg transition">
          <LogOut size={20} /> Logout
        </button>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Create Note Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
          <h2 className="font-semibold mb-4">Create New Note</h2>
          <form onSubmit={handleAddNote} className="space-y-4">
            <input 
              className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500" 
              placeholder="Title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
            <textarea 
              className="w-full border p-2 rounded h-24 focus:ring-2 focus:ring-indigo-500" 
              placeholder="Content" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 flex items-center justify-center gap-2">
              <Plus size={18} /> {loading ? 'Adding...' : 'Add Note'}
            </button>
          </form>
        </div>

        {/* Notes List */}
        <div className="md:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              className="w-full pl-10 pr-4 py-2 border rounded-xl bg-white shadow-sm focus:outline-none" 
              placeholder="Search notes..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {filteredNotes.length > 0 ? filteredNotes.map(note => (
              <div key={note._id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between group">
                <div>
                  <h3 className="font-bold text-lg">{note.title}</h3>
                  <p className="text-gray-600 mt-1">{note.content}</p>
                  <span className="text-xs text-gray-400 block mt-2">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <button onClick={() => deleteNote(note._id)} className="text-gray-300 hover:text-red-500 self-start transition">
                  <Trash2 size={20} />
                </button>
              </div>
            )) : <p className="text-center text-gray-500 py-10">No notes found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
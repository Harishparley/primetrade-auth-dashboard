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

  useEffect(() => { fetchNotes(); }, []);

  const fetchNotes = async () => {
    try {
      const res = await api.get('/notes');
      setNotes(res.data);
    } catch (err) { console.error("Fetch failed"); }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    try {
      await api.post('/notes', { title, content });
      setTitle(''); setContent('');
      fetchNotes();
    } catch (err) { alert("Failed to add note. Check console."); }
  };

  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter(n => n._id !== id));
    } catch (err) { alert("Delete failed"); }
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) || 
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-indigo-700">Primetrade Notes</h1>
        <div className="flex items-center gap-4">
          <span className="font-medium">Hi, {user?.name || 'User'}</span>
          <button onClick={logout} className="text-red-500 flex items-center gap-1"><LogOut size={18}/> Logout</button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md h-fit">
          <h2 className="font-bold mb-4">New Note</h2>
          <form onSubmit={handleAddNote} className="flex flex-col gap-3">
            <input className="border p-2 rounded" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <textarea className="border p-2 rounded h-24" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
            <button className="bg-indigo-600 text-white py-2 rounded flex justify-center items-center gap-2"><Plus size={18}/> Add</button>
          </form>
        </div>
        <div className="md:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18}/>
            <input className="w-full pl-10 pr-4 py-2 border rounded-lg" placeholder="Search notes..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="grid gap-4">
            {filteredNotes.map(note => (
              <div key={note._id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-start">
                <div><h3 className="font-bold text-lg">{note.title}</h3><p className="text-gray-600">{note.content}</p></div>
                <button onClick={() => deleteNote(note._id)} className="text-gray-400 hover:text-red-500"><Trash2 size={20}/></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
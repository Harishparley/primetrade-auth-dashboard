import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api';
import { Plus, Trash2, LogOut, Search, Notebook, StickyNote, Sun, Moon } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [search, setSearch] = useState('');
  
  // 🌓 Dark Mode State
  const [isDark, setIsDark] = useState(false);

  useEffect(() => { 
    fetchNotes(); 
    // Check if user has a preference saved
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

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
    <div className={`min-h-screen transition-colors duration-300 font-sans ${isDark ? 'bg-[#0F172A] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'}`}>
      
      {/* 🚀 Sleek Header */}
      <header className={`sticky top-0 z-20 backdrop-blur-xl border-b transition-colors duration-300 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-lg shadow-indigo-500/20">
              <Notebook size={24} />
            </div>
            <h1 className="text-xl font-black bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              Primetrade Notes
            </h1>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            {/* 🌓 Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-xl border transition-all active:scale-95 ${isDark ? 'bg-slate-800 border-slate-700 text-yellow-400' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Workspace</p>
              <p className={`text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{user?.name || 'User'}</p>
            </div>
            <button 
              onClick={logout} 
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all active:scale-95"
            >
              <LogOut size={18}/> <span className="hidden xs:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* 📝 Left Sidebar: New Note Card */}
          <div className="lg:col-span-4">
            <div className={`p-8 rounded-[2.5rem] shadow-2xl border transition-all duration-300 sticky top-28 ${isDark ? 'bg-slate-900 border-slate-800 shadow-black/20' : 'bg-white border-white shadow-slate-200/50'}`}>
              <h2 className={`text-lg font-black mb-6 flex items-center gap-2 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                <Plus className="text-indigo-500" size={24} strokeWidth={3} />
                Create New Note
              </h2>
              <form onSubmit={handleAddNote} className="space-y-4">
                <input 
                  className={`w-full border-none px-5 py-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-medium ${isDark ? 'bg-slate-800 text-white placeholder:text-slate-500' : 'bg-slate-50 text-slate-900 placeholder:text-slate-400'}`} 
                  placeholder="Note Title" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                />
                <textarea 
                  className={`w-full border-none px-5 py-4 rounded-2xl h-40 focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-medium resize-none ${isDark ? 'bg-slate-800 text-white placeholder:text-slate-500' : 'bg-slate-50 text-slate-900 placeholder:text-slate-400'}`} 
                  placeholder="Start typing your ideas..." 
                  value={content} 
                  onChange={e => setContent(e.target.value)} 
                />
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.97] flex justify-center items-center gap-2">
                  Add to My Notes
                </button>
              </form>
            </div>
          </div>

          {/* 🔍 Right Side: Notes Feed */}
          <div className="lg:col-span-8">
            <div className="relative mb-10 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={22}/>
              <input 
                className={`w-full pl-14 pr-6 py-5 border-none rounded-[1.5rem] shadow-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-medium text-lg ${isDark ? 'bg-slate-900 text-white shadow-black/10' : 'bg-white text-slate-900 shadow-slate-100'}`} 
                placeholder="Search through your thoughts..." 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
              />
            </div>

            <div className="grid gap-6">
              {filteredNotes.length > 0 ? (
                filteredNotes.map(note => (
                  <div 
                    key={note._id} 
                    className={`group p-7 rounded-[1.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border flex justify-between items-start overflow-hidden relative ${isDark ? 'bg-slate-900 border-slate-800 hover:shadow-indigo-500/10' : 'bg-white border-slate-100 hover:shadow-slate-200'}`}
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-indigo-500">
                        <StickyNote size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Personal Note</span>
                      </div>
                      <h3 className={`font-black text-xl leading-tight ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{note.title}</h3>
                      <p className={`font-medium leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{note.content}</p>
                    </div>
                    <button 
                      onClick={() => deleteNote(note._id)} 
                      className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
                    >
                      <Trash2 size={22}/>
                    </button>
                  </div>
                ))
              ) : (
                <div className={`text-center py-20 rounded-[2rem] border-2 border-dashed ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-100/50 border-slate-200'}`}>
                  <p className="text-slate-400 font-bold">No notes found matching "{search}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
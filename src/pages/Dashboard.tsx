import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText, Calendar, Clock } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { getNotesByUser, Note, testTableConnection } from '@/lib/notesService';
import { Link } from 'react-router-dom';



const Dashboard = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return notes;
    const q = query.toLowerCase();
    return notes.filter(n =>
      n.title?.toLowerCase().includes(q) ||
      n.summary?.toLowerCase().includes(q) ||
      n.content?.toLowerCase().includes(q)
    );
  }, [notes, query]);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user) return;

      try {
        // Test table connection first
        const tableExists = await testTableConnection();
        if (!tableExists) {
          console.error('Notes table does not exist or is not accessible');
          return;
        }

        const data = await getNotesByUser(user.id);
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
            <p className="text-gray-600 mt-2">Manage and organize your lecture notes</p>
          </div>
          <Link to="/record">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Record New Note
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes by title, summary, or content..."
            className="w-full md:w-1/2 border border-gray-200 rounded-md px-3 py-2"
          />
        </div>

        {filtered.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No notes found</h3>
              <p className="text-gray-600 mb-6">Try a different search or create a new note</p>
              <Link to="/record">
                <Button>Start Recording</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((note) => (
              <Card key={note.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
                    <Badge variant="secondary">AI Generated</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" />
                    {new Date(note.created_at).toLocaleDateString()}
                    {note.duration && (
                      <>
                        <Clock className="w-4 h-4 ml-2" />
                        {Math.round(note.duration / 60)}min
                      </>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3 mb-4">
                    {note.summary || note.content.substring(0, 150)}...
                  </p>
                  <div className="flex gap-2">
                    <Link to={`/notes/${note.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        View
                      </Button>
                    </Link>
                    <Link to={`/notes/${note.id}?edit=1`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        Edit
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 
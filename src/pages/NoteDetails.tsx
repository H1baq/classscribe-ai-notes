import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/lib/AuthContext';
import { deleteNote, getNoteById, updateNote } from '@/lib/notesService';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Trash2, ArrowLeft } from 'lucide-react';

const NoteDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const startInEdit = useMemo(() => searchParams.get('edit') === '1', [searchParams]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(startInEdit);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        const note = await getNoteById(id);
        if (!note) {
          navigate('/dashboard');
          return;
        }
        setTitle(note.title);
        setContent(note.content || '');
        setSummary(note.summary || '');
        setCreatedAt(note.created_at || null);
        setDuration(note.duration ?? null);
      } catch (error: any) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate, toast]);

  const handleSave = async () => {
    if (!id || !user) return;
    setSaving(true);
    try {
      await updateNote(id, { title: title.trim(), content, summary });
      toast({ title: 'Saved', description: 'Your changes have been saved.' });
      setIsEditing(false);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!confirm('Delete this note? This action cannot be undone.')) return;
    setDeleting(true);
    try {
      await deleteNote(id);
      toast({ title: 'Deleted', description: 'Note has been deleted.' });
      navigate('/dashboard');
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        <Loader2 className="w-4 h-4 animate-spin mr-2" /> Loading note...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        </div>
        <Card>
          <CardHeader className="flex flex-col gap-2">
            <CardTitle>{isEditing ? 'Edit Note' : 'Note Details'}</CardTitle>
            {createdAt && (
              <CardDescription>
                Created {new Date(createdAt).toLocaleString()}
                {duration ? ` • ${Math.round(duration / 60)}min` : ''}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div>
              <Label>Transcript</Label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="resize-none"
                disabled={!isEditing}
              />
            </div>

            <div>
              <Label>AI Summary</Label>
              <Textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={4}
                className="resize-none"
                disabled={!isEditing}
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
              {!isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    {deleting ? 'Deleting...' : 'Delete'}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={saving || !title.trim()}>
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Saving...' : 'Save'}
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NoteDetails;



import { supabase } from './supabaseClient';

export interface Note {
  id: string;
  user_id: string;
  title: string;
  content: string;
  summary: string | null;
  duration: number | null;
  created_at: string;
  updated_at?: string;
}

export async function getNotesByUser(userId: string): Promise<Note[]> {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data as Note[]) || [];
}

export async function getNoteById(id: string): Promise<Note | null> {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return (data as Note) || null;
}

export async function createNote(note: Omit<Note, 'id' | 'created_at' | 'updated_at'>): Promise<Note> {
  console.log('Creating note with data:', note);
  const { data, error } = await supabase
    .from('notes')
    .insert([note])
    .select()
    .single();
  if (error) {
    console.error('Supabase error details:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    });
    console.error('Full error object:', JSON.stringify(error, null, 2));
    throw error;
  }
  console.log('Note created successfully:', data);
  return data as Note;
}

export async function updateNote(id: string, updates: Partial<Omit<Note, 'id' | 'user_id' | 'created_at'>>): Promise<Note> {
  const { data, error } = await supabase
    .from('notes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Note;
}

export async function deleteNote(id: string): Promise<void> {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// Test function to check if table exists
export async function testTableConnection(): Promise<boolean> {
  try {
    console.log('Testing table connection...');
    const { data, error } = await supabase
      .from('notes')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Table connection test failed:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      console.error('Full table test error:', JSON.stringify(error, null, 2));
      return false;
    }
    
    console.log('Table connection test successful');
    return true;
  } catch (error) {
    console.error('Table connection test error:', error);
    return false;
  }
}



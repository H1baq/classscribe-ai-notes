import { supabase } from '../lib/supabaseClient';

// Fetch all notes
export async function getNotes() {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

// Add new note
export async function addNote(content) {
  const { data, error } = await supabase
    .from('notes')
    .insert([{ content }])
    .select();
  if (error) throw error;
  return data[0];
}

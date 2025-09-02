import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

interface Note {
  id: number
  content: string
  created_at: string
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    async function fetchNotes() {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error && data) {
        setNotes(data)
      }
    }
    fetchNotes()
  }, [])

  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return

    const { data, error } = await supabase
      .from('notes')
      .insert([{ content: input }])
      .select()

    if (!error && data) {
      setNotes([data[0], ...notes])
      setInput('')
    }
  }

  return (
    <div className="p-4 border rounded-xl shadow-md">
      <h2 className="text-lg font-bold mb-2">Notes</h2>
      <form onSubmit={handleAddNote} className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a note..."
          className="flex-1 border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {notes.map((note) => (
          <li key={note.id} className="p-2 border rounded">
            {note.content}
          </li>
        ))}
      </ul>
    </div>
  )
}

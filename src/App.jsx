import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from('notes')   // replace with your table name
        .select('*')

      if (error) {
        console.error(error)
      } else {
        setNotes(data)
      }
    }

    fetchNotes()
  }, [])

  return (
    <div>
      <h1>📒 Notes</h1>
      <ul>
        {notes.map(note => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default App

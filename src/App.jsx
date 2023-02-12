import { useEffect, useState } from "react";
import uuid from "react-uuid";

import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import './App.css'

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    // ローカルストレージにノートを保存する
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // useEffect(() => {
  //   setActiveNote(notes[0].id);
  // }, []);

  const onAddNote = () => {
    console.log("新しくノートが追加されました");
    const newNote = {
      id: uuid(),
      title: "新しいノート",
      content: "",
      nodDate: Date.now(),
    };
    setNotes([...notes, newNote]);
    console.log(notes);
  }

  const onDeleteNotes = (id) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote)
  }

  const onUpDateNote = (updatedNote) => {
    // 修正された新しいノートの配列を返す。
    const updatedNotesArray = notes.map((note) => {
      if(note.id === updatedNote.id) {
        console.log(updatedNote);
        return updatedNote;
      } else {
        return note;
      }
    });

    console.log(updatedNotesArray);
    setNotes(updatedNotesArray);
  };

  return (
    <div className="App">
      <Sidebar onAddNote={onAddNote} notes={notes} onDeleteNotes={onDeleteNotes} activeNote={activeNote} setActiveNote={setActiveNote} onUpDateNote={onUpDateNote} />
      <Main activeNote={getActiveNote()} onUpDateNote={onUpDateNote} />
    </div>
  )
}

export default App

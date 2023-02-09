import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
  const host = "http://localhost:5000"

    const notesInitial = []

   const [notes, setNotes] = useState(notesInitial)

   //Get all Notes

      const getNotes = async ()=>{
        //TODO API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token'  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlMTI5YmViZGVkM2E3YThmNGY4OGZjIn0sImlhdCI6MTY3NTc1ODQzOH0.WHxsb8EJzAxNRo1o4JulknbCuGhxBCnV9FEFnYrOnj8'
           }
        });

        const json = await response.json()
        console.log(json)
        setNotes(json)



 
      }


   //Add a Note
   console.log("adding a new note")
      const addNote = async (title, description, tag)=>{
        //TODO API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token'  : 'yeJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlMTI5YmViZGVkM2E3YThmNGY4OGZjIn0sImlhdCI6MTY3NTc1ODQzOH0.WHxsb8EJzAxNRo1o4JulknbCuGhxBCnV9FEFnYrOnj8'
           },
          body: JSON.stringify({title, description, tag})
        });
        

        const note = {
          "_id": "63e39c46978ba3f8f4801ff3",
          "user": "63e129bebded3a7a8f4f88fc",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2023-02-08T12:57:42.403Z",
          "__v": 0
        };
        setNotes(notes.concat(note))
      }
   //Delete a Note
      const deleteNote = (id)=>{
        //TODO API CALL
        console.log("Deleting a note with id:" + id);
        const newNotes = notes.filter((note)=>{ return note._id !== id})
        setNotes(newNotes)
        
      }
   //Edit a Note
   const editNote = async (id, title, description, tag)=>{
    //API CALL

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token'  : 'yeJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlMTI5YmViZGVkM2E3YThmNGY4OGZjIn0sImlhdCI6MTY3NTc1ODQzOH0.WHxsb8EJzAxNRo1o4JulknbCuGhxBCnV9FEFnYrOnj8'
       },
      body: JSON.stringify({title, description, tag})
    });
    const json =  response.json();
  

    //Logic to edit in client

          for (let index = 0; index < notes.length; index++) {
            const element = notes[index];

              if(element._id === id){
                element.title = title;
                element.description = description;
                element.tag = tag;
              }
        }
}

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
        
    )
}


export default NoteState;
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{

    const notesInitial = [
        {
          "_id": "63e2578e002c01bd13cd5a2f",
          "user": "63e129bebded3a7a8f4f88fc",
          "title": "My Title",
          "description": "My Description",
          "tag": "Personal",
          "date": "2023-02-07T13:52:14.504Z",
          "__v": 0
        },
        {
          "_id": "63e2578e002c01bd13cd5a31",
          "user": "63e129bebded3a7a8f4f88fc",
          "title": "My Title",
          "description": "My Description",
          "tag": "Personal",
          "date": "2023-02-07T13:52:14.662Z",
          "__v": 0
        },
        {
          "_id": "63e39c17978ba3f8f4801fee",
          "user": "63e129bebded3a7a8f4f88fc",
          "title": "My Title",
          "description": "My Description",
          "tag": "Personal",
          "date": "2023-02-08T12:56:55.910Z",
          "__v": 0
        },
        {
          "_id": "63e39c19978ba3f8f4801ff0",
          "user": "63e129bebded3a7a8f4f88fc",
          "title": "My Title",
          "description": "My Description",
          "tag": "Personal",
          "date": "2023-02-08T12:56:57.020Z",
          "__v": 0
        },
        {
          "_id": "63e39c46978ba3f8f4801ff3",
          "user": "63e129bebded3a7a8f4f88fc",
          "title": "My Title PS",
          "description": "My Description PS",
          "tag": "Personal",
          "date": "2023-02-08T12:57:42.403Z",
          "__v": 0
        }
      ]

   const[notes, setNotes] = useState(notesInitial)

   //Add a Note
      const addNote = ()=>{

      }
   //Delete a Note
      const deleteNote = ()=>{
        
      }
   //Edit a Note
   const editNote = ()=>{
        
   }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
        
    )
}


export default NoteState;
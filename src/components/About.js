import React, {useContext, useEffect} from 'react'
import noteContext from '../context/notes/NoteContext'

const About = () => {
  const a = useContext(noteContext);
  
  useEffect(() => {
    a.update()
    // eslint-disable-next-line 
  }, [])
  // useEffect(() => {
  //   const subscription = props.source.subscribe();
  //   return () => {
  //     // Clean up the subscription
  //     subscription.unsubscribe();
  //   };
  // });

  return (
    <div>
      <h2>This is About {a.state.name} of class {a.state.class}</h2>
    </div>
  )
}

export default About

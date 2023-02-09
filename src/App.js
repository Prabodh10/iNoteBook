import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';


function App() {
  return (
    <>
    <NoteState>

    <Router>
      

      <Navbar />
      <Alert message="This is an Alert"/> 
      <div className="container my-3">
               
          <Routes>

            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/about" element={<About/>}></Route>
          </Routes>


      </div>


      </Router>
  </NoteState>
    </>
  );
}

export default App;

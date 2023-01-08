import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainZoom from '../src/zoomComponents/mainZoom';
import Callback from './zoomComponents/Callback';
import MakeMeet from './zoomComponents/makeMeet';
import MainZoomPage from './zoomComponents/mainZoomPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element = {<MainZoomPage/>}/>
        <Route path="join-meet" element = {<MainZoom/>}/>
        <Route path="oauth-callback" element = {<Callback/>}/>
        <Route path="make-meet" element = {<MakeMeet/>}/>
      </Routes>
    </Router>
  );
}

export default App;

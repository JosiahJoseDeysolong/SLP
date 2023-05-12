import React from 'react';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Navbar from '../navbar';

// import here the pages
import Home from './home';
import Projects from './projects';
import Articles from './articles';
import Brochures from './brochures';
import Gallery from './gallery';

function Navpage() {
  return (
    <div className="Navpage">
        <header className="App-header">
        </header>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/projects' element={<Projects/>} />
            <Route path='/articles' element={<Articles/>} />
            <Route path='/brochures' element={<Brochures/>} />
            <Route path='/gallery' element={<Gallery/>} />
        </Routes>
    </div>
  );
}


function App() {
    return (
        <Router>
            <Navpage />
        </Router>
    );
}

export default App;

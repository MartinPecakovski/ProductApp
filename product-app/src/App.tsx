import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './home/Home';
import Finantials from './finantials/Finantials';

function App() {
  return (
    <div className="App">
      

     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/finantials' element={<Finantials/>} />
     </Routes>
    </div>
  );
}

export default App;

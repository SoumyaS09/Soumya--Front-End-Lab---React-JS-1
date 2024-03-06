import React from 'react'
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import ExpenseTracker from './Components/ExpenseTracker';
import ShowData from './Components/ShowData';

 function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/add" element={<ExpenseTracker onTrue={undefined} onClose={undefined}/>} />
          <Route path="/" element={<ShowData/>} />
        </Routes>
      </BrowserRouter>
    </div>  
  )
};
  // const App = () => {
  //     return (
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/add" element={ExpenseTracker} />
  //         <Route path="/" element={ShowData} />
  //       </Routes>
  //     </BrowserRouter>
  // );
  //     };

export default App;

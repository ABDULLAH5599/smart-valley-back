import logo from './logo.svg';
import React , { useEffect, useState } from 'react';
import './App.css';
import Home from './Components/Home/Home';

import {Route ,Routes,BrowserRouter } from "react-router-dom";
import Updateuser from './Components/Updateuser/Updateuser';

function App() {
    
  
  return (

    
<div className='App'>
<BrowserRouter>
   <Routes>
      <Route  path="/" element={<Home></Home>}> </Route>
      <Route  path="/update/:id" element={<Updateuser></Updateuser>}> </Route>
     
      
     
   
   </Routes>
   </BrowserRouter>
    

</div>
    
    
       

  );
};

export default App;

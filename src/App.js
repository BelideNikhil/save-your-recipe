import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Recipe from './Pages/recipe/Recipe'
import Create from './Pages/create/Create'
import Search from './Pages/search/Search'
import Home from './Pages/home/Home'
import Navbar from './Components/Navbar'
import ThemeChanger from './Components/ThemeChanger'

import { useTheme } from './Hooks/useTheme'

import './App.css';

function App() {
  const {color,mode}=useTheme()
  return (
      <div className={`App ${mode?"dark":null}`}>
        <BrowserRouter>
          <Navbar/>
          <ThemeChanger/>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/recipes/:id" element={<Recipe/>}></Route>
            <Route path="/create" element={<Create/>}></Route>
            <Route path="/search" element={<Search/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>      
  );
}

export default App;

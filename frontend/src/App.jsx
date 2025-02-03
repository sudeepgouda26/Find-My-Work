import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import LoginPage from './components/LoginPage'
import Register from './components/Register'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import Jobs from './components/Jobs'
axios.defaults.baseURL ='http://localhost:4000';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Register />}/>
          <Route path='/jobs' element={<Jobs/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
   
  )
}

export default App

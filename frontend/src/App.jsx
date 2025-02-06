import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import LoginPage from './components/LoginPage'
import Register from './components/Register'
import PrivateRoute from './components/PrivateRoute'
import { UserContextProvider } from './UserContext'
import Jobs from './components/Jobs'
import PostJob from './components/PostJob'

// axios.defaults.baseURL ='http://localhost:4000';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Register />}/>
          {/* <Route
            path="/get-jobs"
            element={
              <PrivateRoute>
                <Jobs />
              </PrivateRoute>
            }
          /> */}
          
          <Route
          path="/jobs/create" // ✅ Fixed frontend route
          element={
            <PrivateRoute>
              <PostJob />
            </PrivateRoute>
          }
        />
        </Route>
      </Routes>
    </UserContextProvider>
   
  )
}


export default App

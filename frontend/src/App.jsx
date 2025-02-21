import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import LoginPage from './components/LoginPage'
import Register from './components/Register'
import PrivateRoute from './components/PrivateRoute'
import { UserContextProvider } from './UserContext'
import Jobs from './components/Jobs'
import PostJob from './components/PostJob'
import UpdateJob from './components/UpdateJob'
import Stats from './components/Stats'
import MyJob from './components/MyJob'
import EditProfile from './components/EditProfile'
import Home from './Home'
import AboutUs from './components/AboutUs'
import Contact from './components/Contact'

// axios.defaults.baseURL ='http://localhost:4000';

function App() {
  return (
    <UserContextProvider>
    <Routes>
      {/* Layout wraps all routes, ensuring Header is always present */}
      <Route path="/" element={<Layout />}>
        {/* Body only renders on the home route */}
        <Route index element={<Home />} />
        <Route path="about" element={<AboutUs/>} />
        <Route path="contact" element={<Contact />} />

        {/* Authentication Routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<Register />} />

        {/* Protected Routes (Require Authentication) */}
        <Route
          path="jobs/create"
          element={
            <PrivateRoute>
              <PostJob />
            </PrivateRoute>
          }
        />
        <Route
          path="jobs/get"
          element={
            <PrivateRoute>
              <Jobs />
            </PrivateRoute>
          }
        />
        <Route
          path="update-job/:jobId"
          element={
            <PrivateRoute>
              <UpdateJob />
            </PrivateRoute>
          }
        />
        <Route
          path="my-jobs"
          element={
            <PrivateRoute>
              <MyJob />
            </PrivateRoute>
          }
        />
        <Route
          path="edit-profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="stats"
          element={
            <PrivateRoute>
              <Stats />
            </PrivateRoute>
          }
        />
      </Route>
      {/* <Route index element={<Footer />} /> */}
    </Routes>
  </UserContextProvider>

   
  )
}


export default App

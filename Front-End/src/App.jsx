import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import HotelsPage from './pages/HotelsPage';
import Layout from './componants/Layout';
import Places from './pages/PlacesPage';
import AIPlannerPage from './pages/AIPlannerPage';
import AboutPage from './pages/About';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import UserPickForm from './pages/UserpickForm';
import UserPickShowPage from './pages/UserPickShowPage';
import UserPickDetailsPage from './pages/UserPickDetailsPage';
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/About" element={<div>About Page</div>} />
          <Route path="/Hotels" element={<HotelsPage />} />
          <Route path='/Places' element={<Places />} />
          <Route path='/TamizhkaraiBot' element={<AIPlannerPage/>}/>
          <Route path='/About-us' element={<AboutPage/>}/>
          <Route path='/Login-page' element={<LoginPage/>}/>
          <Route path='/Signup-page' element={<SignUpPage/>}/>
          <Route path='/API/Tamizhkarai/Admin-Dashboard' element={<AdminDashboard/>}/>
          <Route path='/user-Dashboard' element={<UserDashboard/>}/>
          <Route path='/community-picks' element={<UserPickShowPage/>}/>
          <Route path='/community-picks/:id' element={<UserPickDetailsPage/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

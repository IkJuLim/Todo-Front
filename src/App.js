import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Main from './components/Main';
import ProfileForm from './components/ProfileForm';
import PasswordForm from './components/PasswordForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<Main />} />
        <Route path="/edit-profile" element={<ProfileForm />} />
        <Route path="/edit-password" element={<PasswordForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;

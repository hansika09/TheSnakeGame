import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import NewEntry from './pages/NewEntry';
import EditEntry from './pages/editEntry';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/new-entry" element={<NewEntry />} />
      <Route path="/edit-entry/:itemId" element={<EditEntry />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

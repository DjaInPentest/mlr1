import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home';
import DetailView from './DetailView';
import DetailEdit from './DetailEdit';
import Form from './Form';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/detail/:id"
          element={
            <ProtectedRoute>
              <DetailView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <DetailEdit />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <Form />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}



// — Почему работает этот код?
// — Не знаю.
// — А ты проверял?
// — Конечно! Я его уже в прод выкатываю.
export default App;




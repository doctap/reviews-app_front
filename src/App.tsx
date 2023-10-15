import React from 'react';
import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorPage, HomePage, Layout, ReviewPage } from './pages';
// import { OwnReviews, Reviews } from './components';
import { Login, Register, User } from './routes';
import { Reviews } from './components';

function App () {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} >
          <Route index element={<Reviews />} />
          <Route path="review/:id" element={<ReviewPage />} />
        </Route>

        <Route path="/user" element={<User />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/" element={<Navigate to="login" />} errorElement={<ErrorPage />} /> */}

      </Route>
    </Routes>
  );
}

export default App;

// <Routes>
//  <Route path='/' element={<Layout />}>
//    <Route path='/' element={<HomePage />} >
//      <Route index element={<Reviews />} />
//      <Route path='review/:id' element={<ReviewPage />} />
//    </Route>
//    <Route path='profilePage' element={<ProfilePage />}>
//      <Route index element={<OwnReviews />} />
//      <Route path='review/:id' element={<ReviewPage />} />
//    </Route>
//    <Route path='*' element={<NoPage />} />
//  </Route>
// </Routes>;

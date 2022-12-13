import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import Layout from './pages/layout/layout';
import NoPage from './pages/NoPage';
import { ProfilePage } from './pages/profilePage/ProfilePage';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<HomePage />} />
				<Route path='profilePage' element={<ProfilePage />} />
				<Route path='*' element={<NoPage />} />
			</Route>
		</Routes>
	);
}

export default App;
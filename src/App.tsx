import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import Layout from './pages/layout/layout';
import NoPage from './pages/NoPage';
import Reviews from './components/reviews/Reviews';
import ReviewPage from './pages/reviewPage/ReviewPage';
import { ProfilePage } from './pages/profilePage/ProfilePage';
import OwnReviews from './components/ownReviews/OwnReviews';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='/' element={<HomePage />} >
					<Route index element={<Reviews />} />
					<Route path='review/:id' element={<ReviewPage />} />
				</Route>
				<Route path='profilePage' element={<ProfilePage />}>
					<Route index element={<OwnReviews />} />
					<Route path='review/:id' element={<ReviewPage />} />
				</Route>
				<Route path='*' element={<NoPage />} />
			</Route>
		</Routes>
	);
}

export default App;
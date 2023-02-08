import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { HomePage, Layout, ProfilePage, ReviewPage } from './pages';
import { OwnReviews, Reviews } from './components';
import NoPage from './pages/NoPage';


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
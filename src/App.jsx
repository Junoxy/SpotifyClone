import './App.css';
import { Box } from '@mui/material';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './components/dashboard/dashboard';
import { getAccessToken } from './utils/getAccessToken';
import { getAccessTokenFromStorage } from './utils/getAccessTokenFromStorage';
import { useEffect,useState } from 'react';
import { Routes,Route } from 'react-router-dom';

function App({spotifyAPI}) {
	const [token,setToken] = useState(getAccessTokenFromStorage())

	useEffect(() => {
		const accessToken = getAccessTokenFromStorage() || getAccessToken()
		if (accessToken) {
			setToken(accessToken)
			sessionStorage.setItem('spotifyToken', accessToken)
			window.location.hash = ''
		}
	}, [])
	
	return (
		<Box className="App">
			{token ? <Dashboard spotifyAPI={spotifyAPI}/> : 
			<Routes>
				<Route path='*' element={<Login/>} />
			</Routes>
			}
			
			
		</Box>
	);
}

export default App;

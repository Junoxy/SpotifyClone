import './App.css';
import { Stack, Button, Box } from '@mui/material';
import Login from './pages/Login';

function App({spotifyAPI}) {
	console.log(spotifyAPI)
	return (
		<Box className="App">
			<Login/>
		</Box>
	);
}

export default App;

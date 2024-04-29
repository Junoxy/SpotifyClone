import { Box, Button } from '@mui/material';
import { accessURL } from '../config/config';

const Login = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh'
			}}
		>
			<img
				src="/Spotify_Logo.png"
				alt="Spotify Logo"
				style={{ marginBottom: '33px', width: '70%', maxWidth: '500px' }}
			/>
			<Button variant="contained" size="large" href={accessURL}>
				Login to Spotify
			</Button>
		</Box>
	);
};

export default Login;

import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import Home from '../../pages/Home';
import SideNav from '../sideNav/SideNav';
import Playlist from '../../pages/Playlist';
import { getAccessTokenFromStorage } from '../../utils/getAccessTokenFromStorage';
import { useEffect, useState } from 'react';
import Player from '../Player/Player';
import MobileNav from '../MobileNav/MobileNav';
import Library from '../../pages/Library';

const Dashboard = ({ spotifyAPI }) => {
	const [token, setToken] = useState(getAccessTokenFromStorage());
	const [hasConnected, setHasConnected] = useState(false);

	useEffect(() => {
		const onMount = async () => {
			await spotifyAPI.setAccessToken(token);
			setHasConnected(true);
		};
		if (token) {
			onMount();
		}
	}, []);

	return (
		<Box
			sx={{
				display: 'flex',
				height: '100vh',
				width: '100%',
				flexDirection: 'column'
			}}
		>
			<Box
				sx={{
					flex: 1,
					overflowY: 'auto',
					display: 'flex'
				}}
			>
				{token && hasConnected && <SideNav spotifyAPI={spotifyAPI} token={token} />}
				<Routes>
					<Route path="/playlist/:id" element={hasConnected && <Playlist spotifyAPI={spotifyAPI} token={token} />} />
					<Route path="/library" element={hasConnected && <Library spotifyAPI={spotifyAPI} token={token} />} />
					<Route path="/" element={<Home />} />
				</Routes>
			</Box>
			{token && hasConnected && <Player spotifyAPI={spotifyAPI} token={token} />}
			<MobileNav />
		</Box>
	);
};

export default Dashboard;

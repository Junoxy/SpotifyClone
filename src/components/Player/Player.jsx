import { Box, Grid, Typography, Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import PlayerControls from '../PlayerControls/PlayerControls';
import PlayerVolume from '../PlayerVolume/PlayerVolume';
import PlayerOverlay from '../PlayerOverlay/PlayerOverlay';

const Player = ({ spotifyAPI, token }) => {
	const [localPlayer, setLocalPlayer] = useState(null);
	const [isPaused, setIsPaused] = useState(false);
	const [current_track, setCurrentTrack] = useState();
	const [device, setDevice] = useState();
	const [duration, setDuration] = useState();
	const [progress, setProgress] = useState();
	const [active, setActive] = useState();
	const [PlayerOverlayIsOpen, setPlayerOverlayIsOpen] = useState(false);

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://sdk.scdn.co/spotify-player.js';
		script.async = true;

		document.body.appendChild(script);

		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: 'JunoPlayer^^',
				getOAuthToken: (cb) => {
					cb(token);
				},
				volume: 0.5
			});

			player.addListener('ready', ({ device_id }) => {
				console.log('Ready with Device ID', device_id);
				setDevice(device_id);
				setLocalPlayer(player);
			});

			player.addListener('not_ready', ({ device_id }) => {
				console.log('Device ID has gone offline', device_id);
			});

			player.addListener('player_state_changed', (state) => {
				if (!state || !state.track_window?.current_track) {
					return;
				}
				console.log(state);
				const duration = state.track_window.current_track.duration_ms / 1000;
				const progress = state.position / 1000;
				setDuration(duration);
				setProgress(progress);
				setIsPaused(state.paused);
				setCurrentTrack(state.track_window.current_track);

				player.getCurrentState().then((state) => {
					!state ? setActive(false) : setActive(true);
				});
			});

			player.connect();
		};
	}, []);

	useEffect(() => {
		if (!localPlayer) {
			return;
		}
		async function connect() {
			await localPlayer.connect();
		}

		connect();
		return () => {
			localPlayer.disconnect();
		};
	}, [localPlayer]);

	// useEffect(() => {
	//     const transferMyPlayback = async () => {
	// 		if (device) {
	// 			await spotifyAPI.transferMyPlayback([device], true);
	// 		}
	// 	};
	// 	const getDeviceFromApi = async () => {
	// 		await spotifyAPI.getMyDevices();
	// 	};
	// 	getDeviceFromApi();
	// 	transferMyPlayback();
	// }, [device,spotifyAPI])
	return (
		<Box>
			<Grid
				onClick={() => {
					setPlayerOverlayIsOpen((prevState) => !prevState);
					console.log('Open');
				}}
				container
				px={3}
				sx={{
					bgColor: 'background.paper',
					height: 80,
					cursor: { xs: 'pointer', md: 'auto' },
					width: '100%',
					borderTop: '1px solid #292929'
				}}
			>
				<Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
					<Avatar
						src={current_track?.album.images[0].url}
						alt={current_track?.album.name}
						variant="square"
						sx={{ width: '56px', height: '56px', marginRight: 2 }}
					/>
					<Box>
						<Typography sx={{ fontSize: '14px', color: 'text.primary' }}> {current_track?.name}</Typography>
						<Typography sx={{ fontSize: '10px', color: 'text.secondary' }}>
							{' '}
							{current_track?.artists[0].name}{' '}
						</Typography>
					</Box>
				</Grid>
				<Grid
					item
					sx={{
						display: { xs: 'none', md: 'flex' },
						justifyContent: 'center',
						alignItems: 'center'
					}}
					md={4}
				>
					{active ? (
						<PlayerControls
							progress={progress}
							isPaused={isPaused}
							duration={duration}
							player={localPlayer}
						/>
					) : (
						<Box> Please Transfer Playback </Box>
					)}
				</Grid>
				<Grid
					item
					xs={4}
					md={4}
					sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', alignItems: 'center' }}
				>
					<PlayerVolume player={localPlayer} />
				</Grid>
			</Grid>
			<PlayerOverlay
				PlayerOverlayIsOpen={PlayerOverlayIsOpen}
				closeOverlay={() => {
					setPlayerOverlayIsOpen(false);
				}}
				progress={progress}
				isPaused={isPaused}
				duration={duration}
				player={localPlayer}
				current_track={current_track}
				active={active}
			/>
		</Box>
	);
};

export default Player;

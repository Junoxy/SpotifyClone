import { Box, Avatar, Typography, Skeleton } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import SongTable from '../components/SongTable/SongTable';

const Playlist = ({ spotifyAPI, token }) => {
	const { id } = useParams();
	const [playlistInfo, setPlaylistInfo] = useState();
	const [songs, setSongs] = useState([]);
	const [status, setStatus] = useState({ isLoading: true, isError: null });

	const formatSongs = useCallback(
		(items) =>
			items.map((item, i) => {
				console.log({ item, i });
				const { track } = item;
				track.contextUri = `spotify:playlist:${id}`;
				track.position = i;
				return track;
			}),
		[id]
	);
	console;

	useEffect(() => {
		const getData = async () => {
			setStatus({ isLoading: true, isError: null });
			try {
				const playlistDetails = await spotifyAPI.getPlaylist(id);
				setPlaylistInfo({
					image: playlistDetails.body.images[0].url,
					name: playlistDetails.body.name
				});
				console.log(playlistDetails);
				const { items } = playlistDetails.body.tracks;
				console.log(items);
				// format songs
				const formattedSongs = formatSongs(items);
				setSongs(formattedSongs);
			} catch (error) {
				console.error(error);
				setStatus({ isLoading: false, isError: error });
			}
		};
		getData().finally(() => {
			setStatus({ isLoading: false, isError: null });
		});
	}, [id, formatSongs, spotifyAPI, token]);

	return (
		<Box
			id="playlist-page"
			sx={{
				bgcolor: 'backgroundColor.paper',
				flex: 1,
				overflowY: 'auto'
			}}
		>
			<Box
				p={{
					xs: 3,
					md: 4
				}}
				sx={{
					width: '100%',
					background: 'linear-gradient(0deg, #121212 0%, #1bd76060 100%)',
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: {
						xs: 'flex-start',
						md: 'flex-end',
						xl: 'flex-end'
					},
					gap: 3,
					boxSizing: 'border-box',
					flexDirection: {
						xs: 'column',
						md: 'row'
					}
				}}
			>
				{status.isLoading ? (
					<Skeleton variant='square' sx={{
                        width: {
                            xs: '100%',
                            md: '235px'
                        },
                        height: {
                            xs: '100%',
                            md: '235px'
                        }
                    }}/>
				) : (
					<Avatar
						src={playlistInfo?.image}
						variant="square"
						alt={playlistInfo?.name}
						sx={{
							boxShadow: 15,
							width: {
								xs: '100%',
								md: '235px'
							},
							height: {
								xs: '100%',
								md: '235px'
							}
						}}
					/>
				)}
				<Box>
					<Typography
						sx={{
							fontSize: '12px',
							fontWeight: 'bold',
							color: 'text.primary'
						}}
					>
						Playlist
					</Typography>
					{status.isLoading ? <Skeleton sx={{
							fontSize: {
								xs: '42px',
								md: '72px'
							},
                            width: '400px'
				
						}}/> : <Typography
						sx={{
							fontSize: {
								xs: '42px',
								md: '72px'
							},
							fontWeight: 'bold',
							color: 'text.primary'
						}}
					>
						{playlistInfo?.name}
					</Typography>}
				</Box>
			</Box>
            <Box>
                <SongTable songs={songs} loading={status.isLoading} spotifyAPI={spotifyAPI} />
            </Box>
		</Box>
	);
};

export default Playlist;

import { Box, List, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import PlaylistItem from '../components/PlaylistItem/PlaylistItem';

const Library = ({ spotifyAPI, token }) => {
	const [albumList, setAlbumList] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getPlaylists = async () => {
			if (!spotifyAPI) return;
			const data = await spotifyAPI.getUserPlaylists();
			setLoading(false);
			setAlbumList(data.body.items);
		};
		getPlaylists();
	}, [spotifyAPI, token]);

	const renderPlaylistItems = () => {
		if (loading) {
			return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e, i) => <PlaylistItem loading={loading} key={i} />);
		}
		return albumList.map((albumList, i) => <PlaylistItem key={i} loading={loading} {...albumList} />);
	};

	return (
		<Box
			id="library"
			px={3}
			sx={{
				display: { xs: 'flex', md: 'none' },
				bgcolor: 'background.default',
				flex: 1,
				flexDirection: 'column',
				overflowY: 'auto'
			}}
		>
			<Typography py={3} sx={{ color: 'text.primary', fontSize: '30px' }}>
				Your Library
			</Typography>
			<List>{renderPlaylistItems()}</List>
		</Box>
	);
};

export default Library;

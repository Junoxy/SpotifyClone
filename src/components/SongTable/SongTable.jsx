import { Box, Grid, Divider } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SongRow from '../SongRow/SongRow';
const SongTable = ({ songs, loading, spotifyAPI }) => {
	console.log({ songs, loading, spotifyAPI });

	const renderSongs = () => {
		if (loading) {
			return [1, 2, 3, 4, 5].map((e, i) => <SongRow key={i} loading={loading} images={null} i={i} />);
		}
		return songs.map((song, i) => (
			<SongRow
				images={song.album.images}
				title={song.name}
				artist={song.artists[0].name}
				album={song.album.name}
				duration={song.duration_ms / 1000}
				i={i}
				key={i}
				loading={loading}
				position={song.position}
				contextUri={song.contextUri}
				spotifyApi={spotifyAPI}
			/>
		));
	};

	return (
		<Box
			p={{
				xs: 3,
				md: 4
			}}
			sx={{
				overflowY: 'auto',
				display: 'flex',
				flex: 1,
				flexDirection: 'column'
			}}
		>
			<Grid
				container
				px={2}
				py={1}
				sx={{
					width: '100%',
					color: 'text.secondary',
					fontSize: '14px'
				}}
			>
				<Grid item sx={{ width: '35px', display: 'flex', alignItems: 'center' }}>
					#
				</Grid>
				<Grid item sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
					Title
				</Grid>
				<Grid item xs={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
					Album
				</Grid>
				<Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
					<AccessTimeIcon sx={{ width: '20px', height: '20px' }} />
				</Grid>
			</Grid>
			<Box pb={2}>
				<Divider sx={{ width: '100%', height: '1px' }} />
			</Box>
			{renderSongs()}
		</Box>
	);
};

export default SongTable;

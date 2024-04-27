import { Box, Button, Container, Grid, IconButton, Typography } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import PlayerControls from '../PlayerControls/PlayerControls';

const PlayerOverlay = ({ PlayerOverlayIsOpen, closeOverlay, progress, isPaused, duration, player, current_track, active}) => {
	return (
		<Box
			id="player-overlay"
			sx={{
				width: '100%',
				height: 'calc(100vh - 65px)',
				bgcolor: 'background.paper',
				display: { xs: 'block', md: 'none' },
				position: 'fixed',
				top: 0,
				left: 0,
				transition: 'all 0.3s',
				transform: PlayerOverlayIsOpen ? 'translateY(0px)' : 'translateY(100vh)'
			}}
		>
			<Container sx={{ height: '100%', background: 'linear-gradient(0deg, #121212 0%, #39d47250 100%)' }}>
				<Grid container direction={'column'} justifyContent={'space-between'} sx={{ height: '100%' }}>
					<Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
						<IconButton onClick={closeOverlay} sx={{ paddingLeft: '0px' }}>
							<KeyboardArrowDown fontSize="large" sx={{ color: 'text.primary' }} />
						</IconButton>
					</Grid>
					<Grid
						item
						xs={5}
						sx={{ backgroundImage: `url('${current_track?.album.images[0].url}')`, backgroundPosition: 'center', backgroundSize: 'cover' }}
					></Grid>
					<Grid item xs={1}>
						
						<Typography color={'text.primary'} fontSize={'28px'}>{current_track?.name}</Typography>
						<Typography color={'text.secondary'} fontSize={'18px'}>{current_track?.artists[0].name}</Typography>
					</Grid>
                    <Grid item>
                    {active ? (
						<PlayerControls
							progress={progress}
							isPaused={isPaused}
							duration={duration}
							player={player}
						/>
					) : (
						<Box> Please Transfer Playback </Box>
					)}
                        
                    </Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default PlayerOverlay;

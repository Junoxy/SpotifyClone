import { Stack, Box, Typography, Slider, IconButton } from '@mui/material';
import { formatTime } from '../../utils/formatTime';
import { PlayArrow, SkipNext, SkipPrevious, Pause } from '@mui/icons-material';
import { useState, useEffect } from 'react';

const PlayerControls = ({ isPaused, duration, progress, player }) => {
	const [currentProgress, setCurrentProgress] = useState(progress);
	const skipStyle = { width: '28px', height: '28px' };
	const playStyle = { width: '38px', height: '38px' };

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (!isPaused && player) {
				setCurrentProgress((prevState) => prevState + 1);
			}
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, [isPaused, player]);

	useEffect(() => {
		setCurrentProgress(progress);
	}, [progress]);

	return (
		<Stack direction={'column'} spacing={2} justifyContent={'center'} alignItems={'center'} sx={{ width: '100%', position:'fixed', bottom:'0' }}>
			<Stack direction={'row'} spacing={1} justifyContent={'center'} alignItems={'center'} sx={{ width: '100%', marginBottom:'-25px' }}>
				<IconButton
					size="small"
					sx={{ color: 'text.primary' }}
					onClick={() => {
						setCurrentProgress(0);
						player.previousTrack();
					}}
				>
					<SkipPrevious sx={skipStyle} />
				</IconButton>

				<IconButton
					size="small"
					sx={{ color: 'text.primary' }}
					onClick={() => {
						player.togglePlay();
					}}
				>
					{isPaused ? <PlayArrow sx={playStyle} /> : <Pause sx={playStyle} />}
				</IconButton>

				<IconButton
					size="small"
					sx={{ color: 'text.primary' }}
					onClick={() => {
						setCurrentProgress(0);
						player.nextTrack();
					}}
				>
					<SkipNext sx={skipStyle} />
				</IconButton>
			</Stack>
			<Stack spacing={2} direction={'row'} justifyContent={'center'} alignItems={'center'} sx={{ width: '75%' }}>
				<Typography sx={{ color: 'text.secondary', fontSize: '12px' }}>
					{formatTime(currentProgress)}
				</Typography>
				<Slider
				sx={{width:{xs:'80%',md:'40%'}}}
					max={duration}
					value={currentProgress}
					min={0}
					size="medium"
					onChange={(event, value) => {
						console.log('changed', value);
						setCurrentProgress(value);
					}}
					onChangeCommitted={(event, value) => {
						player.seek(value * 1000);
					}}
				/>
				<Typography sx={{ color: 'text.secondary', fontSize: '12px' }}>{formatTime(duration)}</Typography>
			</Stack>
		</Stack>
	);
};

export default PlayerControls;

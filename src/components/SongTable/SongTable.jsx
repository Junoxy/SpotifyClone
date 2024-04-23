import { Box, Grid,Divider } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material'
const SongTable = () => {
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
				<Grid item xs={3} sx={{ display:'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
					<AccessTimeIcon sx={{width: '20px', height: '20px'}}/>
				</Grid>
			</Grid>
            <Box pb={2}>
                <Divider sx={{width: '100%', height: '1px'}}/>
            </Box>
           
		</Box>
	);
};

export default SongTable;

import './NavPlaylist.css';
import { Box, Skeleton } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NavPlaylist = ({ name, id, loading }) => {
	return (
		<NavLink className={'playlist-navlink'} to={loading ? '' : `playlist${id}`} style={{ textDecoration: 'none' }}>
			<Box
				px={3}
				py={1}
				sx={{
					cursor: 'pointer',
					'&:hover': { color: 'white' },
					transition: 'color 0.2s ease-in-out',
					fontSize: '12px'
				}}
			>
			
				{loading ? <Skeleton variant='text' sx={{fontSize: '12px'}}/> :name}
			</Box>
		</NavLink>
	);
};

export default NavPlaylist;

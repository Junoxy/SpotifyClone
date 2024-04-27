import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, List } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MobileNav = () => {
	const nav = useNavigate();
	const [value, setValue] = useState(0);

	return (
		<Box
			sx={{
				display: { xs: 'block', md: 'none' }
			}}
		>
			<BottomNavigation
				sx={{ bgcolor: 'background.paper', color: 'text.secondary' }}
				showLabels
				value={value}
				onChange={(e, value) => {setValue(value)}}
			>
				<BottomNavigationAction
					icon={<Home />}
					label={'Home'}
					onClick={() => {
						nav('/');
					}}
				/>
				<BottomNavigationAction
					icon={<List />}
					label={'Library'}
					onClick={() => {
						nav('/library');
					}}
				/>
               
			</BottomNavigation>
		</Box>
	);
};

export default MobileNav;

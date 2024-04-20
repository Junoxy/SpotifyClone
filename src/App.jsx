import './App.css';
import { Stack, Button } from '@mui/material';

function App() {
	return (
		<div className="App">
			<Stack spacing={2} direction="row">
				<Button variant="contained">Text</Button>
				<Button variant="contained">Contained</Button>
				<Button variant="contained">Outlined</Button>
			</Stack>
		</div>
	);
}

export default App;

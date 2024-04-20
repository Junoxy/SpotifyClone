import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from '@mui/system';
import { themeOptions } from './theme/material-theme';
import SpotifyWebApi from 'spotify-web-api-node';
import { redirectURL } from './config/config';

const spotifyAPI = new SpotifyWebApi(
  {
    clientId: import.meta.env.VITE_CLIENT_ID ,
    clientSecret: import.meta.env.VITE_CLIENT_SECRET,
    redirectUri: redirectURL
  }
)


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProvider theme={themeOptions}>
			<App spotifyAPI={spotifyAPI} />
		</ThemeProvider>
	</React.StrictMode>
);

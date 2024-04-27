import { useState,useEffect } from "react";
import { Box,Divider } from "@mui/material";
import NavItem from "../navItem/NavItem";
import HomeIcon from '@mui/icons-material/Home'
import NavPlaylist from "../NavPlaylist/NavPlaylist";

const SideNav = ({ spotifyAPI, token }) => {
    const [playlists, setPlaylists] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getPlaylists = async () => {
            if(!spotifyAPI) return;
            const data = await spotifyAPI.getUserPlaylists()
            setPlaylists(data.body.items)
            setLoading(false)
        }
        getPlaylists()
    }, [spotifyAPI,token])

    const renderPlaylists = () => {
        if (loading) {
            return [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10].map((_,i) => <NavPlaylist key={i} loading={loading}/> ) 
        }
        console.log(playlists)
        return playlists.map((playlist, i) => <NavPlaylist key={i} id={playlist.id} name={playlist.name} />)
    }

    return <Box sx={{
        display: {xs: 'none', md: 'flex'},
        flexDirection: 'column',
        bgcolor: 'background.default',
        height: 'calc(100% + 80px)',
        width: 230

    }}>
        <Box p={3}>
            <img src="/Spotify_Logo.png" alt="" style={{width: '75%'}}/>
        </Box>
        <NavItem name='Home' Icon={HomeIcon} target={'/'}/>
        <Box px={3} py={1}>
            <Divider  sx={{backgroundColor: '#ffffff40'}}></Divider>
        </Box>
        <Box sx={{overflowY: 'auto', flex: 1}}>
            {renderPlaylists()}
        </Box>
    </Box>
}

export default SideNav;
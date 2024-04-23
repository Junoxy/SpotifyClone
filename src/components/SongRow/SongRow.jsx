import { Avatar, Box, Grid, Typography, Skeleton } from "@mui/material"
import { formatTime } from "../../utils/formatTime";

const SongRow = ({images, title, artist, album, duration, i, loading, position, contextUri, spotifyApi}) => {
    const image = images?.length > 0 ? images[0].url : null;

    const onRowClick = async () => {
        const song = {context_uri: contextUri, offset: {position: position}, position_ms: 0}
        await spotifyApi.play(song)
    }

    return (
        <Grid   
                onClick={onRowClick}
				container
				px={2}
				py={1}
				sx={{
					width: '100%',
					color: 'text.secondary',
					fontSize: '14px',
                    cursor: 'pointer',
                    '&:hover': {bgcolor: '#ffffff10'}
				}}
			>
				<Grid item sx={{ width: '35px', display: 'flex', alignItems: 'center', fontSize: '16px'}}>
                    {i + 1}
					
				</Grid>
				<Grid item sx={{ flex: 1, display: 'flex', alignItems: 'center' , gap: 2}}>
					{loading ? <Skeleton variant="square" width={40} height={40}/> : <Avatar variant="square" src= {image} alt={null}  />}
                    
                    <Box>
                        
                        <Typography sx={{fontSize: '16px', color: 'text.primary'}}>{loading ? <Skeleton variant="text" width={130} height={24}/> : title }</Typography>
                        <Typography  sx={{fontSize: '12px', color: 'text.secondary'}}>{loading ? <Skeleton variant="text" width={50} height={18}/> : artist }</Typography>
                    </Box>
				</Grid>
				<Grid item xs={3} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: "center"}}>
                {loading ? <Skeleton variant="text" width={50} height={24}/> : album }
				</Grid>
				<Grid item xs={3} sx={{ display:'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                {loading ? <Skeleton variant="text" width={50} height={24}/> : formatTime(duration) }
				</Grid>
			</Grid>
    )
}

export default SongRow;
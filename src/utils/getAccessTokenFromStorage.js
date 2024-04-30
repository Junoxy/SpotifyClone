export const getAccessTokenFromStorage = () => {
    const token = sessionStorage.getItem('spotifyToken')
    if ( token !== null) {
        return token
    } 
    return false
    
}
//turn seconds into minutes and seconds

export const formatTime = (s) => {
    const rest = (s % 60).toFixed(0)
    const m = Math.floor( s / 60)
    const restSeconds = rest < 10 ? `0${rest}` : rest;
    return `${m}:${restSeconds}`

}
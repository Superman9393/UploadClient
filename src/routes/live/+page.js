export const load = async({fetch})=>{
    const videoRes = await fetch("http://localhost:3000/videos")
    const videoData = await videoRes.json()
    
    return {
        videos: videoData
    }
}
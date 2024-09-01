export const load = async({fetch})=>{
    const videoRes = await fetch("http://192.168.1.211:5000/videos")
    const videoInfo = await videoRes.json()
    
    return {
        videos: videoInfo
    }
}
import { fetchFromTMDB } from "../services/tmdb.service.js"

export const getTrendingTv = async (req,res) => {
try {
    const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({success: true, content: randomMovie});
} catch (error) {
    console.log("Error in getTrendingMovie controller ", error.message)
    res.status(500).json({success: false, message: "Internal server error"})
}
}

export const getTvTrailers = async(req,res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);

        const trailers = data.results

        res.json({success: true, tvTrailers: trailers})
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null)
        }

        res.status(500).json({success: false, message: "Internal server error" })
    }
}

export const getTvDetails = async(req,res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        return res.status(200).json({success: true, tvDetails: data});
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null)
        }

        res.status(500).json({success: false, message: "Internal server error" })
    }
}


export const getSimilarTvs = async (req,res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.status(200).json({success: true, similarTvs: data})
    } catch (error) {
        console.log("Error in getSimilarMovies controller", error.message);
        if(error.message.includes("404")){
            return res.status(404).send(null)
        }
        res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const getTvCategories = async (req, res) => {
    const { category } = req.params;
    const validCategories = ["popular", "top_rated", "upcoming", "now_playing"];

    if (!validCategories.includes(category)) {
        return res.status(404).json({
            success: false,
            message: "Invalid movie category"
        });
    }

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)

        res.status(200).json({success: true, tvCategory: data.results})
    } catch (error) {
        console.log(`Error in getMovieByCategories controller for "${category}"`, error.message);

        if (error.response?.status === 404) {
            return res.status(404).json({
                success: false,
                message: "Invalid movie category"
            });
        }

        res.status(500).json({success: false, message: "Internal server error"})
    }
}
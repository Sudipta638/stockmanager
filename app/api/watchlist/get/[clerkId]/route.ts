import { getWatchListById } from "@/utlis/actions/watchlist.action";
import { GetWatchListParams, WatchListParams } from "@/types";
export const GET = async (req: Request, {params}: {params: GetWatchListParams}) => {
    try {
        console.log(params)
        const watchList = await getWatchListById(params.clerkId);

        // If watchlist not found
        if (watchList === 404) {
            return new Response(JSON.stringify("WatchList not found"), {
                status: 404,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }


        // If any internal server error
        if (watchList === 500) {
            return new Response(JSON.stringify("Internal Server Error"), {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }


        // Return watchlist
        return new Response(JSON.stringify(watchList), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify("Internal Server Error"), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });

}};
import { getWatchListByNameAndId } from "@/utlis/actions/watchlist.action";
import { GetWatchListParams, GetWatchListByNameParams } from "@/types";
import { updateWatchListbyNameandID } from "@/utlis/actions/watchlist.action";


// Get watchlist by name and ID
export const GET = async (req: Request, {params}: {params: GetWatchListByNameParams}) => {
    try {
        console.log(params)
        const watchList = await getWatchListByNameAndId(params.watchListName, params.clerkId);

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
// Update watchlist by name and ID
export const PUT = async (req: Request, {params}: {params: GetWatchListByNameParams}) => {
    try {

        // Get watchlist by name and ID
        const watchList: GetWatchListParams = await req.json();
        const updatedWatchList = await updateWatchListbyNameandID(params.watchListName, params.clerkId,watchList);
        console.log(params)
        console.log(watchList)
        // If watchlist not found
        if (updatedWatchList === 404) {
            return new Response(JSON.stringify("Updation Problem found"), {
                status: 404,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        // If any internal server error
        if (updatedWatchList === 500) {
            return new Response(JSON.stringify("Internal Server Error"), {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        // Return updated watchlist
        return new Response(JSON.stringify(updatedWatchList), {
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

}}
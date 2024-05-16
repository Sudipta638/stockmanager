//Importing all the required dependencies
import { CreateWatchListParams, UpdateWatchListParams } from "@/types";
import { createWatchList } from "@/utlis/actions/watchlist.action";


//Creating a new watchlist
export const POST = async (req: Request) => {

    try {
        const watchList: CreateWatchListParams = await req.json();
        const newWatchList = await createWatchList(watchList);

       //Returning the response

       //1. If the watchlist already exists
        if (newWatchList === 409) {
            return new Response(JSON.stringify("WatchList with this name already exists for this clerk"), {
                status: 409,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        //2. If the watchlist is created successfully
        if (newWatchList === 500) {
            return new Response(JSON.stringify("Internal Server Error"), {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        //3. If the watchlist is created successfully
        return new Response(JSON.stringify(newWatchList), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });

    } catch (error: any) {
        console.error(error);
        //Returning the error response
        return new Response(error, {
            status: 501,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

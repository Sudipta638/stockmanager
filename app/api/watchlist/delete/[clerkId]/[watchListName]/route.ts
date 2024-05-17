import { useParams } from "next/navigation";
import { deleteWatchListbyNameandId } from "@/utlis/actions/watchlist.action";
import { GetWatchListByNameParams } from "@/types";
export  const DELETE = async (req: Request, {params}: {params: GetWatchListByNameParams})=> {
   try{
         console.log(params)
         const watchList = await deleteWatchListbyNameandId(params.watchListName, params.clerkId);
         console.log(watchList)
         if (watchList === 404) {
              return new Response(JSON.stringify("WatchList not found"), {
                status: 404,
                headers: {
                     "Content-Type": "application/json",
                },
              });
         }
         if (watchList === 500) {
              return new Response(JSON.stringify("Internal Server Error"), {
                status: 500,
                headers: {
                     "Content-Type": "application/json",
                },
              });
         }
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
        }
}    
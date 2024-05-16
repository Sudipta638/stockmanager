"use client"
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { WatchListParams} from "@/types";
import { useEffect } from "react";
const GetWatchList = () => {
  const[watchList, setWatchList] = useState<WatchListParams>([] as unknown as WatchListParams); 
  const { user } = useUser();
  const clerkId = user?.id;
  console.log(clerkId);
  useEffect(() => {
    if(!clerkId) return;  
    const getWatchList = async () => {
      try {
        const response = await fetch(`/api/watchlist/get/${clerkId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
   
        });

        if (!response.ok) {
          throw new Error('Failed to fetch watchlist')
        }

        const data = await response.json();
        setWatchList(data);
      } catch (error) {
        console.error(error);
      }
    };
    
    getWatchList();
  }, [clerkId]);
  console.log(watchList);
  return (
    <div>GetWatchList</div>
  )
}

export default GetWatchList
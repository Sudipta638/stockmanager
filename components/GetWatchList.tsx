"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { WatchListParams } from "@/types";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const GetWatchList = () => {
  const [watchList, setWatchList] = useState<WatchListParams[]>(
    [] as unknown as WatchListParams[]
  );
  const { user } = useUser();
  const clerkId = user?.id;
  console.log(clerkId);
  const [isLoading, setIsLoading] = useState(true);
  const [watchlistfound ,setwatchlistfound] = useState(true);

  // Fetch watchlist data from the server
  useEffect(() => {
    if (!clerkId) return;
    const getWatchList = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/watchlist/get/${clerkId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // if (!response.ok) {
        //   throw new Error("Failed to fetch watchlist");
        // }
        if(response.status === 404){
          setwatchlistfound(false);
          console.error(response);
        } else if (response.status === 500) {
          console.error(response);
        }
        const data = await response.json();
        setIsLoading(false);
        setWatchList(data);
      } catch (error) {
        console.error(error);
      }
      
    };

    getWatchList();
  }, [clerkId]);
  console.log(watchList);

// Function to handle watchlist deletion
  async function handleDelete({watchListName}: {watchListName: string}) {
    try {
      const response = await fetch(`/api/watchlist/delete/${clerkId}/${watchListName}`, {
        method: 'DELETE',
      });
  
      if (response.status === 404) {
        // Handle watchlist not found error
        console.error(response);
      } else if (response.status === 500) {
        // Handle internal server error
        console.error(response);
      } else {
        // Handle successful deletion
        window.location.reload();
        console.log();
      }
  
      const data = await response.json();
  
    
    } catch (error) {
      console.error('There has been a problem with your fetch operation: ', error);
    }
  }

  // If watchlist is loading
  if (isLoading) {
    return <div className="flex items-center justify-center mt-10">Loading Watchlists...</div>; // Replace this with your loading UI
  }

  // If no watchlist found
  if (!watchlistfound) {
    return <div className="flex flex-col items-center justify-center mt-10">
      No Watchlist found.
      <Link href="/watchlist/create">
        <Button  className="ml-4 mt-4">Create Watchlist</Button>
      </Link>
    </div>; 
  }

  return (
    <div>
      <Label className="mt-4  flex text-center mx-auto justify-center text-3xl font-bold">
        {" "}
        Yours Watchlists
      </Label>
      <div className="grid md:grid-cols-3 justify-center items-center py-4 ">
        {watchList.map((watchlist) => (
          <div
            className="flex justify-center items-center py-4"
            key={watchlist.WatchListname}
          >
            <Card className="w-[270px] md:w-[350px]">
              <CardHeader>
                <CardTitle>{watchlist.WatchListname}</CardTitle>
                <CardDescription>
                  A Watchlist has {watchlist.Companyname[0].split(",").length}{" "}
                  Stock Symbols
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="">
                  <p>Stock Symbols</p>
                  <div className="grid grid-cols-2 gap-4">
                    {watchlist.Companyname[0]
                      .split(",")
                      .map((company, index) => (
                        <Button key={index} variant="ghost" className="mx-2">
                          {company.trim()}
                        </Button>
                      ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex  justify-end">
                  <Button variant="outline">
                    <Link href={`/watchlist/update/${watchlist.WatchListname}`}>
                      Update List
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="ml-4 md:ml-16">Delete List</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your Watchist and remove your watchlist data from server.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete({ watchListName: watchlist.WatchListname })}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetWatchList;

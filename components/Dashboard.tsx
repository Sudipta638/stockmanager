"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { WatchListParams } from "@/types";
import { useEffect } from "react";
import { DataTableDemo } from "./DataTable";
import { Watchlists } from "@/constants";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const Dashboard = () => {
  const [watchList, setWatchList] = useState<WatchListParams[]>(
    [] as unknown as WatchListParams[]
  );
  const { user } = useUser();
  const clerkId = user?.id;
  console.log(clerkId);
  const [isLoading, setIsLoading] = useState(true);
  const [watchlistfound, setwatchlistfound] = useState(true);
  const [watchlistfordata, setwatchlistfordata] = useState<WatchListParams>(
    {} as WatchListParams
  );
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
        if (response.status === 404) {
          setwatchlistfound(false);
          console.error(response);
        } else if (response.status === 500) {
          console.error(response);
        }
        const data = await response.json();
        setIsLoading(false);
        setwatchlistfordata(data[0]);
        setWatchList(data);
      } catch (error) {
        console.error(error);
      }
    };

    getWatchList();
  }, [clerkId]);
  console.log(watchList);

  return (
    <div className="mx-2 md:mx-10 my-4">
      <div className="flex">
        <h1 className="font-bold md:text-3xl mx-4 mt-2">Dashboard</h1>
        <div className="md:hidden">
          {!isLoading && watchlistfound ? (
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={watchlistfordata.WatchListname} />
              </SelectTrigger>
              <SelectContent>
                {watchList.map((watchlist, index) => (
                  <SelectItem
                    key={index}
                    onSelect={() => {setwatchlistfordata(watchlist)}}
                    value={watchlist.WatchListname}
                  >
                    {watchlist.WatchListname}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <h1>Watchlist not found</h1>
          )}
        </div>
      </div>

      <div className="flex">
        <div className="max-w-full md:w-9/12 px-4 rounded-lg my-4 border-2 border-black">
          {!isLoading ? (
            <DataTableDemo compamiesname={watchlistfordata.Companyname[0]} />
          ) : (
            <h1>Watchlist not found</h1>
          )}
        </div>
        <div className="border-2 hidden md:flex flex-col md:w-72 md:mx-10 my-4 p-10  border-black rounded ">
          <h1 className="font-bold text-2xl">My Watchlists</h1>
          {watchList.map((watchlist, index) => (
            <Button
              key={index}
              onClick={() => {
                setwatchlistfordata(watchlist);
              }}
              variant={watchlist === watchlistfordata ? "default" : "secondary"}
              className="my-4 "
            >
              {watchlist.WatchListname}
            </Button>
          ))}
          <Link href="/watchlist/create">
            <Button className="my-4" variant="secondary">
              Create Watchlist
              <Image
                src="/assets/images/plus.png"
                className="mx-4"
                alt="plus"
                width={20}
                height={20}
              />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

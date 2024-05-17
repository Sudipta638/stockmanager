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

  // Fetch watchlist data from the server
  useEffect(() => {
    if (!clerkId) return;
    const getWatchList = async () => {
      try {
        const response = await fetch(`/api/watchlist/get/${clerkId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch watchlist");
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
                          This action cannot be undone. This will permanently
                          delete  your Watchist and remove your watchlist data from server.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
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

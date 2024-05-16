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

const Dashboard = () => {
  return (
    <div className="mx-2 md:mx-10 my-4">
      <div className="flex">
        <h1 className="font-bold md:text-3xl mx-4 mt-2">Dashboard</h1>
        <div className="md:hidden">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Core Watchlist" />
          </SelectTrigger>
          <SelectContent>
            {Watchlists.map((watchlist) => (
              <SelectItem key={watchlist.id} value={watchlist.id}>
                {watchlist.id}
              </SelectItem>
            ))}
            <SelectItem value="Create Watchlist">Create Watchlist</SelectItem>
          </SelectContent>
        </Select>
        </div>
    
      </div>

      <div className="flex">
        <div className="max-w-full md:w-9/12 px-4 rounded-lg my-4 border-2 border-black">
          <DataTableDemo />
        </div>
        <div className="border-2 hidden md:flex flex-col md:w-72 md:mx-10 my-4 p-10  border-black rounded ">
          <h1 className="font-bold text-2xl">My Watchlists</h1>
          {Watchlists.map((watchlist) => (
            <Button key={watchlist.id} className="my-4 ">
              {watchlist.id}
            </Button>
          ))}
          <Button className="my-4" variant="outline">
            Create Watchlist
            <Image
              src="/assets/images/plus.png"
              className="mx-4"
              alt="plus"
              width={20}
              height={20}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

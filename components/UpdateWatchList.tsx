"use client";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { use, useEffect, useState } from "react";
import { WatchListParams } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"; // For showing toast notifications
import "react-toastify/dist/ReactToastify.css"; // Styles for toast notifications
import { ToastContainer } from "react-toastify"; // Container for toast notifications
import axios from "axios";



// Define form validation schema using zod
const formSchema = z.object({
  WatchListname: z.string().min(4, {
    message: "WatchList Name must be at least 4 characters.",
  }),
  CompanyName: z.string().min(0, {
    message: "Company Stock Symbol Name should not be null.",
  }),
});


// Component to update watchlist
const UpdateWatchList = () => {
  const params = useParams<{ WatchListName: string }>();
  console.log(params.WatchListName);
  const watchListName = params.WatchListName;
  const { user } = useUser();
  const router = useRouter();
  const clerkId = user?.id;
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [watchList, setWatchList] = useState<WatchListParams>(
    [] as unknown as WatchListParams
  );
  const [warning, setWarning] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [selectui, setselectui] = useState(false);



  // Initialize form using react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      WatchListname: "",
      CompanyName: "",
    },
  });

  useEffect(() => {
    if (inputValue) {
      axios
        .get(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo`
        )
        .then((response) => {
          if (response.data.bestMatches) {
            setSuggestions(
              response.data.bestMatches.map((match: any) => match["1. symbol"])
            );
          }
        })
        .catch((error) => console.error(error));
    }
  }, [inputValue]);


  // Fetch watchlist data from the server
  useEffect(() => {
    if (!clerkId) return;
    const getWatchList = async () => {
      try {
        const response = await fetch(
          `/api/watchlist/get/${clerkId}/${watchListName}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch watchlist");
        }
        const data = await response.json();
        setWatchList(data);
        console.log(data);
        form.reset(data);
        setCompanies(data.Companyname[0].split(", "));
      } catch (error) {
        console.error(error);
      }
    };
    getWatchList();
  }, [clerkId, watchListName, form]);

  // Function to handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values)
  
    const dataToPost = {
      ...values,
      Companyname: companies.join(", "),
      clerkId: clerkId ?? "",
    };
    console.log(dataToPost);
      try {
        const response = await fetch(`/api/watchlist/update/${clerkId}/${watchListName}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToPost),
        });

        if (response.status === 404) {
          toast.error("WatchList Updation Failed ");
          return;
        }

        if (response.status === 500) {
          toast.error("Empty Field can not be submitted");
          return;
        }
        toast.success("WatchList Updated Successfully");
        const data = await response.json();
        console.log(data);
       
      } catch (error) {
        console.error(error);
        toast.error("Internal Server Error");
      }

      console.log(values);
      router.push("/watchlist/get-watchlists");
  }

  // console.log(watchList);
  // console.log(companies);
  return (
    <div className="flex justify-center items-center my-10 flex-col ">
      <Label htmlFor=" update watchlist" className="my-4 text-2xl">
        {" "}
        Update WatchList{" "}
      </Label>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="WatchListname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WatchList Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your WatchList Name"
                    {...field}
                    readOnly
                  />
                </FormControl>
                <FormDescription>
                  You Can Not Edit WatchList Name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="CompanyName"
            render={({ field }) => (
              // <div>
              <FormItem className="my-2">
                <FormLabel>Stock Symbol</FormLabel>
                <FormControl>
                  <div>
                  <div className="flex">
                        <Input
                          className="mx-2"
                          placeholder="Enter Your Companies Stock Symbol"
                          {...field}
                          value={inputValue}
                          onChange={(event) => {
                            const value = event.target.value;
                            setInputValue(value);
                            setselectui(false);
                            if (value) {
                              setSuggestions((prevSuggestions) =>
                                prevSuggestions.filter((suggestion) =>
                                  suggestion.includes(value)
                                )
                              );
                            } else {
                              setSuggestions([]);
                            }
                            if (!suggestions.includes(value)) {
                              setWarning(true);
                            } else {
                              setWarning(false);
                            }
                          }}
                        />

                        <Button
                          type="button"
                          onClick={() => {
                            if (selectedSuggestion) {
                              setCompanies((prevCompanies) => [
                                ...prevCompanies,
                                selectedSuggestion,
                              ]);
                              setSelectedSuggestion("");
                            }
                          }}
                        >
                          Add company
                        </Button>
                      </div>
                      {warning && (
                        <p className="text-red-500">
                          Invalid Stock Symbol .Select from suggestions
                        </p>
                      )}
                      {inputValue &&!selectui&& suggestions.length> 0 && (
                        <div className="absolute z-10 mt-2 w-60 bg-white border border-gray-200 rounded shadow-lg">
                          {suggestions.map((suggestion, index) => (
                            <div
                              key={index}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setSelectedSuggestion(suggestion);
                                setInputValue(suggestion);
                                setSuggestions([]);
                                setWarning(false);
                                setselectui(true);
                              }}
                            >
                              {suggestion}
                            </div>
                          ))}
                        </div>
                      )}
                    <h1 className="py-4  font-bold">
                      {" "}
                      Added Companies Stock Symbol
                    </h1>

                    {companies ? (
                      companies.map((company, index) => (
                        <div
                          className="mx-2 my-2 flex justify-between"
                          key={index}
                        >
                          <h1 className="mx-2 p-2 border-1 shadow w-full">
                            {" "}
                            {company}
                          </h1>

                          <Button
                            type="button"
                            className="justify-end"
                            onClick={() => {
                              setCompanies((prevCompanies) =>
                                prevCompanies.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default UpdateWatchList;

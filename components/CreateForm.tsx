"use client";
// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUser } from "@clerk/nextjs";
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
import { set } from "mongoose";

// Define form validation schema using zod
const formSchema = z.object({
  WatchListname: z.string().min(4, {
    message: "WatchList Name must be at least 4 characters.",
  }),
  CompanyName: z.string().min(0, {
    message: "Company Stock Symbol Name should not be null.",
  }),
});

const CreateForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const router = useRouter();
  const { user } = useUser();
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

  // Fetch company suggestions from the server
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

  // Function to handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const dataToPost = {
      ...values,
      Companyname: companies.join(", "),
      clerkId: user?.id ?? "",
    };

    try {
      // Make a POST request to create a new watchlist
      const response = await fetch("/api/watchlist/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToPost),
      });

      // Handle different status codes
      if (response.status === 409) {
        toast.error("WatchList with this name already exists ");
        return;
      }

      // Handle empty field submission
      if (response.status === 500) {
        toast.error("Empty Field can not be submitted");
        return;
      }

      // Handle successful watchlist creation
      const data = await response.json();
      console.log(data);
      toast.success("WatchList Created Successfully");
    } catch (error) {
      // Handle internal server error
      console.error(error);
      toast.error("Internal Server Error");
    }

    console.log(values);
    router.push("/");
  }

  return (
    <div className="flex justify-center items-center my-10 flex-col mx-4">
      <Label htmlFor=" create watchlist" className="my-4 text-2xl">
        {" "}
        Create New WatchList{" "}
      </Label>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="WatchListname"
            render={({ field }) => (
              // <div>
              <FormItem>
                <FormLabel>WatchList Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your WatchList Name" {...field} />
                </FormControl>
                <FormDescription>
                  Your WatchList Name must be at least 4 characters.
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
                    </div>
                    <h1 className="py-4  font-bold">
                      {" "}
                      Added Companies Stock Symbol
                    </h1>
                    {companies.map((company, index) => (
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
                    ))}
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

export default CreateForm;

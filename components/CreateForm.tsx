"use client";
// Import necessary libraries and components
import React, { useState } from "react";
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
import { toast } from "react-toastify";// For showing toast notifications
import "react-toastify/dist/ReactToastify.css";// Styles for toast notifications
import { ToastContainer } from "react-toastify";// Container for toast notifications

// Define form validation schema using zod
const formSchema = z.object({
  WatchListname: z.string().min(4, {
    message: "WatchList Name must be at least 4 characters.",
  }),
  Companyname: z.string().min(1, {
    message: "Company Stock Symbol Name should not be null.",
  }),
});

const CreateForm = () => {

  const [inputValue, setInputValue] = useState("");
  const [companies, setCompanies] = useState<string[]>([]);
  const router = useRouter();
  const { user } = useUser();



  // Initialize form using react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      WatchListname: "",
      Companyname: "",
    },
  });
 


 // Function to handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    values.Companyname = companies.join(", ");
    const dataToPost = {
      ...values,
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
    <div className="flex justify-center items-center my-10 flex-col ">
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
            name="Companyname"
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
                        onChange={(event) => {
                          const value = event.target.value;
                          setInputValue(value);
                          field.onChange(event);
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          setCompanies((prevCompanies) => [
                            ...prevCompanies,
                            inputValue,
                          ]);
                          setInputValue("");
                        }}
                      >
                        Add company
                      </Button>
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

"use client";
import React, { useState } from "react";
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

const formSchema = z.object({
  WatchListname: z.string().min(4, {
    message: "WatchList Name must be at least 4 characters.",
  }),
  Companyname: z.string().min(0, {
    message: "WatchList Name must be at least 4 characters.",
  }),
});

const CreateForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [companies, setCompanies] = useState<string[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      WatchListname: "",
      Companyname: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    values.Companyname = companies.join(", ");
    console.log(values);
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
                      setCompanies((prevCompanies) => [...prevCompanies, inputValue]);
                      setInputValue('');
                    }}
                  >
                    Add company
                  </Button>
                  </div>
                  <h1 className="py-4  font-bold"> Added Companies Stock Symbol</h1>
                  {companies.map((company, index) => (
                  <div className="mx-2 my-2 flex justify-between" key={index}>
                    <h1 className="mx-2 p-2 border-1 shadow w-full">  {company}</h1>
                  
                    <Button
                      type="button"
                      className="justify-end"
                      onClick={() => {
                        setCompanies((prevCompanies) => prevCompanies.filter((_, i) => i !== index));
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
    </div>
  );
};

export default CreateForm;

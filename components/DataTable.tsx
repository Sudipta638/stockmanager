"use client";

import React, { useState, useEffect } from 'react';
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { symbolsname } from '@/constants';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const apiKey = '54SYMM61886U7BVM'; // replace with your actual API key
const interval = '5min';
const outputsize = 'full';
type LatestData = Stocks[];
const fetchData = async (): Promise<LatestData> => {
    const latestData = [];
    
    for (const item of symbolsname) {
      const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo`);
      const data = await response.json();
       console.log(data)

      const firstTimestamp = data['Meta Data']['3. Last Refreshed'];
      console.log(firstTimestamp)
   
      const firstData = data['Time Series (5min)'][firstTimestamp];
      console.log(firstData)
     
      latestData.push({
        stocksymbol: item.symbol,
        open: firstData["1. open"],
        high: firstData["2. high"],
        low: firstData["3. low"],
        close: firstData["4. close"],
        volume: firstData["5. volume"],
      });
    }
  
    return latestData;
  };


type Stocks = {
  stocksymbol: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
};

export const columns: ColumnDef<Stocks>[] = [
  
 
  {
    accessorKey: "stocksymbol",
    header: ({ column }) => {
      return (
        <div className=" flex justify-center text-xs md:text-xl"> 
             <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
       
        >
          Stock Symbol
          <CaretSortIcon className=" md:ml-2 h-4 w-2 md:w-4" />
        </Button>
        </div>
       
      );
    },
    cell: ({ row }) => <div className="md:capatilize text-center">{row.getValue("stocksymbol")}</div>,
  },
  {
    accessorKey: "open",
    header: () => <div className="text-right">Open</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("open"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "high",
    header: () => <div className="text-right">High</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("high"));

    
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "low",
    header: () => <div className="text-right">Low</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("low"));

     
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "close",
    header: () => <div className="text-right">Close</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("close"));

     
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "volume",
    header: () => <div className="text-right">Volume</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("volume"));

     
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <Button className="flex justify-end ml-20 -mr-10">
            Show Detials
        </Button>
      );
    },
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = useState<LatestData>([]);

  useEffect(() => {
    fetchData().then(latestData => setData(latestData));
  }, []);
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  
  return (
    <div className="w-full">
      <div className="flex items-center py-4 ">
        <Input
          placeholder="Filter stock symbols..."
          value={(table.getColumn("stocksymbol")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("stocksymbol")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border  w-full">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
       
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

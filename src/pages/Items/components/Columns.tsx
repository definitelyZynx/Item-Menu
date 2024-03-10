import { Button } from "@/components/ui/button";
import { IItem } from "@/interfaces/Item";
import { ColumnDef } from "@tanstack/react-table";
import { LuPenLine, LuTrash2 } from "react-icons/lu";
import { RxCaretSort } from "react-icons/rx";
import { Checkbox } from "@/components/ui/checkbox"

export const columns: ColumnDef<IItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border-slate-400 shadow-none ml-3"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-slate-400 shadow-none ml-3"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 hover:bg-transparent font-semibold text-primary"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <RxCaretSort className="ml-1 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="flex items-center gap-2">
        <div className="aspect-square h-[24px] bg-blue-400 rounded-sm">

        </div>
        {row.getValue("name")}
        </div>
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 hover:bg-transparent font-semibold text-primary"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <RxCaretSort className="ml-1 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "option",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 hover:bg-transparent font-semibold text-primary"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Option
          <RxCaretSort className="ml-1 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 hover:bg-transparent font-semibold text-primary"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <RxCaretSort className="ml-1 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(amount);
 
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "cost",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 hover:bg-transparent font-semibold text-primary"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cost
          <RxCaretSort className="ml-1 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("cost"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(amount);
 
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 hover:bg-transparent font-semibold text-primary"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock
          <RxCaretSort className="ml-1 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "action",
    header: () => {
      return (
        <Button
          className="p-0 hover:bg-transparent font-semibold text-primary cursor-default"
          variant="ghost"
        >
          Action
        </Button>
      )
    },
    cell: () => {
      return (
      <div className="flex items-center gap-2">
        <Button
          className="p-0 hover:bg-transparent"
          variant="ghost"
        >
          <LuPenLine />
        </Button>

        <Button
          className="p-0 hover:bg-transparent"
          variant="ghost"
        >
          <LuTrash2 />
        </Button>
      </div>);
    },
  },
]
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { ICategory, IItem } from "@/interfaces/Item";
import { ColumnDef } from "@tanstack/react-table";
import { RxCaretSort } from "react-icons/rx";
// import { Checkbox } from "@/components/ui/checkbox"
import DataTableActions from "./DataTableActions";

interface columnsProps {
  onEdit: any;
  onDelete: any;
  categoryData: ICategory[];
}

export const columns = ({ onEdit, onDelete, categoryData }: columnsProps): ColumnDef<IItem>[] => [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="border-slate-400 shadow-none ml-3"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="border-slate-400 shadow-none ml-3"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 hover:bg-transparent font-semibold text-primary ml-3"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <RxCaretSort className="ml-1 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="flex items-center gap-2 ml-3">
        <div className={`aspect-square h-[24px] bg-cover bg-white bg-center bg-no-repeat rounded-sm`} style={{backgroundImage: `url(${row.original.image ?? `https://i.ibb.co/KrJ654X/4693713-200.png`})`}}>

        </div>
        <p className=" truncate max-w-[280px]">{row.getValue("name")}</p>
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
    cell: ({ row }) => {
      const category = categoryData.find(category => category.uuid === row.getValue("category"));

      return category?.name
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
    cell: ({ row }) => {
      const value = row.getValue("option") !== "" || row.getValue("option") !== null || row.getValue("option") !== undefined ? row.getValue("option") : "N/A";
      return (
        <div>
          {value}
        </div>
      )
    }
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
    cell: ({ row }) => <DataTableActions row={row} onEdit={onEdit} onDelete={onDelete} />
  },
]

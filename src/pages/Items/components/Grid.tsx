import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { formatToCurrency } from "@/helper/Common";
import { IItem } from "@/interfaces/Item";
import React from "react";
import { LuMoreHorizontal, LuPenLine, LuTrash2 } from "react-icons/lu";

interface GridProps {
  data: IItem[];
  onEdit: () => void;
  onDelete: () => void;
}

const Grid: React.FC<GridProps> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="flex flex-row gap-5 justify-evenly flex-wrap">
      {data.map((item: IItem, index: number) => {
        return (
          <Card key={index} className="relative w-[350px] rounded-sm">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="absolute mr-1 top-0 right-0 rounded-sm shadow-none px-2 border-0 bg-transparent"
                  variant="outline"
                >
                  <LuMoreHorizontal size={19} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-fit">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => onEdit()}>
                    <LuPenLine className="mr-2" />
                    Edit Item
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => onDelete()}>
                    <LuTrash2 className="mr-2" />
                    Delete Item
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="w-full min-h-[300px] bg-accent rounded-sm"></div>
            <CardHeader className="p-4">
              <CardTitle>{item.name}</CardTitle>
              <CardDescription className="font-medium">{item.category}</CardDescription>
            </CardHeader>
            <CardContent className="px-4 py-0">
              <div className="grid grid-cols-2 w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label
                    htmlFor="option"
                    className="text-slate-400 font-normal mb-[-6px]"
                  >
                    Option
                  </Label>
                  <p id="option" className="text-md font-medium text-[14px]">
                    Large
                  </p>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label
                    htmlFor="option"
                    className="text-slate-400 font-normal mb-[-6px]"
                  >
                    Stock
                  </Label>
                  <p id="option" className="text-md font-medium text-[14px]">
                    25 remaining
                  </p>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label
                    htmlFor="option"
                    className="text-slate-400 font-normal mb-[-6px]"
                  >
                    Price
                  </Label>
                  <p id="option" className="text-md font-medium text-[14px]">
                    {formatToCurrency(100, "PHP")}
                  </p>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label
                    htmlFor="option"
                    className="text-slate-400 font-normal mb-[-6px]"
                  >
                    Cost
                  </Label>
                  <p id="option" className="text-md font-medium text-[14px]">
                    {formatToCurrency(90, "PHP")}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between"></CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default Grid;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  LuLayoutGrid,
  LuLayoutList,
  LuPackagePlus,
  LuSearch,
} from "react-icons/lu";
import { DataTable } from "./components/DataTable";
import { IItem } from "@/interfaces/Item";
import { columns } from "./components/Columns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Items = () => {
  const testData: IItem[] = [
    {
      id: 1,
      category: "Drinks",
      name: "Hot Chocolate",
      option: "Large",
      price: 100,
      cost: 90,
      stock: 25,
    },
    {
      id: 1,
      category: "Mains",
      name: "Burger",
      option: "With Fries",
      price: 120,
      cost: 100,
      stock: 15,
    },
    {
      id: 1,
      category: "Drinks",
      name: "Hot Chocolate",
      option: "Large",
      price: 100,
      cost: 90,
      stock: 25,
    },
    {
      id: 1,
      category: "Mains",
      name: "Burger",
      option: "With Fries",
      price: 120,
      cost: 100,
      stock: 15,
    },
    {
      id: 1,
      category: "Drinks",
      name: "Hot Chocolate",
      option: "Large",
      price: 100,
      cost: 90,
      stock: 25,
    },
    {
      id: 1,
      category: "Mains",
      name: "Burger",
      option: "With Fries",
      price: 120,
      cost: 100,
      stock: 15,
    },
    {
      id: 1,
      category: "Drinks",
      name: "Hot Chocolate",
      option: "Large",
      price: 100,
      cost: 90,
      stock: 25,
    },
    {
      id: 1,
      category: "Mains",
      name: "Burger",
      option: "With Fries",
      price: 120,
      cost: 100,
      stock: 15,
    },
    {
      id: 1,
      category: "Drinks",
      name: "Hot Chocolate",
      option: "Large",
      price: 100,
      cost: 90,
      stock: 25,
    },
    {
      id: 1,
      category: "Mains",
      name: "Burger",
      option: "With Fries",
      price: 120,
      cost: 100,
      stock: 15,
    },
    {
      id: 1,
      category: "Drinks",
      name: "Hot Chocolate",
      option: "Large",
      price: 100,
      cost: 90,
      stock: 25,
    },
    {
      id: 1,
      category: "Mains",
      name: "Burger",
      option: "With Fries",
      price: 120,
      cost: 100,
      stock: 15,
    },
    {
      id: 1,
      category: "Drinks",
      name: "Hot Chocolate",
      option: "Large",
      price: 100,
      cost: 90,
      stock: 25,
    },
    {
      id: 1,
      category: "Mains",
      name: "Burger",
      option: "With Fries",
      price: 120,
      cost: 100,
      stock: 15,
    },
    {
      id: 1,
      category: "Drinks",
      name: "Hot Chocolate",
      option: "Large",
      price: 100,
      cost: 90,
      stock: 25,
    },
    {
      id: 1,
      category: "Mains",
      name: "Burger",
      option: "With Fries",
      price: 120,
      cost: 100,
      stock: 15,
    },
    {
      id: 1,
      category: "Drinks",
      name: "Hot Chocolate",
      option: "Large",
      price: 100,
      cost: 90,
      stock: 25,
    },
    {
      id: 1,
      category: "Mains",
      name: "Burger",
      option: "With Fries",
      price: 120,
      cost: 100,
      stock: 15,
    },
    {
      id: 1,
      category: "Drinks",
      name: "Hot Chocolate",
      option: "Large",
      price: 100,
      cost: 90,
      stock: 25,
    },
    {
      id: 1,
      category: "Mains",
      name: "Burger",
      option: "With Fries",
      price: 120,
      cost: 100,
      stock: 15,
    },
    {
      id: 1,
      category: "Drinks",
      name: "Hot Chocolate",
      option: "Large",
      price: 100,
      cost: 90,
      stock: 25,
    },
    {
      id: 1,
      category: "Mains",
      name: "Burger",
      option: "With Fries",
      price: 120,
      cost: 100,
      stock: 15,
    },
    {
      id: 1,
      category: "Drinks",
      name: "Hot Chocolate",
      option: "Large",
      price: 100,
      cost: 90,
      stock: 25,
    },
    {
      id: 1,
      category: "Mains",
      name: "Burger",
      option: "With Fries",
      price: 120,
      cost: 100,
      stock: 15,
    },
  ];

  const [activeView, setActiveView] = useState("list");

  return (
    <div className="flex flex-col gap-3 w-full py-3 px-4">
      <div className="flex gap-2">
        {/* Search */}
        <Input
          className="flex-1 border-0 shadow-none pl-9"
          icon={<LuSearch size={18} />}
          placeholder="Search items by name..."
        />

        {/* Change View Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="rounded-sm shadow-none px-2 border-0"
              variant="outline"
            >
              {activeView == "list" ? (
                <LuLayoutList size={23} />
              ) : (
                <LuLayoutGrid size={23} />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit">
            <DropdownMenuLabel>Change View</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuRadioGroup
              value={activeView}
              onValueChange={setActiveView}
            >
              <DropdownMenuRadioItem value="list" className="pr-5">
                <LuLayoutList size={17} className="mr-2" />
                List View
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="grid">
                <LuLayoutGrid size={17} className="mr-2" />
                Grid View
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Add Item */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-sm shadow-none" variant="outline">
              <LuPackagePlus className="mr-2" size={17} />
              Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[350px] md:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Add New Item</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              
            </div>
            <DialogFooter>
              <Button type="button">Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full h-full flex-1">
        <DataTable columns={columns} data={testData} />
      </div>
    </div>
  );
};

export default Items;

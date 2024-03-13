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
import { useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";
import Grid from "./components/Grid";

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

  // =-=-=-=-=-=-=-=-=-=-= States =-=-=-=-=-=-=-=-=-=-= //
  const [activeView, setActiveView] = useState("list");
  const [imagePreview, setImagePreview] = useState("");
  const [newItem, setNewItem] = useState<IItem>({
    name: "",
    category: "",
    option: null,
    price: 0,
    cost: 0,
    stock: 0,
    image: null,
  });

  // =-=-=-=-=-=-=-=-=-=-= Functions =-=-=-=-=-=-=-=-=-=-= //
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  useEffect(() => {
    console.log(newItem);
  }, [newItem]);

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
          <DialogContent className="w-full md:max-w-[850px]">
            <DialogHeader>
              <DialogTitle>Add New Item</DialogTitle>
              <DialogDescription>
                Add a new item for your customers.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3 w-full">
              <div className="flex flex-col flex-1 w-full gap-3">
                <div>
                  <Label htmlFor="itemImage">Image Preview</Label>
                  <div
                    id="itemImage"
                    className="aspect-square bg-accent rounded-sm"
                    style={{
                      backgroundImage: `url(${imagePreview})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="itemUpload">Upload Image</Label>
                  <Input
                    type="file"
                    id="itemUpload"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="flex flex-col flex-1 gap-3 w-full">
                <div className="w-full items-center gap-1.5">
                  <Label htmlFor="itemName">Name</Label>
                  <Input
                    type="text"
                    id="itemName"
                    placeholder="Enter name for your item"
                    onChange={(e) =>
                      setNewItem((prev: IItem) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="w-full items-center gap-1.5">
                  <Label htmlFor="itemCategory">Category</Label>
                  <Input
                    className="w-full"
                    type="text"
                    id="itemCategory"
                    placeholder="Select a category for your item"
                    onChange={(e) =>
                      setNewItem((prev: IItem) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="w-full items-center gap-1.5">
                  <Label htmlFor="itemOption">Option</Label>
                  <Input
                    type="text"
                    id="itemOption"
                    placeholder="Ex. Small, Medium, Large..."
                    onChange={(e) =>
                      setNewItem((prev: IItem) => ({
                        ...prev,
                        option: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-3">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="itemPrice">Price</Label>
                    <Input
                      type="number"
                      id="itemPrice"
                      placeholder="Enter sale price"
                      onChange={(e) =>
                        setNewItem((prev: IItem) => ({
                          ...prev,
                          price: e.target.valueAsNumber,
                        }))
                      }
                    />
                  </div>

                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="itemCost">Cost</Label>
                    <Input
                      type="number"
                      id="itemCost"
                      placeholder="Enter production cost"
                      onChange={(e) =>
                        setNewItem((prev: IItem) => ({
                          ...prev,
                          cost: e.target.valueAsNumber,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="itemStock">Stock</Label>
                  <Input
                    type="text"
                    id="itemStock"
                    placeholder="Available amount for this item"
                    onChange={(e) =>
                      setNewItem((prev: IItem) => ({
                        ...prev,
                        stock: e.target.valueAsNumber,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button">Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full h-full flex-1">
        {activeView == "list" ? (
          <DataTable columns={columns} data={testData} />
        ) : (
          <Grid data={testData} />
        )}
      </div>
    </div>
  );
};

export default Items;

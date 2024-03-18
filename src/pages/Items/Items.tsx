/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useRef, useState } from "react";
import {
  LuCheck,
  LuChevronsUpDown,
  LuGroup,
  LuLayoutGrid,
  LuLayoutList,
  LuPackagePlus,
  LuSearch,
} from "react-icons/lu";
import { DataTable } from "./components/Table/DataTable";
import { ICategory, IItem } from "@/interfaces/Item";
import { columns } from "./components/Table/Columns";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Grid from "./components/Grid/Grid";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Toaster, toast } from "sonner";
import { delete_db, update_db, write_db } from "@/helper/DbFunctions";
import { uploadImage } from "@/helper/Image";
import { get, onValue, ref, update, } from "firebase/database";
import { db } from "@/config/Firebase";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import useDesktopRange from "@/hooks/useDesktopRange";
import Category from "./components/Category/Category";
import MobileList from "./components/List/MobileList";


const Items = () => {
  const buttonSheetRef = useRef<HTMLButtonElement | null>(null);
  const buttonDeleteRef = useRef<HTMLButtonElement | null>(null);
  const isDesktop = useDesktopRange();

  // * =-=-=-=-=-=-=-=-=-=-= States =-=-=-=-=-=-=-=-=-=-= //
  const [itemData, setItemData] = useState<IItem[]>([]);
  const [filteredData, setFilteredData] = useState<IItem[]>([]);
  const [categoryData, setCategoryData] = useState<ICategory[]>([]);
  const [activeView, setActiveView] = useState("list");

  const [openAddItem, setOpenAddItem] = useState(false);
  const [openAddCat, setOpenAddCat] = useState(false);

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState("");
  const [selectedItem, setSelectedItem] = useState<IItem>({
    uuid: "",
    name: "",
    category: "",
    option: null,
    price: 0,
    cost: 0,
    stock: 0,
    image: null,
  });
  const [selectedCategory, setSelectedCategory] = useState<ICategory>({
    uuid: "",
    name: "",
  });
  const [originalCategory, setOriginalCategory] = useState(""); // Use to check if category was edited.

  // * =-=-=-=-=-=-=-=-=-=-= Use Effects =-=-=-=-=-=-=-=-=-=-= //
  // Load Data from Firebase DB
  useEffect(() => {
    const dataRef = ref(db);

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setItemData(data.items ? Object.values(data.items) : []);
      setCategoryData(data.categories ? Object.values(data.categories) : []);

      setFilteredData(data.items);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500)
  }, [activeView])
 

  // * =-=-=-=-=-=-=-=-=-=-= Functions =-=-=-=-=-=-=-=-=-=-= //
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);

      setSelectedItem((prev: IItem) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const searchItemByName = (input: string) => {
    if (input.trim() === '') {
      setFilteredData(itemData);
    } else {
      const filteredData = itemData.filter(item =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredData(filteredData);
    }
  };

  // Add New Item
  const onAddItem = async () => {
    if (selectedItem?.image) {
      toast.promise(
        Promise.all([uploadImage(selectedItem?.image)]).then(([imageUrl]) => {
          return write_db("items", { ...selectedItem, image: imageUrl }).then((response) => {
            return addToCategory(selectedItem.category, response)
          });
        }),
        {
          loading: "Adding item...",
          success: selectedItem.name + " was added successfully!",
          error: "Failed to add item",
        }
      );
    }
    else {
      toast.promise(
        Promise.all([write_db("items", { ...selectedItem })]).then((response) => {
          return addToCategory(selectedItem.category, response[0]);
        }),
        {
          loading: "Adding item...",
          success: selectedItem.name + " was added successfully!",
          error: "Failed to add item",
        }
      );
    }

    // Reset Image Preview and Item
    setImagePreview("");
    setSelectedItem({
      uuid: "",
      name: "",
      category: "",
      option: null,
      price: 0,
      cost: 0,
      stock: 0,
      image: null,
    })
  };

  // Add Category
  const onAddCategory = async () => {
    if (selectedCategory) {
      toast.promise(write_db("categories", selectedCategory), {
        loading: "Please wait...",
        success: selectedCategory.name + " was added successfully!",
        error: "Something went wrong!",
      });
    }
  };

  // Add Item to Category
  const addToCategory = async (categoryId: string, newItemId: string) => {
    try {
      const categoryRef = ref(db, `categories/${categoryId}`);
      const snapshot = await get(categoryRef);
      const categoryData = snapshot.val();
      const updatedItemIds = categoryData.itemIds ? [...categoryData.itemIds, newItemId] : [newItemId];
  
      await update(ref(db, `categories/${categoryId}`), {
        ...categoryData,
        itemIds: updatedItemIds
      });
    } catch (error) {
      return error;
    }
  };

  // Remove Item from Category
  const removeItemFromCategory = async (categoryId: string, itemId: string) => {
    try {
      const categoryRef = ref(db, `categories/${categoryId}`);
      const snapshot = await get(categoryRef);
      const categoryData = snapshot.val();
  
      if (categoryData && categoryData.itemIds && categoryData.itemIds.includes(itemId)) {
        const updatedItemIds = categoryData.itemIds.filter((id: string) => id !== itemId);
        
        await update(ref(db, `categories/${categoryId}`), {
          ...categoryData,
          itemIds: updatedItemIds
        });
      }
    } catch (error) {
      return error;
    }
  };

  // Set Item to Edit
  const onEdit = (item: IItem) => {
    if (buttonSheetRef && buttonSheetRef.current) {
      buttonSheetRef.current.click();
    }

    setImagePreview("");

    setSelectedItem({
      uuid: item.uuid,
      name: item.name,
      category: item.category,
      option: item.option,
      price: item.price,
      cost: item.cost,
      stock: item.stock,
      image: item.image,
    });
    setOriginalCategory(item.category);
  };

  const onEditConfirm = async  () => {
    if(selectedItem.category !== originalCategory){
      // Transfer item to new category
      await removeItemFromCategory(originalCategory, selectedItem.uuid);
      await addToCategory(selectedItem.category, selectedItem.uuid);
    }


    if (selectedItem?.image) {
      toast.promise(
        Promise.all([uploadImage(selectedItem?.image)]).then(([imageUrl]) => {
          return update_db("items", selectedItem.uuid, { ...selectedItem, image: imageUrl });
        }),
        {
          loading: "Updating item...",
          success: selectedItem.name + " was updated successfully!",
          error: "Failed to update item",
        }
      );
    }
    else {
      toast.promise(update_db("items", selectedItem.uuid, selectedItem), {
        loading: "Updating item...",
        success: selectedItem.name + " was updated successfully!",
        error: "Failed to update item",
      });
    }
  }

  // Set Item to Delete
  const onDelete = (item: IItem) => {
    if (buttonDeleteRef && buttonDeleteRef.current) {
      buttonDeleteRef.current.click();
    }

    setSelectedItem({
      uuid: item.uuid,
      name: item.name,
      category: item.category,
      option: item.option,
      price: item.price,
      cost: item.cost,
      stock: item.stock,
      image: item.image,
    });
  };

  // Delete Item on Database
  const confirmDelete = () => {
    toast.promise(Promise.all([delete_db("items", selectedItem.uuid), removeItemFromCategory(selectedItem.category, selectedItem.uuid)]), {
      loading: "Please wait...",
      success: selectedItem.name + " was deleted successfully!",
      error: "Something went wrong!",
    });
  };

  const renderEmpty = () => {
    return (
      <div className="flex flex-col pt-10 gap-8 justify-center items-center">
        <img className="max-w-80 md:max-w-96" src="https://i.ibb.co/bPPjPZK/No-Results-3x.png" />
        <p className="font-semibold text-black/50">No items found.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 w-full py-3 px-4">
      <div className="flex gap-2">
        <Toaster richColors />

        {/* Search */}
        <Input
          className="flex-1 border-0 shadow-none pl-9"
          icon={<LuSearch size={18} />}
          placeholder="Search items..."
          onChange={(e) => searchItemByName(e.target.value)}
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
              ) : activeView == "grid" ? (
                <LuLayoutGrid size={23} />
              ) : (
                <LuGroup size={23} />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit">
            <DropdownMenuLabel>Change View</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuRadioGroup
              value={activeView}
              onValueChange={(e) => {
                setActiveView(e);
                setIsLoading(true);
              }}
            >
              <DropdownMenuRadioItem
                value="list"
                className="pr-5 cursor-pointer"
              >
                <LuLayoutList size={17} className="mr-2" />
                List View
              </DropdownMenuRadioItem>

              <DropdownMenuRadioItem value="grid" className="cursor-pointer">
                <LuLayoutGrid size={17} className="mr-2" />
                Grid View
              </DropdownMenuRadioItem>

              <DropdownMenuRadioItem
                value="category"
                className="pr-5 cursor-pointer"
              >
                <LuGroup size={17} className="mr-2" />
                Categories
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Add Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-sm shadow-none" variant="outline">
              <LuPackagePlus className="mr-2" size={17} />
              Add New
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit">
            <DropdownMenuRadioGroup>
              <DropdownMenuItem
                className="pr-3 cursor-pointer"
                onClick={() => setOpenAddItem(true)}
              >
                Item
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setOpenAddCat(true)}
              >
                Category
              </DropdownMenuItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isLoading ? (
        <div className="w-full pt-12 flex flex-col justify-center items-center flex-1">
          <div className="w-12 h-12 rounded-full animate-spin border-8 border-solid border-[#101727]  border-t-transparent"></div>
          <p className="font-medium ml-1 mt-2">Please wait...</p>
        </div>
      ) : (
        <ScrollArea className="w-full h-full flex-1">
          {activeView === "list" ? (
            isDesktop ? (
              <DataTable
                columns={columns({ onEdit, onDelete, categoryData })}
                data={filteredData}
              />
            ) : filteredData.length === 0 ? (
              renderEmpty()
            ) : (
              <MobileList
                data={filteredData}
                categoryData={categoryData}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            )
          ) : activeView === "grid" ? (
            filteredData.length === 0 ? (
              renderEmpty()
            ) : (
              <Grid
                data={filteredData}
                categoryData={categoryData}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            )
          ) : filteredData.length === 0 ? (
            renderEmpty()
          ) : (
            <Category
              data={filteredData}
              categoryData={categoryData}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )}
        </ScrollArea>
      )}

      {/* Add Item Modal */}
      <Dialog open={openAddItem} onOpenChange={setOpenAddItem}>
        <DialogContent className="w-full md:max-w-[850px]">
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
            <DialogDescription>
              Add a new item for your customers.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <div className="flex flex-col flex-1 w-full gap-3">
              <div className="hidden md:block">
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
                    setSelectedItem((prev: IItem) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="w-full flex flex-col gap-1.5">
                <Label htmlFor="itemCategory">Category</Label>
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={popoverOpen}
                      className="w-full justify-between font-normal"
                    >
                      {selectedItem.category
                        ? categoryData.find(
                            (category) =>
                              category.uuid === selectedItem.category
                          )?.name
                        : "Select categories..."}
                      <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search categories..."
                        className="h-9"
                      />
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {categoryData.map((category) => (
                            <CommandItem
                              key={category.uuid}
                              value={category.uuid}
                              onSelect={(currentValue) => {
                                setSelectedItem((prev: IItem) => ({
                                  ...prev,
                                  category:
                                    currentValue === selectedItem.category
                                      ? category.uuid
                                      : category.uuid,
                                }));
                                setPopoverOpen(false);
                              }}
                              className="cursor-pointer"
                            >
                              {category.name}
                              <LuCheck
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  selectedItem.category === category.uuid
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {/* <Input
                  className="w-full"
                  type="text"
                  id="itemCategory"
                  placeholder="Select a category for your item"
                  onChange={(e) =>
                    setSelectedItem((prev: IItem) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                /> */}
              </div>

              <div className="w-full items-center gap-1.5">
                <Label htmlFor="itemOption">Option</Label>
                <Input
                  type="text"
                  id="itemOption"
                  placeholder="Ex. Small, Medium, Large..."
                  onChange={(e) =>
                    setSelectedItem((prev: IItem) => ({
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
                      setSelectedItem((prev: IItem) => ({
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
                      setSelectedItem((prev: IItem) => ({
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
                  type="number"
                  id="itemStock"
                  placeholder="Available amount for this item"
                  onChange={(e) =>
                    setSelectedItem((prev: IItem) => ({
                      ...prev,
                      stock: e.target.valueAsNumber,
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" onClick={() => onAddItem()}>
                Confirm
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Category Modal */}
      <Dialog open={openAddCat} onOpenChange={setOpenAddCat}>
        <DialogContent className="w-full md:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Add a new category for your items.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 w-full">
            <div className="w-full items-center gap-1.5">
              <Label htmlFor="itemName">Name</Label>
              <Input
                type="text"
                id="itemName"
                placeholder="Enter name for your category"
                value={selectedCategory.name}
                onChange={(e) =>
                  setSelectedCategory((prev: ICategory) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" onClick={() => onAddCategory()}>
                Confirm
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      {selectedItem && (
        <Sheet>
          <SheetTrigger asChild>
            <Button ref={buttonSheetRef} variant="outline" className="hidden">
              Open
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full md:w-3/4 p-5 overflow-y-auto">
            <ScrollArea className="w-full">
              <SheetHeader className="mb-2">
                <SheetTitle>Edit Item</SheetTitle>
                <SheetDescription>
                  Make changes to your item here. Click save when you're done.
                </SheetDescription>
              </SheetHeader>
              <div className="w-full flex flex-col gap-1">
                <div className="w-full px-12">
                  <div
                    className="bg-accent aspect-square w-full"
                    style={{
                      backgroundImage: `${
                        imagePreview
                          ? `url(${imagePreview}`
                          : `url(${selectedItem.image}`
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <Input
                    type="file"
                    id="itemUpload"
                    accept="image/*"
                    className="pt-[6px] rounded-sm mt-1"
                    onChange={handleImageChange}
                  />
                </div>

                <div className="w-full items-center gap-1.5">
                  <Label htmlFor="editName">Name</Label>
                  <Input
                    type="text"
                    id="editName"
                    placeholder="Enter name for your item"
                    value={selectedItem?.name}
                    onChange={(e) =>
                      setSelectedItem((prev: IItem) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="w-full items-center gap-1.5">
                  <Label htmlFor="editCategory">Category</Label>
                  <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={popoverOpen}
                        className="w-full justify-between font-normal"
                      >
                        {selectedItem.category
                          ? categoryData.find(
                              (category) =>
                                category.uuid === selectedItem.category
                            )?.name
                          : "Select categories..."}
                        <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search categories..."
                          className="h-9"
                        />
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {categoryData.map((category) => (
                              <CommandItem
                                key={category.uuid}
                                value={category.uuid}
                                onSelect={(currentValue) => {
                                  setSelectedItem((prev: IItem) => ({
                                    ...prev,
                                    category:
                                      currentValue === selectedItem.category
                                        ? category.uuid
                                        : category.uuid,
                                  }));
                                  setPopoverOpen(false);
                                }}
                                className="cursor-pointer"
                              >
                                {category.name}
                                <LuCheck
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    selectedItem.category === category.uuid
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {/* <Input
                    className="w-full"
                    type="text"
                    id="editCategory"
                    placeholder="Select a category for your item"
                    value={selectedItem?.category}
                    onChange={(e) =>
                      setSelectedItem((prev: IItem) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                  /> */}
                </div>

                <div className="w-full items-center gap-1.5">
                  <Label htmlFor="editOption">Option</Label>
                  <Input
                    type="text"
                    id="editOption"
                    placeholder="Ex. Small, Medium, Large..."
                    value={selectedItem?.option || ""}
                    onChange={(e) =>
                      setSelectedItem((prev: IItem) => ({
                        ...prev,
                        option: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex flex-col items-center md:flex-row gap-3 mt-1">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="editPrice">Price</Label>
                    <Input
                      type="number"
                      id="editPrice"
                      placeholder="Enter price"
                      value={selectedItem?.price}
                      onChange={(e) =>
                        setSelectedItem((prev: IItem) => ({
                          ...prev,
                          price: e.target.valueAsNumber,
                        }))
                      }
                    />
                  </div>

                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="editCost">Cost</Label>
                    <Input
                      type="number"
                      id="editCost"
                      placeholder="Enter cost"
                      value={selectedItem?.cost}
                      onChange={(e) =>
                        setSelectedItem((prev: IItem) => ({
                          ...prev,
                          cost: e.target.valueAsNumber,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="editStock">Stock</Label>
                  <Input
                    type="number"
                    id="editStock"
                    placeholder="Available amount for this item"
                    value={selectedItem?.stock}
                    onChange={(e) =>
                      setSelectedItem((prev: IItem) => ({
                        ...prev,
                        stock: e.target.valueAsNumber,
                      }))
                    }
                  />
                </div>
              </div>
              <SheetFooter className="mt-2">
                <SheetClose asChild>
                  <Button type="submit" onClick={() => onEditConfirm()}>
                    Save changes
                  </Button>
                </SheetClose>
              </SheetFooter>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      )}

      {/* Confirm Delete Modal */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            ref={buttonDeleteRef}
            className="rounded-sm shadow-none hidden"
            variant="outline"
          ></Button>
        </DialogTrigger>
        <DialogContent className="max-w-[450px]">
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this item?
            </DialogTitle>
            <DialogDescription>
              This will delete the item permanently, you cannot undo this
              action.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col md:flex-row gap-2 md:gap-0">
            <DialogClose asChild>
              <Button type="button" onClick={() => confirmDelete()}>
                Confirm
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Items;

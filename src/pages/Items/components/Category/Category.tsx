/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICategory, IItem } from "@/interfaces/Item";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { LuMoreVertical, LuPenLine, LuTrash2 } from "react-icons/lu";
import { formatToCurrency } from "@/helper/Common";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { delete_db, update_db } from "@/helper/DbFunctions";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ref, update } from "firebase/database";
import { db } from "@/config/Firebase";

interface CategoryProps {
  data: IItem[];
  categoryData: ICategory[];
  onEdit: (item: IItem) => void;
  onDelete: (item: IItem) => void;
}

const Category: React.FC<CategoryProps> = ({
  data,
  categoryData,
  onEdit,
  onDelete,
}) => {
  const editSheetRef = useRef<HTMLButtonElement | null>(null);
  const deleteButtonRef = useRef<HTMLButtonElement | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<ICategory>({
    uuid: "",
    name: "",
  });
  
  const onEditSelect = (category: ICategory) => {
    if (editSheetRef && editSheetRef.current) {
      editSheetRef.current.click();
    }

    setSelectedCategory({
      uuid: category.uuid,
      name: category.name
    })
  }

  const onEditConfirm = async () => {
    toast.promise(update_db("categories", selectedCategory.uuid, selectedCategory), {
      loading: "Updating category...",
      success: "Category was updated successfully!",
      error: "Failed to update item",
    });
  }

  const onDeleteSelect = (category: ICategory) => {
    if (deleteButtonRef && deleteButtonRef.current) {
      deleteButtonRef.current.click();
    }

    setSelectedCategory({
      uuid: category.uuid,
      name: category.name
    })
  }

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory])

  const onDeleteConfirm = async () => {
    const updates: { [key: string]: any } = {};
    const itemIds = data.filter(item => item.category === selectedCategory.uuid).map(item => item.uuid);

    itemIds.forEach(itemId => {
      updates[`/items/${itemId}`] = null;
    });

    try {
      toast.promise(Promise.all([update(ref(db), updates), delete_db("categories", selectedCategory.uuid)]), {
        loading: "Please wait...",
        success: "Category deleted along with " + itemIds.length + " item/s.",
        error: "Something went wrong!",
      });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className="w-full flex flex-col gap-2">
      {categoryData.map((category: ICategory) => {
        const items = data.filter((item) => item.category === category.uuid);

        return (
          <Accordion type="single" collapsible>
            <AccordionItem value={category.uuid} className="border-0">
              <div className="flex w-full px-4 items-center gap-2 bg-blue-100 rounded-sm">
                <AccordionTrigger>
                  <div>
                    <p className="font-semibold">{category.name}</p>
                  </div>
                </AccordionTrigger>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="rounded-sm shadow-none px-0 border-0 bg-transparent hover:bg-gray-100/5 z-10"
                      variant="outline"
                    >
                      <LuMoreVertical size={21} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-fit min-w-fit mr-4">
                    <DropdownMenuRadioGroup>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => onEditSelect(category)}>
                        <LuPenLine size={17} className="mr-1" />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer" onClick={() => onDeleteSelect(category)}>
                        <LuTrash2 size={17} className="mr-1" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <AccordionContent className="flex flex-col gap-3 px-4 pt-4">
                {items.length === 0 ? (
                  <p>No items for this category.</p>
                ) : (
                  items.map((item: IItem) => {
                    return (
                      <div
                        key={item.uuid}
                        className="w-full flex flex-wrap gap-2 items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="aspect-square h-[46px] bg-accent bg-cover bg-center bg-no-repeat rounded-sm"
                            style={{
                              backgroundImage: `url(${
                                item?.image ??
                                `https://i.ibb.co/KrJ654X/4693713-200.png`
                              })`,
                            }}
                          ></div>
                          <div className="min-w-20 md:min-w-52">
                            <p className="font-semibold leading-none tracking-tight truncate w-full">
                              {item.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {category.name}
                            </p>
                          </div>
                        </div>

                        <div className="max-w-64 md:min-w-24">
                          <p className="font-semibold leading-none tracking-tight">
                            Option
                          </p>
                          <p className="text-sm text-muted-foreground truncate w-full">
                            {item.option === "" ||
                            item.option === null ||
                            !item.option
                              ? `N/A`
                              : item.option}
                          </p>
                        </div>

                        <div className="max-w-64 md:min-w-24">
                          <p className="font-semibold leading-none tracking-tight">
                            Price
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatToCurrency(item.price, "PHP")}
                          </p>
                        </div>

                        <div className="max-w-64 md:min-w-24">
                          <p className="font-semibold leading-none tracking-tight">
                            Cost
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatToCurrency(item.cost, "PHP")}
                          </p>
                        </div>

                        <div className="max-w-64 md:min-w-36">
                          <p className="font-semibold leading-none tracking-tight">
                            Stock
                          </p>
                          <p className="text-sm text-muted-foreground truncate w-full">
                            {item.stock} Items Remaining
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            className="w-20"
                            variant="outline"
                            onClick={() => onEdit(item)}
                          >
                            <LuPenLine size={19} className="mr-1" />
                            Edit
                          </Button>

                          <Button
                            className="w-20"
                            variant="outline"
                            onClick={() => onDelete(item)}
                          >
                            <LuTrash2 size={19} className="mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}

      <Sheet>
        <SheetTrigger asChild>
          <Button ref={editSheetRef} variant="outline" className="hidden">
            Open
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full md:w-3/4 p-5 overflow-y-auto">
          <ScrollArea className="w-full">
            <SheetHeader className="mb-2">
              <SheetTitle>Edit Category</SheetTitle>
              <SheetDescription>
                Adjust your category here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="w-full flex flex-col gap-1">
              <div className="w-full items-center gap-1.5">
                <Label htmlFor="editName">Name</Label>
                <Input
                  type="text"
                  id="editName"
                  placeholder="Enter name for your item"
                  value={selectedCategory?.name}
                  onChange={(e) =>
                    setSelectedCategory((prev: ICategory) => ({
                      ...prev,
                      name: e.target.value,
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

      <Dialog>
        <DialogTrigger asChild>
          <Button
            ref={deleteButtonRef}
            className="rounded-sm shadow-none hidden"
            variant="outline"
          ></Button>
        </DialogTrigger>
        <DialogContent className="max-w-[450px]">
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this category?
            </DialogTitle>
            <DialogDescription>
              This will delete the category and <b><u>all associated items</u></b>, you cannot undo this
              action.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col md:flex-row gap-2 md:gap-0">
            <DialogClose asChild>
              <Button type="button" onClick={() => onDeleteConfirm()}>
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

export default Category;

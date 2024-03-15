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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
                      <DropdownMenuItem className="cursor-pointer">
                        <LuPenLine size={17} className="mr-1" />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer">
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
                      <div key={item.uuid} className="w-full flex flex-wrap gap-2 items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="aspect-square h-[46px] bg-accent bg-cover bg-center bg-no-repeat rounded-sm" style={{backgroundImage: `url(${item?.image ?? `https://i.ibb.co/KrJ654X/4693713-200.png`})`}}></div>
                          <div className="min-w-20 md:min-w-52">
                            <p className="font-semibold leading-none tracking-tight truncate w-full">
                              {item.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {category.name}
                            </p>
                          </div>
                        </div>

                        <div className="max-w-64">
                          <p className="font-semibold leading-none tracking-tight">
                            Option
                          </p>
                          <p className="text-sm text-muted-foreground truncate w-full">
                            {item.option ?? "N/A"}
                          </p>
                        </div>

                        <div className="max-w-64">
                          <p className="font-semibold leading-none tracking-tight">
                            Price
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatToCurrency(item.price, "PHP")}
                          </p>
                        </div>

                        <div className="max-w-64">
                          <p className="font-semibold leading-none tracking-tight">
                            Cost
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatToCurrency(item.cost, "PHP")}
                          </p>
                        </div>

                        <div className="max-w-64">
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
    </div>
  );
};

export default Category;

import { Button } from "@/components/ui/button";
import { formatToCurrency } from "@/helper/Common";
import { ICategory, IItem } from "@/interfaces/Item";
import { LuPenLine, LuTrash2 } from "react-icons/lu";

interface ListProps {
  data: IItem[];
  categoryData: ICategory[];
  onEdit: (item: IItem) => void;
  onDelete: (item: IItem) => void;
}

const MobileList: React.FC<ListProps> = ({
  data,
  categoryData,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex flex-col">
      {data.length === 0 ? (
        <p>No items.</p>
      ) : (
        data.map((item: IItem, index: number) => {
          const category = categoryData.find(category => category.uuid === item.category);

          return (
            <div
              key={index}
              className={`w-full flex flex-wrap gap-2 items-center justify-between ${
                index === 0 ? `border-y` : `border-b`
              } py-4`}
            >
              <div className="flex items-center gap-2">
                <div
                  className="aspect-square h-[46px] bg-accent bg-cover bg-center bg-no-repeat rounded-sm"
                  style={{
                    backgroundImage: `url(${
                      item?.image ?? `https://i.ibb.co/KrJ654X/4693713-200.png`
                    })`,
                  }}
                ></div>
                <div className="max-w-64">
                  <p className="font-semibold leading-none tracking-tight truncate w-full">
                    {item.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {category?.name}
                  </p>
                </div>
              </div>

              <div className="max-w-64 md:min-w-24">
                <p className="font-semibold leading-none tracking-tight">
                  Option
                </p>
                <p className="text-sm text-muted-foreground truncate w-full">
                  {item.option === "" || item.option === null || !item.option
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
    </div>
  );
};

export default MobileList;

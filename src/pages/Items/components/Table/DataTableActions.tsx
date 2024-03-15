import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { LuPenLine, LuTrash2 } from "react-icons/lu";

interface DataTableActionsProps<TData> {
  row: Row<TData>;
  onEdit: (item: TData) => void;
  onDelete: (item: TData) => void;
}

const DataTableActions = <TData,>({
  row,
  onEdit,
  onDelete,
}: DataTableActionsProps<TData>) => {
  return (
    <div className="flex items-center gap-2">
      <Button className="p-0 hover:bg-transparent" variant="ghost" onClick={() => onEdit(row.original)}>
        <LuPenLine />
      </Button>

      <Button className="p-0 hover:bg-transparent" variant="ghost" onClick={() => onDelete(row.original)}>
        <LuTrash2 />
      </Button>
    </div>
  );
};

export default DataTableActions;

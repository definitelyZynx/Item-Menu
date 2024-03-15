import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface TablePaginationProps<TData> {
  table: Table<TData>
}

export function TablePagination<TData>({
  table,
}: TablePaginationProps<TData>) {
  const [pageSize, setPageSize] = useState(10);
  
  useEffect(() => {
    if (window.innerHeight >= 1080) {
      setPageSize(14);
    }
    else if (window.innerHeight < 1080 && window.innerHeight >= 500) {
      setPageSize(10)
    }
    else {
      setPageSize(5);
    }
  }, []);

  useEffect(() => {
    if (table) {
      table.setPageSize(pageSize);
    }
  }, [table, pageSize]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight >= 1000) {
        setPageSize(14);
      }
      else if (window.innerHeight < 1000 && window.innerHeight >= 768) {
        setPageSize(10)
      }
      else {
        setPageSize(5);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex items-center justify-between static mt-3 w-full flex-1  bottom-0 left-0 mb-4">
      <div className="flex-1 text-sm text-muted-foreground">
        
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

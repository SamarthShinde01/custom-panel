import { useState } from "react";
import {
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	ColumnDef,
	flexRender,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Product, sampleProducts } from "@/data/data";

import { toast } from "sonner";
import DeleteAlertDialog from "@/components/delete-alert-dialog";
import DashboardHeader from "./dashboard-header";
export default function ProductsManagePage() {
	const [data, setData] = useState<Product[]>(sampleProducts);
	const [openAlert, setOpenAlert] = useState(false);
	const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

	function handleEdit(product: Product) {
		console.log("Edit product:", product);
	}

	function handleDelete(productId: string) {
		setDeleteProductId(productId);
		setOpenAlert(true);
	}

	function handleConfirmDelete() {
		if (deleteProductId) {
			setData((prev) =>
				prev.filter((product) => product.id !== deleteProductId)
			);
			toast.success("Product deleted successfully!");
		}
	}

	const columns: ColumnDef<Product>[] = [
		{
			header: "Sr No",
			cell: ({ row }) => row.index + 1,
		},
		{
			accessorKey: "image",
			header: "Image",
			cell: ({ row }) => (
				<Avatar className="h-12 w-12">
					<AvatarImage src={row.original.image || ""} alt={row.original.name} />
					<AvatarFallback>
						{row.original.name
							.split(" ")
							.map((n) => n[0])
							.join("")
							.toUpperCase()}
					</AvatarFallback>
				</Avatar>
			),
		},
		{
			accessorKey: "name",
			header: "Product Name",
		},
		{
			accessorKey: "modelNo",
			header: "Model No",
		},
		{
			accessorKey: "category",
			header: "Category",
		},
		{
			accessorKey: "price",
			header: "Price",
			cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
		},
		{
			header: "Actions",
			cell: ({ row }) => (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => handleEdit(row.original)}>
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => handleDelete(row.original.id)}
							className="text-red-600"
						>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			),
		},
	];

	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<>
			<DashboardHeader
				title="Products"
				link="/products-manage"
				pageName="Manage Products"
			/>

			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead key={header.id}>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>

					<div className="mt-4 flex justify-end">
						<Pagination>
							<PaginationContent>
								<PaginationItem className="hover:cursor-pointer">
									<PaginationPrevious
										onClick={() => table.previousPage()}
										disabled={!table.getCanPreviousPage()}
									/>
								</PaginationItem>

								{/* Display current page and total pages */}
								<PaginationItem>
									<span className="px-4 text-sm">
										Page {table.getState().pagination.pageIndex + 1} of{" "}
										{table.getPageCount()}
									</span>
								</PaginationItem>

								<PaginationItem className="hover:cursor-pointer">
									<PaginationNext
										onClick={() => table.nextPage()}
										disabled={!table.getCanNextPage()}
									/>
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</div>
				</div>
			</div>

			<DeleteAlertDialog
				open={openAlert}
				setOpen={setOpenAlert}
				onConfirm={handleConfirmDelete}
				title="Delete this product?"
				description="This will permanently remove the product from the list."
			/>
		</>
	);
}

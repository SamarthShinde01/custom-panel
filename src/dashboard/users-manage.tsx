import DashboardHeader from "@/dashboard/dashboard-header";
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { sampleUsers, User } from "@/data/data";
import { toast } from "sonner";
import DeleteAlertDialog from "@/components/delete-alert-dialog";

export default function UsersManagePage() {
	const [data, setData] = useState<User[]>(sampleUsers);
	const [openAlert, setOpenAlert] = useState(false);
	const [deleteUser, setDeleteUser] = useState<string | null>(null);

	function handleEdit(user: User) {
		console.log("Edit user:", user);
	}

	function handleDelete(productId: string) {
		setDeleteUser(productId);
		setOpenAlert(true);
	}

	function handleConfirmDelete() {
		if (deleteUser) {
			setData((prev) => prev.filter((product) => product.id !== deleteUser));
			toast.success("Product deleted successfully!");
		}
	}

	const columns: ColumnDef<User>[] = [
		{
			header: "Sr No",
			cell: ({ row }) => row.index + 1,
		},
		{
			accessorKey: "profilePicture",
			header: "Profile",
			cell: ({ row }) => (
				<Avatar className="h-10 w-10">
					<AvatarImage
						src={row.original.profilePicture || ""}
						alt={row.original.name}
					/>
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
			header: "Name",
		},
		{
			accessorKey: "email",
			header: "Email",
		},
		{
			accessorKey: "phone",
			header: "Phone",
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
				title="Users"
				link="/users-manage"
				pageName="Manage Users"
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
				title="Delete this User?"
				description="This will permanently remove the user from the list."
			/>
		</>
	);
}

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DashboardHeader from "./dashboard-header";

const addProductSchema = z.object({
	name: z.string().min(1, "Product name is required"),
	email: z.string().min(1, "Product model number is required"),
	category: z.string().min(1, "Category is required"),
	price: z.number().min(1, "Price must be a positive number").optional(),
	productImage: z
		.instanceof(FileList)
		.refine(
			(files) => files.length === 0 || files[0]?.type.startsWith("image/"),
			{
				message: "Only image files are allowed",
			}
		)
		.optional(),
});

type AddProductFormData = z.infer<typeof addProductSchema>;

export default function ProductsAddPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<AddProductFormData>({
		resolver: zodResolver(addProductSchema),
	});

	const onSubmit = (data: AddProductFormData) => {
		const file = data.productImage?.[0];
		console.log("Add product:", {
			...data,
			productImage: file ? file.name : "No image uploaded",
		});
		reset();
	};

	return (
		<>
			<DashboardHeader
				title="Products"
				link="/products-manage"
				pageName="Add Products"
			/>

			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-8 p-6 md:p-8"
					>
						<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
							{/* Product Name */}
							<div className="flex items-start gap-4">
								<Label htmlFor="productName" className="w-40 text-right pt-2">
									Product Name
								</Label>
								<div className="flex-1 space-y-1">
									<Input id="productName" {...register("productName")} />
									{errors.productName && (
										<p className="text-sm text-red-500">
											{errors.productName.message}
										</p>
									)}
								</div>
							</div>

							{/* Product Model No */}
							<div className="flex items-start gap-4">
								<Label
									htmlFor="productModelNo"
									className="w-40 text-right pt-2"
								>
									Product Model No
								</Label>
								<div className="flex-1 space-y-1">
									<Input id="productModelNo" {...register("productModelNo")} />
									{errors.productModelNo && (
										<p className="text-sm text-red-500">
											{errors.productModelNo.message}
										</p>
									)}
								</div>
							</div>

							{/* Category */}
							<div className="flex items-start gap-4">
								<Label htmlFor="category" className="w-40 text-right pt-2">
									Category
								</Label>
								<div className="flex-1 space-y-1">
									<Input id="category" {...register("category")} />
									{errors.category && (
										<p className="text-sm text-red-500">
											{errors.category.message}
										</p>
									)}
								</div>
							</div>

							{/* Price */}
							<div className="flex items-start gap-4">
								<Label htmlFor="price" className="w-40 text-right pt-2">
									Price
								</Label>
								<div className="flex-1 space-y-1">
									<Input
										id="price"
										type="number"
										step="0.01"
										{...register("price")}
									/>
									{errors.price && (
										<p className="text-sm text-red-500">
											{errors.price.message}
										</p>
									)}
								</div>
							</div>

							{/* Product Image */}
							<div className="flex items-start gap-4">
								<Label htmlFor="productImage" className="w-40 text-right pt-2">
									Product Image
								</Label>
								<div className="flex-1 space-y-1">
									<Input
										id="productImage"
										type="file"
										accept="image/*"
										{...register("productImage")}
									/>
									{errors.productImage && (
										<p className="text-sm text-red-500">
											{errors.productImage.message}
										</p>
									)}
								</div>
							</div>
						</div>

						<Button type="submit" className="ml-auto block">
							Add Product
						</Button>
					</form>
				</div>
			</div>
		</>
	);
}

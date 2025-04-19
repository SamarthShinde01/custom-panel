import DashboardHeader from "@/dashboard/dashboard-header";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const addUserSchema = z
	.object({
		name: z.string().min(1, "Name is required"),
		email: z.string().email("Invalid email"),
		phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string(),
		profileImage: z
			.any()
			.optional()
			.refine(
				(file: FileList) =>
					!file || file.length === 0 || file[0] instanceof File,
				"Invalid file"
			),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type AddUserFormData = z.infer<typeof addUserSchema>;

export default function UsersAddPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<AddUserFormData>({
		resolver: zodResolver(addUserSchema),
	});

	const onSubmit = (data: AddUserFormData) => {
		console.log("Add user:", data);
		reset();
	};

	return (
		<>
			<DashboardHeader
				title="Users"
				link="/users-manage"
				pageName="Add Users"
			/>

			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
					{/* add user form  */}
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-8 p-6 md:p-8"
					>
						<div className="grid grid-cols-1  gap-8 md:grid-cols-2">
							<div className="flex items-start gap-4">
								<Label htmlFor="name" className="w-32 text-right pt-2">
									Name
								</Label>
								<div className="flex-1 space-y-1">
									<Input id="name" {...register("name")} />
									{errors.name && (
										<p className="text-sm text-red-500">
											{errors.name.message}
										</p>
									)}
								</div>
							</div>

							<div className="flex items-start gap-4">
								<Label htmlFor="email" className="w-32 text-right pt-2">
									Email
								</Label>
								<div className="flex-1 space-y-1">
									<Input id="email" {...register("email")} />
									{errors.email && (
										<p className="text-sm text-red-500">
											{errors.email.message}
										</p>
									)}
								</div>
							</div>

							<div className="flex items-start gap-4">
								<Label htmlFor="phone" className="w-32 text-right pt-2">
									Phone Number
								</Label>
								<div className="flex-1 space-y-1">
									<Input id="phone" {...register("phone")} />
									{errors.phone && (
										<p className="text-sm text-red-500">
											{errors.phone.message}
										</p>
									)}
								</div>
							</div>

							<div className="flex items-start gap-4">
								<Label htmlFor="profileImage" className="w-32 text-right pt-2">
									Profile Image
								</Label>
								<div className="flex-1 space-y-2">
									<Input
										id="profileImage"
										type="file"
										accept="image/*"
										{...register("profileImage")}
									/>
									{errors.profileImage && (
										<p className="text-sm text-red-500">
											{errors?.profileImage.message}
										</p>
									)}
								</div>
							</div>

							<div className="flex items-start gap-4">
								<Label htmlFor="password" className="w-32 text-right pt-2">
									Password
								</Label>
								<div className="flex-1 space-y-1">
									<Input
										id="password"
										type="password"
										{...register("password")}
									/>
									{errors.password && (
										<p className="text-sm text-red-500">
											{errors.password.message}
										</p>
									)}
								</div>
							</div>

							<div className="flex items-start gap-4">
								<Label
									htmlFor="confirmPassword"
									className="w-32 text-right pt-2"
								>
									Confirm Password
								</Label>
								<div className="flex-1 space-y-1">
									<Input
										id="confirmPassword"
										type="password"
										{...register("confirmPassword")}
									/>
									{errors.confirmPassword && (
										<p className="text-sm text-red-500">
											{errors.confirmPassword.message}
										</p>
									)}
								</div>
							</div>
						</div>

						<Button type="submit" className="ml-auto block">
							Add User
						</Button>
					</form>
				</div>
			</div>
		</>
	);
}

import DashboardHeader from "@/dashboard/dashboard-header";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UpdateProfileSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email"),
	phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
	profileImage: z
		.any()
		.optional()
		.refine(
			(file: FileList) => !file || file.length === 0 || file[0] instanceof File,
			"Invalid file"
		),
});

type UpdateProfileFormData = z.infer<typeof UpdateProfileSchema>;

const ProfilePage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<UpdateProfileFormData>({
		resolver: zodResolver(UpdateProfileSchema),
	});

	const onSubmit = (data: UpdateProfileFormData) => {
		console.log("Add user:", data);
		reset();
	};

	return (
		<>
			<DashboardHeader
				title="Profile"
				link="/profile"
				pageName="Update Profile"
			/>

			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
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
						</div>

						<Button type="submit" className="ml-auto block">
							Update Profile
						</Button>
					</form>
				</div>
			</div>
		</>
	);
};

export default ProfilePage;

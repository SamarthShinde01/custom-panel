import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const changePasswordSchema = z
	.object({
		current_password: z
			.string()
			.min(6, "Current Password must be at least 6 characters"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ChangePasswordFormData>({
		resolver: zodResolver(changePasswordSchema),
	});

	const onSubmit = (data: ChangePasswordFormData) => {
		console.log("Add user:", data);
		reset();
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-6 md:p-8">
				<div className="grid grid-cols-1  gap-8 md:grid-cols-2">
					<div className="flex items-start gap-4">
						<Label htmlFor="current_password" className="w-32 text-right pt-2">
							Current Password
						</Label>
						<div className="flex-1 space-y-1">
							<Input
								id="current_password"
								type="password"
								{...register("current_password")}
							/>
							{errors.current_password && (
								<p className="text-sm text-red-500">
									{errors.current_password.message}
								</p>
							)}
						</div>
					</div>
					<br />

					<div className="flex items-start gap-4">
						<Label htmlFor="password" className="w-32 text-right pt-2">
							Password
						</Label>
						<div className="flex-1 space-y-1">
							<Input id="password" type="password" {...register("password")} />
							{errors.password && (
								<p className="text-sm text-red-500">
									{errors.password.message}
								</p>
							)}
						</div>
					</div>

					<div className="flex items-start gap-4">
						<Label htmlFor="confirmPassword" className="w-32 text-right pt-2">
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
					Change Password
				</Button>
			</form>
		</>
	);
}

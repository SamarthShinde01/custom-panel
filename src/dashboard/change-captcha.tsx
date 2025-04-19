import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const changeCaptchaSchema = z.object({
	siteKey: z.string().min(1, "Site key is required"),
	secretKey: z.string().min(1, "Secret key is required"),
});

type ChangeCaptchaFormData = z.infer<typeof changeCaptchaSchema>;

export default function ChangeCaptcha() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ChangeCaptchaFormData>({
		resolver: zodResolver(changeCaptchaSchema),
	});

	const onSubmit = (data: ChangeCaptchaFormData) => {
		console.log("Add user:", data);
		reset();
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-6 md:p-8">
				<div className="grid grid-cols-1  gap-8 md:grid-cols-2">
					<div className="flex items-start gap-4">
						<Label htmlFor="siteKey" className="w-32 text-right pt-2">
							Site Key
						</Label>
						<div className="flex-1 space-y-1">
							<Input id="siteKey" type="text" {...register("siteKey")} />
							{errors.siteKey && (
								<p className="text-sm text-red-500">{errors.siteKey.message}</p>
							)}
						</div>
					</div>

					<div className="flex items-start gap-4">
						<Label htmlFor="secretKey" className="w-32 text-right pt-2">
							Secret Key
						</Label>
						<div className="flex-1 space-y-1">
							<Input id="secretKey" type="text" {...register("secretKey")} />
							{errors.secretKey && (
								<p className="text-sm text-red-500">
									{errors.secretKey.message}
								</p>
							)}
						</div>
					</div>
				</div>

				<Button type="submit" className="ml-auto block">
					Update Captcha Keys
				</Button>
			</form>
		</>
	);
}

import { useState } from "react";
import DashboardHeader from "./dashboard-header";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChangePasswordPage from "./change-password";
import ChangeCaptcha from "./change-captcha";

export default function SettingsPage() {
	const [activeTab, setActiveTab] = useState("change-password");

	return (
		<>
			<DashboardHeader title="Settings" link="/settings" pageName={activeTab} />

			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
					<Tabs
						defaultValue="change-password"
						value={activeTab}
						onValueChange={setActiveTab}
						className="w-full border-none"
					>
						<TabsList className="flex flex-wrap gap-2">
							<TabsTrigger value="change-password">Change Password</TabsTrigger>
							<TabsTrigger value="captcha">Captcha Keys</TabsTrigger>
							<TabsTrigger value="account-settings">
								Account Settings
							</TabsTrigger>
						</TabsList>

						<TabsContent value="change-password">
							<Card className="w-full border-b-0 border-x-0 rounded-none">
								<ChangePasswordPage />
							</Card>
						</TabsContent>

						<TabsContent value="captcha">
							<Card className="w-full border-b-0 border-x-0 rounded-none">
								<ChangeCaptcha />
							</Card>
						</TabsContent>

						<TabsContent value="account-settings">
							<Card className="w-full border-b-0 border-x-0 rounded-none">
								<ChangeCaptcha />
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</>
	);
}

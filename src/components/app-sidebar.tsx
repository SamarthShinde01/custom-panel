import * as React from "react";
import {
	AudioWaveform,
	Boxes,
	Command,
	Frame,
	GalleryVerticalEnd,
	Map,
	PieChart,
	Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { useLocation } from "react-router";

// This is sample data.
const baseData = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	navMain: [
		{
			title: "Users",
			url: "#",
			icon: Users,
			items: [
				{ title: "Add Users", url: "/users-add" },
				{ title: "Manage Users", url: "/users-manage" },
			],
		},
		{
			title: "Products",
			url: "#",
			icon: Boxes,
			items: [
				{ title: "Add Products", url: "/products-add" },
				{ title: "Manage Products", url: "/products-manage" },
			],
		},
	],
	projects: [
		{ name: "Design Engineering", url: "#", icon: Frame },
		{ name: "Sales & Marketing", url: "#", icon: PieChart },
		{ name: "Travel", url: "#", icon: Map },
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const location = useLocation();

	// Dynamically mark active sections
	const navMainWithActive = baseData.navMain.map((section) => {
		const isActive = section.items?.some(
			(item) => item.url === location.pathname
		);
		return { ...section, isActive };
	});

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={baseData.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={navMainWithActive} />
				<NavProjects projects={baseData.projects} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={baseData.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

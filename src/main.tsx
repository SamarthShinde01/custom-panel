import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./layouts/App.tsx";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router";
import HomePageDashboard from "./dashboard/home-page.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import { SignUpForm } from "./auth/signup-form.tsx";
import { SignInForm } from "./auth/signin-form.tsx";
import UsersAddPage from "./dashboard/users-add.tsx";
import UsersManagePage from "./dashboard/users-manage.tsx";
import ProductsAddPage from "./dashboard/products-add.tsx";
import ProductsManagePage from "./dashboard/products-manage.tsx";
import ProfilePage from "./dashboard/profile-page.tsx";
import ChangePasswordPage from "./dashboard/change-password.tsx";
import SettingsPage from "./dashboard/settings-page.tsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route element={<AuthLayout />}>
				<Route path="/signin" element={<SignInForm />} />
				<Route path="/signup" element={<SignUpForm />} />
			</Route>

			<Route element={<App />}>
				<Route path="/" element={<HomePageDashboard />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/settings" element={<SettingsPage />} />
				<Route path="/change-password" element={<ChangePasswordPage />} />
				<Route path="/users-add" element={<UsersAddPage />} />
				<Route path="/users-manage" element={<UsersManagePage />} />
				<Route path="/products-add" element={<ProductsAddPage />} />
				<Route path="/products-manage" element={<ProductsManagePage />} />
			</Route>
		</>
	)
);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);

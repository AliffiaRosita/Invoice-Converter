import {
	IconAperture,
	IconBox,
	IconCopy,
	IconFile,
	IconFileAnalytics,
	IconLayoutDashboard,
	IconLogin,
	IconMoodHappy,
	IconTypography,
	IconUser,
	IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
	// {
	// 	navlabel: true,
	// 	subheader: "Home",
	// },

	// {
	// 	id: uniqueId(),
	// 	title: "Dashboard",
	// 	icon: IconLayoutDashboard,
	// 	href: "/",
	// },
	// {
	// 	navlabel: true,
	// 	subheader: "Utilities",
	// },
	// {
	// 	id: uniqueId(),
	// 	title: "Typography",
	// 	icon: IconTypography,
	// 	href: "/utilities/typography",
	// },
	// {
	// 	id: uniqueId(),
	// 	title: "Shadow",
	// 	icon: IconCopy,
	// 	href: "/utilities/shadow",
	// },
	// {
	// 	navlabel: true,
	// 	subheader: "Auth",
	// },
	// {
	// 	id: uniqueId(),
	// 	title: "Login",
	// 	icon: IconLogin,
	// 	href: "/authentication/login",
	// },
	// {
	// 	id: uniqueId(),
	// 	title: "Register",
	// 	icon: IconUserPlus,
	// 	href: "/authentication/register",
	// },
	// {
	// 	navlabel: true,
	// 	subheader: "Extra",
	// },
	// {
	// 	id: uniqueId(),
	// 	title: "Icons",
	// 	icon: IconMoodHappy,
	// 	href: "/icons",
	// },
	// {
	// 	id: uniqueId(),
	// 	title: "Sample Page",
	// 	icon: IconAperture,
	// 	href: "/sample-page",
	// },
	// {
	// 	navlabel: true,
	// 	subheader: "Reports",
	// },
	{
		id: uniqueId(),
		title: "File Invoice",
		icon: IconFile,
		href: "/report",
	},
	{
		id: uniqueId(),
		title: "Users",
		icon: IconUser,
		href: "/user",
	},
	{
		id: uniqueId(),
		title: "Items",
		icon: IconBox,
		href: "/items",
	},
	{
		id: uniqueId(),
		title: "Invoices",
		icon: IconFileAnalytics,
		href: "/invoice",
	},
];

export default Menuitems;

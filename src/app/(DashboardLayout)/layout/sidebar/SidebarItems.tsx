import React from "react";
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { useSession } from "next-auth/react";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
	const pathname = usePathname();
	const pathDirect = pathname;
	const { data: session }: any = useSession();
	console.log(session);
	const menus =
		session?.user?.role === "admin"
			? Menuitems
			: Menuitems.filter((item) => !item.title.includes("Users"));
	return (
		<Box sx={{ px: 3 }}>
			<List sx={{ pt: 0 }} className="sidebarNav" component="div">
				{menus.map((item) => {
					// {/********SubHeader**********/}
					// if (item.subheader) {
					//   return <NavGroup item={item} key={item.subheader} />;

					//   // {/********If Sub Menu**********/}
					//   /* eslint no-else-return: "off" */
					// } else {

					return (
						<NavItem
							item={item}
							key={item.id}
							pathDirect={pathDirect}
							onClick={toggleMobileSidebar}
						/>
					);
					// }
				})}
			</List>
		</Box>
	);
};
export default SidebarItems;

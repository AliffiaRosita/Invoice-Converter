"use client";
import React from "react";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useGetUsers } from "@/services/rest/users/mutation";
import moment from "moment-timezone";
import ModalDeleteDialog from "./components/ModalDeleteDialog";
import { Users } from "@/services/rest/users/type";
import { useSession } from "next-auth/react";
import {
	MaterialReactTable,
	useMaterialReactTable,
	type MRT_ColumnDef, //if using TypeScript (optional, but recommended)
} from "material-react-table";

const User = () => {
	const { data: session }: any = useSession();
	const [tableData, setTableData] = React.useState([]);
	const mutationGetUsers = useGetUsers();
	const router = useRouter();
	const [deleteData, setDeleteData] = React.useState({
		id: "",
		dialogOpen: false,
	});

	const columns = React.useMemo<MRT_ColumnDef<Users>[]>(
		() => [
			{
				accessorKey: "name",
				header: "Name",
				size: 390,
			},
			{
				accessorKey: "role",
				header: "Role",
				size: 100,
			},
			{
				accessorKey: "email",
				header: "Email",
				size: 200,
			},
			{
				accessorKey: "lastLoginAt",
				header: "Last Login",
				size: 200,
			},
			{
				accessorKey: "actions",
				header: "Actions",
				size: 150,
				Cell: ({ row }) => renderActionButton(row.original),
			},
		],
		[]
	);

	const table = useMaterialReactTable({
		columns,
		data: tableData,
		enableColumnResizing: true,
		enableGlobalFilter: true,
		enablePagination: true,
		enableSorting: true,
		enableFullScreenToggle: false,
		enableDensityToggle: false,
	});

	async function getData() {
		mutationGetUsers.mutate(undefined, {
			onSuccess: (data: any) => {
				const response = data.data.data;
				const users = response.map((user: Users) => {
					return {
						id: user.id,
						name: user.name,
						role: user.role,
						email: user.email,
						lastLoginAt:
							user.last_login_at !== null
								? moment
										.tz(user.last_login_at, "Asia/Jakarta")
										.format("lll")
								: "",
					};
				});
				setTableData(users);
			},
			onError: (error: any) => {
				console.error(error);
			},
		});
	}

	React.useEffect(() => {
		getData();
	}, []);

	const renderActionButton = (row: any) => {
		return (
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
				}}
			>
				{session?.user?.id !== row?.id && (
					<IconButton
						aria-label="delete"
						color="error"
						onClick={() => {
							setDeleteData({ id: row?.id, dialogOpen: true });
						}}
					>
						<IconTrash />
					</IconButton>
				)}

				<IconButton
					aria-label="edit"
					color="primary"
					onClick={() => {
						router.push(`/user/edit/${row?.id}`);
					}}
				>
					<IconPencil />
				</IconButton>
			</Box>
		);
	};
	return (
		<PageContainer title="User" description="this is User">
			<DashboardCard title="User">
				<>
					<ModalDeleteDialog
						id={deleteData.id}
						open={deleteData.dialogOpen}
						closeDialog={() =>
							setDeleteData({
								id: "",
								dialogOpen: false,
							})
						}
						setTableData={setTableData}
					/>
					<Button
						onClick={() => router.push("/user/create")}
						variant="contained"
						sx={{ mb: 2 }}
					>
						Add User
					</Button>

					<MaterialReactTable table={table} />
				</>
			</DashboardCard>
		</PageContainer>
	);
};

export default User;

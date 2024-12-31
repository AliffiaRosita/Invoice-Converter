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

const User = () => {
	const [tableData, setTableData] = React.useState([]);
	const mutationGetUsers = useGetUsers();
	const router = useRouter();
	const [deleteData, setDeleteData] = React.useState({
		id: "",
		dialogOpen: false,
	});
	const columns = [
		{
			field: "name",
			headerName: "Name",
			width: 390,
		},
		{
			field: "role",
			headerName: "Role",
			width: 100,
		},
		{
			field: "email",
			headerName: "Email",
			width: 200,
		},
		{
			field: "lastLoginAt",
			headerName: "Last Login",
			width: 200,
		},
		{
			field: "actions",
			headerName: "Actions",
			width: 100,
			sortable: false,
			renderCell: (params: any) => renderActionButton(params.row),
		},
	];

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
						lastLoginAt: moment
							.tz(user.last_login_at, "Asia/Jakarta")
							.format("lll"),
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
				<IconButton
					aria-label="delete"
					color="error"
					onClick={() => {
						setDeleteData({ id: row?.id, dialogOpen: true });
					}}
				>
					<IconTrash />
				</IconButton>
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
					<DataGrid rows={tableData} columns={columns} />
				</>
			</DashboardCard>
		</PageContainer>
	);
};

export default User;

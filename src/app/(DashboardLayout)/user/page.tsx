"use client";
import React from "react";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const User = () => {
	const [tableData, setTableData] = React.useState([]);
	const router = useRouter();
	const columns = [
		{
			field: "name",
			headerName: "Name",
			width: 390,
		},
		{
			field: "createdDate",
			headerName: "Created Date",
			width: 200,
		},
		{
			field: "createdTime",
			headerName: "Created Time",
			width: 200,
		},
		{
			field: "actions",
			headerName: "Actions",
			width: 300,
			sortable: false,
			renderCell: (params: any) => renderActionButton(params.row),
		},
	];

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
					onClick={
						() => {}
						// setDeleteData({ id: row?.id, dialogOpen: true })
					}
				>
					<IconTrash />
				</IconButton>
				<IconButton
					aria-label="edit"
					color="primary"
					onClick={
						() => {}
						// setDeleteData({ id: row?.id, dialogOpen: true })
					}
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

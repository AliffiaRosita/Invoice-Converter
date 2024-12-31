"use client";

import React from "react";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDownloadItem, useGetItems } from "@/services/rest/items/mutation";
import { IconFileTypeXls } from "@tabler/icons-react";
import { IconPencil } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Item } from "@/services/rest/items/types";

const Items = () => {
	const mutationGetItem = useGetItems();
	const mutationDownloadItem = useDownloadItem();
	const [tableData, setTableData] = React.useState<any[]>([]);
	const router = useRouter();
	const columns = [
		{ field: "id", headerName: "ID", width: 70 },
		{ field: "description", headerName: "Description", width: 670 },
		{ field: "price", headerName: "Price", width: 100 },
		{ field: "quantity", headerName: "Quantity", width: 100 },
		{
			field: "actions",
			headerName: "Actions",
			width: 130,
			renderCell: (params: any) => renderActionButton(params.row),
		},
	];

	const getItems = async () => {
		mutationGetItem.mutate(undefined, {
			onSuccess: (data) => {
				const response = data.data.data;
				const items = response.map((item: Item) => {
					return {
						id: item.id,
						description: item.description,
						price: item.price,
						quantity: item.quantity || 0,
					};
				});
				setTableData(items);
			},
			onError: (error) => {
				console.error(error);
			},
		});
	};

	const downloadExcel = async () => {
		mutationDownloadItem.mutate(undefined, {
			onSuccess: (data: any) => {
				const url = window.URL.createObjectURL(data.data);
				const a = document.createElement("a");
				a.href = url;
				a.download = "exported_items.xlsx";
				a.click();
			},
			onError: (error) => {
				console.error(error);
			},
		});
	};

	React.useEffect(() => {
		getItems();
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
					aria-label="edit"
					color="primary"
					onClick={() => {
						router.push(`/items/edit/${row?.id}`);
					}}
				>
					<IconPencil />
				</IconButton>
			</Box>
		);
	};

	return (
		<PageContainer title="Items" description="this is Items">
			<DashboardCard title="Items">
				<>
					<Button
						onClick={() => downloadExcel()}
						variant="contained"
						sx={{ mb: 2 }}
					>
						<IconFileTypeXls />
						Export
					</Button>
					<DataGrid rows={tableData} columns={columns} />
				</>
			</DashboardCard>
		</PageContainer>
	);
};

export default Items;

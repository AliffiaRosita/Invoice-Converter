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
import {
	MaterialReactTable,
	useMaterialReactTable,
	type MRT_ColumnDef,
} from "material-react-table";

const Items = () => {
	const mutationGetItem = useGetItems();
	const mutationDownloadItem = useDownloadItem();
	const [tableData, setTableData] = React.useState<any[]>([]);
	const router = useRouter();

	const columns = React.useMemo<MRT_ColumnDef<Item>[]>(
		() => [
			{
				accessorKey: "actions",
				header: "Actions",
				size: 130,
				Cell: ({ row }) => renderActionButton(row.original),
			},
			{
				accessorKey: "invoiceNumber",
				header: "Invoice Number",
				size: 150,
			},
			{
				accessorKey: "senderName",
				header: "Sender Name",
				size: 200,
			},
			{
				accessorKey: "description",
				header: "Description",
				size: 400,
			},
			{
				accessorKey: "quantity",
				header: "Quantity",
				size: 100,
			},
			{
				accessorKey: "tax",
				header: "Tax",
				size: 100,
			},
			{
				accessorKey: "price",
				header: "Price",
				size: 100,
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

	const getItems = async () => {
		mutationGetItem.mutate(undefined, {
			onSuccess: (data) => {
				const response = data.data.data;
				const items = response.map((item: Item) => {
					return {
						id: item.id,
						invoiceNumber: item.invoice_number,
						senderName: item.sender_name,
						tax: item.tax || 0,
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
				a.download = `${Date.now()}_items.xlsx`;
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

					<MaterialReactTable table={table} />
				</>
			</DashboardCard>
		</PageContainer>
	);
};

export default Items;

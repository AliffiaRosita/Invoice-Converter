"use client";

import React from "react";
import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { IconPencil } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Item } from "@/services/rest/items/types";
import { useGetInvoiceById } from "@/services/rest/invoices/mutation";
import {
	MaterialReactTable,
	useMaterialReactTable,
	type MRT_ColumnDef,
} from "material-react-table";
import { Invoice } from "@/services/rest/invoices/type";

const InvoiceItems = ({ params }: any) => {
	const mutationGetItem = useGetInvoiceById();
	const [tableData, setTableData] = React.useState<Invoice[]>([]);
	const router = useRouter();

	const columns = React.useMemo<MRT_ColumnDef<any>[]>(
		() => [
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
				accessorKey: "tax",
				header: "Tax",
				size: 100,
			},
			{
				accessorKey: "description",
				header: "Description",
				size: 400,
			},
			{
				accessorKey: "price",
				header: "Price",
				size: 100,
			},
			{
				accessorKey: "quantity",
				header: "Quantity",
				size: 100,
			},
			{
				accessorKey: "actions",
				header: "Actions",
				size: 130,
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

	const getItems = async () => {
		mutationGetItem.mutate(params.invoiceId, {
			onSuccess: (data) => {
				const response = data.data.data.items;
				console.log(response);

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
					{/* <DataGrid rows={tableData} columns={columns} /> */}
					<MaterialReactTable table={table} />
				</>
			</DashboardCard>
		</PageContainer>
	);
};

export default InvoiceItems;

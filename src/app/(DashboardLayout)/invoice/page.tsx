"use client";
import React from "react";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";

import {
	useDownloadPdfInvoice,
	useDownloadXlsInvoice,
	useGetInvoices,
} from "@/services/rest/invoices/mutation";
import { useRouter } from "next/navigation";
import { Box, IconButton } from "@mui/material";
import {
	IconFileTypePdf,
	IconFileTypeXls,
	IconPencil,
} from "@tabler/icons-react";
import moment from "moment-timezone";
import {
	MaterialReactTable,
	useMaterialReactTable,
	type MRT_ColumnDef,
} from "material-react-table";
import { Invoice } from "@/services/rest/invoices/type";

const InvoicePage = () => {
	const mutationGetInvoices = useGetInvoices();
	const mutationDownloadXls = useDownloadXlsInvoice();
	const mutationDownloadPdf = useDownloadPdfInvoice();
	const [tableData, setTableData] = React.useState<any[]>([]);

	const router = useRouter();
	const columns = React.useMemo<MRT_ColumnDef<Invoice>[]>(
		() => [
			{
				accessorKey: "invoiceNumber",
				header: "Invoice Number",
				size: 200,
			},
			{
				accessorKey: "receiverName",
				header: "Receiver Name",
				size: 300,
			},
			{
				accessorKey: "receiverAddress",
				header: "Receiver Address",
				size: 460,
			},
			{
				accessorKey: "senderName",
				header: "Sender Name",
				size: 300,
			},
			{
				accessorKey: "senderAddress",
				header: "Sender Address",
				size: 460,
			},
			{
				accessorKey: "subtotal",
				header: "Subtotal",
				size: 150,
			},
			{
				accessorKey: "tax",
				header: "Tax",
				size: 150,
			},
			{
				accessorKey: "total",
				header: "Total",
				size: 150,
			},
			{
				accessorKey: "invoiceDate",
				header: "Invoice Date",
			},
			{
				accessorKey: "createdDate",
				header: "Uploaded Date",
				size: 200,
			},
			{
				accessorKey: "actions",
				header: "Actions",
				size: 150,
				enableSorting: false,
				enableHiding: false,
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

	const getInvoices = async () => {
		mutationGetInvoices.mutate(undefined, {
			onSuccess: (data) => {
				const response = data.data.data;

				const invoices = response.map((invoice: any) => {
					return {
						id: invoice.id,
						invoiceNumber: invoice.invoice_number,
						receiverName: invoice.receiver_name,
						receiverAddress: invoice.receiver_address,
						senderName: invoice.sender_name,
						senderAddress: invoice.sender_address,
						subtotal: invoice.subtotal,
						tax: invoice.tax,
						total: invoice.total,
						fileUrl: invoice.file_url,
						invoiceDate:
							invoice.invoice_date !== null
								? moment
										.tz(
											invoice.invoice_date,
											"Asia/Jakarta"
										)
										.format("LL")
								: "",
						createdDate: moment
							.tz(invoice.created_at, "Asia/Jakarta")
							.format("LL"),
					};
				});
				setTableData(invoices);
			},
		});
	};

	const handleDownloadXls = (id: any) => {
		mutationDownloadXls.mutate(id, {
			onSuccess: (data: any) => {
				const url = window.URL.createObjectURL(new Blob([data.data]));
				const link = document.createElement("a");
				link.href = url;
				link.download = `${Date.now()}_invoice.xlsx`;
				link.click();
			},
			onError: (error: any) => {
				console.error(error);
			},
		});
	};

	const handleDownloadPdf = (id: any, fileUrl: string) => {
		const result = fileUrl.substring(
			fileUrl.indexOf("/output") + "/output".length
		);
		const fileName = result.slice(1);

		mutationDownloadPdf.mutate(id, {
			onSuccess: (data: any) => {
				const url = window.URL.createObjectURL(new Blob([data.data]));
				const link = document.createElement("a");
				link.href = url;
				link.download = fileName;
				link.click();
			},
			onError: (error: any) => {
				console.error(error);
			},
		});
	};

	React.useEffect(() => {
		getInvoices();
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
					aria-label="Download"
					color="primary"
					onClick={() => {
						handleDownloadXls(row?.id);
					}}
				>
					<IconFileTypeXls />
				</IconButton>
				<IconButton
					aria-label="Download"
					color="primary"
					onClick={() => {
						handleDownloadPdf(row?.id, row?.fileUrl);
					}}
				>
					<IconFileTypePdf />
				</IconButton>
				<IconButton
					aria-label="edit"
					color="primary"
					onClick={() => {
						router.push(`/invoice/edit/${row?.id}`);
					}}
				>
					<IconPencil />
				</IconButton>
			</Box>
		);
	};

	return (
		<PageContainer title="Invoice" description="this is Invoice">
			<DashboardCard title="Invoice">
				<>
					{/* <DataGrid rows={tableData} columns={columns} /> */}
					<MaterialReactTable table={table} />
				</>
			</DashboardCard>
		</PageContainer>
	);
};

export default InvoicePage;

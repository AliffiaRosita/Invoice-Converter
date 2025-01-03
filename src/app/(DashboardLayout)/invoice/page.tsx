"use client";
import React from "react";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import { DataGrid } from "@mui/x-data-grid";
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
import Link from "next/link";
import moment from "moment-timezone";

const Invoice = () => {
	const mutationGetInvoices = useGetInvoices();
	const mutationDownloadXls = useDownloadXlsInvoice();
	const mutationDownloadPdf = useDownloadPdfInvoice();
	const [tableData, setTableData] = React.useState<any[]>([]);

	const router = useRouter();
	const columns = [
		{
			field: "invoiceNumber",
			headerName: "Invoice Number",
			width: 200,
			renderCell: (params: any) => (
				<Link href={`/items/${params.row.id}`}>{params.value}</Link>
			),
		},
		{ field: "receiverName", headerName: "Receiver Name", width: 300 },
		{
			field: "receiverAddress",
			headerName: "Receiver Address",
			width: 460,
		},
		{ field: "senderName", headerName: "Sender Name", width: 300 },
		{ field: "senderAddress", headerName: "Sender Address", width: 460 },
		{ field: "subtotal", headerName: "Subtotal", width: 150 },
		{ field: "tax", headerName: "Tax", width: 150 },
		{ field: "total", headerName: "Total", width: 150 },
		{ field: "invoiceDate", headerName: "Invoice Date", width: 200 },
		{ field: "createdDate", headerName: "Created Date", width: 200 },
		{
			field: "actions",
			headerName: "Actions",
			width: 200,
			renderCell: (params: any) => renderActionButton(params.row),
		},
	];

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
						invoiceDate: moment
							.tz(invoice.invoice_date, "Asia/Jakarta")
							.format("LL"),
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
					<DataGrid rows={tableData} columns={columns} />
				</>
			</DashboardCard>
		</PageContainer>
	);
};

export default Invoice;

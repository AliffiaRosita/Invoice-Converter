"use client";
import {
	useDownloadInvoice,
	useGetInvoiceById,
} from "@/services/rest/file-invoices/mutation";
import {
	useDownloadPdfInvoice,
	useDownloadXlsInvoice,
} from "@/services/rest/invoices/mutation";
import { Invoice } from "@/services/rest/invoices/type";
import { Box, Button, IconButton } from "@mui/material";
import { IconPencil } from "@tabler/icons-react";
import { IconFileTypePdf, IconFileTypeXls } from "@tabler/icons-react";
import {
	MaterialReactTable,
	MRT_ColumnDef,
	useMaterialReactTable,
} from "material-react-table";
import moment from "moment-timezone";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import BackButton from "../../components/button/BackButton";

const DetailReportPage = ({ params }: any) => {
	const mutationDetailReport = useGetInvoiceById();
	const [tableData, setTableData] = React.useState<any[]>([]);
	const mutationDownloadXls = useDownloadXlsInvoice();
	const mutationDownloadPdf = useDownloadPdfInvoice();
	const mutationDownloadFileInvoice = useDownloadInvoice();
	const router = useRouter();

	const columns = React.useMemo<MRT_ColumnDef<Invoice>[]>(
		() => [
			{
				accessorKey: "actions",
				header: "Actions",
				size: 150,
				enableSorting: false,
				enableHiding: false,
				Cell: ({ row }) => renderActionButton(row.original),
			},
			{
				accessorKey: "invoiceNumber",
				header: "Invoice Number",
				size: 200,
				Cell: ({ row }: any) => (
					<Link href={`/items/${row.original.id}`}>
						{row.original.invoiceNumber}
					</Link>
				),
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
		muiTableBodyCellProps: {
			sx: {
				border: "1px solid rgba(224, 224, 224, 1)", // Add border to body cells
			},
		},
		muiTableContainerProps: {
			sx: {
				border: "1px solid rgba(224, 224, 224, 1)", // Add outer border
			},
		},
	});

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

	const downloadFileInvoiceExcel = async () => {
		mutationDownloadFileInvoice.mutate(params.reportId, {
			onSuccess: (data: any) => {
				const url = window.URL.createObjectURL(data.data);
				const a = document.createElement("a");
				a.href = url;
				a.download = `${Date.now()}_file_invoice.xlsx`;
				a.click();
			},
			onError: (error) => {
				console.error(error);
			},
		});
	};

	React.useEffect(() => {
		getInvoices();
	}, []);

	const getInvoices = async () => {
		mutationDetailReport.mutate(params.reportId, {
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
						invoiceDate: invoice.invoice_date,
						createdDate: moment
							.tz(invoice.created_at, "Asia/Jakarta")
							.format("LL"),
					};
				});
				setTableData(invoices);
			},
		});
	};

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
			<>
				<BackButton router={router} />
				<DashboardCard title="Invoice">
					<>
						<Box
							sx={{
								display: "flex",
								justifyContent: "flex-end",
								mb: 2,
							}}
						>
							<Button
								onClick={() => downloadFileInvoiceExcel()}
								variant="contained"
								sx={{ mb: 2 }}
							>
								<IconFileTypeXls />
								Export
							</Button>
						</Box>
						{/* <DataGrid rows={tableData} columns={columns} /> */}
						<MaterialReactTable table={table} />
					</>
				</DashboardCard>
			</>
		</PageContainer>
	);
};

export default DetailReportPage;

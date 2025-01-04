"use client";
import React from "react";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";

import {
	Alert,
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Collapse,
	Fade,
	IconButton,
	LinearProgress,
	Modal,
	Typography,
} from "@mui/material";
import { SimpleFileUpload } from "formik-mui";
import { Field, Form, Formik } from "formik";
import {
	IconDownload,
	IconFileTypeXls,
	IconLoader,
	IconTrash,
	IconX,
} from "@tabler/icons-react";
import moment from "moment-timezone";

import ModalDeleteDialog from "./components/ModalDeleteDialog";
import { DataGrid } from "@mui/x-data-grid";
import {
	useDownloadInvoice,
	useGenerateInvoice,
	useGetInvoices,
	useUploadInvoice,
} from "@/services/rest/file-invoices/mutation";

import { Invoices } from "@/services/rest/file-invoices/types";
import { useSession } from "next-auth/react";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 500,
	bgcolor: "background.paper",
	borderRadius: "8px",
	boxShadow: 24,
	p: 4,
};
interface Values {
	email: string;
	password: string;
}
const Report = () => {
	const { data: session }: any = useSession();
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [tableData, setTableData] = React.useState([]);
	const mutationGetInvoices = useGetInvoices();
	const mutationGenerateInvoice = useGenerateInvoice();
	const mutationDownloadInvoice = useDownloadInvoice();
	const mutationUploadInvoice = useUploadInvoice();
	// const columns = [
	// 	{ title: "ID", data: "id", visible: false }, // Kolom ID disembunyikan
	// 	{ title: "Name", data: "name" },
	// 	{ title: "Created Date", data: "createdDate" },
	// 	{ title: "Created Time", data: "createdTime" },
	// ];
	// const [isGenerating, setIsGenerating] = React.useState<boolean | null>(
	// 	false
	// );
	const formData = new FormData();
	const [deleteData, setDeleteData] = React.useState({
		id: "",
		dialogOpen: false,
	});
	const [openDialog, setOpenDialog] = React.useState(false);
	// const [openDialogDelete, setOpenDialogDelete] = React.useState(false);

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};
	const handleGenerate = (id: string) => {
		setTableData((prevTableData: any) => {
			const updatedTableData = prevTableData.map((item: any) => {
				if (item.id === id) {
					return { ...item, isGenerating: true };
				}
				return item;
			});
			return updatedTableData;
		});
		generateFile(id);
	};

	const generateFile = async (id: any) => {
		mutationGenerateInvoice.mutate(id, {
			onSuccess: (data: any) => {
				setTableData((prevTableData: any) => {
					return prevTableData.map((item: any) => {
						if (item.id === id) {
							return {
								...item,
								isGenerating: false,
								isGenerated: true,
							};
						}
						return item;
					});
				});
			},
			onError: (error: any) => {
				console.error(error);
			},
		});
	};
	async function getData() {
		mutationGetInvoices.mutate(undefined, {
			onSuccess: (data: any) => {
				const response = data.data;

				const invoices = response.data.map((item: Invoices) => {
					return {
						id: item.id,
						name: item.name,
						createdDate: moment
							.tz(item.created_at, "Asia/Jakarta")
							.format("LL"),
						createdTime: moment
							.tz(item.created_at, "Asia/Jakarta")
							.format("LT"),
						isGenerated: !!item.generated_url,
						isGenerating: false,
					};
				});
				setTableData(invoices);
			},
			onError: (error: any) => {
				console.error(error);
			},
		});
	}

	const handleDownload = (id: any) => {
		mutationDownloadInvoice.mutate(id, {
			onSuccess: (data: any) => {
				const url = window.URL.createObjectURL(data.data);
				const a = document.createElement("a");
				a.href = url;
				a.download = `${Date.now()}_file_invoice.pdf`;
				a.click();
			},
			onError: (error: any) => {
				console.error(error);
			},
		});
	};

	React.useEffect(() => {
		getData();
	}, []);

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
				{row?.isGenerated ? (
					<IconButton
						aria-label="download"
						color="primary"
						onClick={() => handleDownload(row?.id)}
					>
						<IconDownload />
					</IconButton>
				) : row?.isGenerating ? (
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<CircularProgress size={20} />
					</Box>
				) : (
					<IconButton
						aria-label="Generate"
						color="primary"
						onClick={() => {
							handleGenerate(row?.id);
						}}
					>
						<IconFileTypeXls />
					</IconButton>
				)}

				<IconButton
					aria-label="delete"
					color="error"
					onClick={() =>
						setDeleteData({ id: row?.id, dialogOpen: true })
					}
				>
					<IconTrash />
				</IconButton>
			</Box>
		);
	};

	return (
		<PageContainer title="Report" description="this is Report">
			<DashboardCard title="Report">
				<div>
					<div>
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
						<Collapse in={openDialog}>
							<Alert
								action={
									<IconButton
										aria-label="close"
										color="inherit"
										size="small"
										onClick={() => {
											handleCloseDialog();
										}}
									>
										<IconX fontSize="inherit" />
									</IconButton>
								}
								sx={{ mb: 2 }}
							>
								Success generating report !
							</Alert>
						</Collapse>
						{session?.user?.role === "admin" && (
							<Button
								onClick={handleOpen}
								variant="contained"
								sx={{ mb: 2 }}
							>
								Upload File
							</Button>
						)}

						<Modal
							aria-labelledby="transition-modal-title"
							aria-describedby="transition-modal-description"
							open={open}
							onClose={handleClose}
							closeAfterTransition
							slots={{ backdrop: Backdrop }}
							slotProps={{
								backdrop: {
									timeout: 500,
								},
							}}
						>
							<Fade in={open}>
								<Box sx={style}>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
										}}
									>
										<Typography
											id="transition-modal-title"
											variant="h6"
											component="h2"
										>
											Upload Report
										</Typography>
										<Button onClick={handleClose}>
											<IconX />
										</Button>
									</Box>
									<Box sx={{ mt: 3 }}>
										<Formik
											initialValues={{
												file: null,
											}}
											onSubmit={(
												values,
												{ setSubmitting }
											) => {
												setSubmitting(true);
												if (values.file) {
													formData.append(
														"file",
														values.file
													);
												}

												mutationUploadInvoice.mutate(
													formData,
													{
														onSuccess: (
															data: any
														) => {
															handleClose();
															setOpenDialog(true);
															getData();
														},
														onError: (
															error: any
														) => {
															console.error(
																error
															);
														},
													}
												);
											}}
										>
											{({ submitForm, isSubmitting }) => (
												<Form>
													<Field
														component={
															SimpleFileUpload
														}
														accept=".pdf"
														name="file"
														label=""
													/>
													{isSubmitting && (
														<LinearProgress />
													)}
													<br />
													<Button
														sx={{ mt: 2 }}
														variant="contained"
														color="primary"
														disabled={isSubmitting}
														onClick={submitForm}
													>
														Submit
													</Button>
												</Form>
											)}
										</Formik>
									</Box>
								</Box>
							</Fade>
						</Modal>
					</div>
					<DataGrid rows={tableData} columns={columns} />
				</div>
			</DashboardCard>
		</PageContainer>
	);
};

export default Report;

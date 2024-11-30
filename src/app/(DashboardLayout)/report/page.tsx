"use client";
import React from "react";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import {
	Backdrop,
	Box,
	Button,
	Fade,
	IconButton,
	LinearProgress,
	Modal,
	Typography,
} from "@mui/material";
import { SimpleFileUpload, TextField } from "formik-mui";
import { Field, Form, Formik } from "formik";
import { IconCross, IconDownload, IconTrash, IconX } from "@tabler/icons-react";

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
	DataTable.use(DT);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [tableData, setTableData] = React.useState([
		["Tiger Nixon", "System Architect"],
		["Garrett Winters", "Accountant"],
	]);
	return (
		<PageContainer title="Report" description="this is Report">
			<DashboardCard title="Report">
				<div>
					<div>
						<Button
							onClick={handleOpen}
							variant="contained"
							sx={{ mb: 2 }}
						>
							Upload File
						</Button>
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
												email: "",
												password: "",
											}}
											validate={(values) => {
												const errors: Partial<Values> =
													{};
												if (!values.email) {
													errors.email = "Required";
												} else if (
													!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
														values.email
													)
												) {
													errors.email =
														"Invalid email address";
												}
												return errors;
											}}
											onSubmit={(
												values,
												{ setSubmitting }
											) => {
												setTimeout(() => {
													setSubmitting(false);
													alert(
														JSON.stringify(
															values,
															null,
															2
														)
													);
												}, 500);
											}}
										>
											{({ submitForm, isSubmitting }) => (
												<Form>
													<Field
														component={
															SimpleFileUpload
														}
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
					<DataTable
						data={tableData}
						slots={{
							2: (data, row) => (
								<Box
									sx={{
										display: "flex",
										flexDirection: "row",
									}}
								>
									<IconButton
										aria-label="download"
										color="primary"
										onClick={() => {}}
									>
										<IconDownload />
									</IconButton>
									<IconButton
										aria-label="delete"
										color="error"
										onClick={() => {}}
									>
										<IconTrash />
									</IconButton>
								</Box>
							),
						}}
						className="display"
					>
						<thead>
							<tr>
								<th>Name</th>
								<th>Location</th>
								<th>Action</th>
							</tr>
						</thead>
					</DataTable>
				</div>
			</DashboardCard>
		</PageContainer>
	);
};

export default Report;

"use client";
import { useUpdateInvoice } from "@/services/rest/invoices/mutation";
import { Invoice } from "@/services/rest/invoices/type";
import { Box, Button, LinearProgress } from "@mui/material";
import { Field, Formik } from "formik";
import { TextField } from "formik-mui";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import * as yup from "yup";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
type Props = {
	id: string;
	mode: string;
	data?: Invoice;
};
const InvoiceForm = ({ id, mode, data }: Props) => {
	const mutationUpdateInvoice = useUpdateInvoice();
	const route = useRouter();

	const formValidationSchema: yup.ObjectSchema<{
		invoice_number?: string;
		receiver_name?: string;
		receiver_address?: string;
		sender_name?: string;
		sender_address?: string;
		subtotal: number;
		tax: number;
		total: number;
		invoiceDate?: string | null;
	}> = yup.object().shape({
		invoice_number: yup.string(),
		receiver_name: yup.string(),
		receiver_address: yup.string(),
		sender_name: yup.string(),
		sender_address: yup.string(),
		subtotal: yup.number().min(0).required(),
		tax: yup.number().min(0).required(),
		total: yup.number().min(0).required(),
		invoiceDate: yup.string().nullable(),
	});

	const initialValues = useMemo(() => {
		return {
			invoice_number: data?.invoice_number || "",
			receiver_name: data?.receiver_name || "",
			receiver_address: data?.receiver_address || "",
			sender_name: data?.sender_name || "",
			sender_address: data?.sender_address || "",
			subtotal: data?.subtotal || 0,
			tax: data?.tax || 0,
			total: data?.total || 0,
			invoiceDate: data?.invoice_date || null,
		};
	}, [data]);

	return (
		<Formik
			initialValues={initialValues}
			enableReinitialize
			validationSchema={formValidationSchema}
			onSubmit={(values, { setSubmitting }) => {
				const data = {
					invoice_number: values.invoice_number,
					receiver_name: values.receiver_name,
					receiver_address: values.receiver_address,
					sender_name: values.sender_name,
					sender_address: values.sender_address,
					subtotal: values.subtotal,
					tax: values.tax,
					total: values.total,
					invoice_date: values.invoiceDate
						? dayjs(values.invoiceDate).format("YYYY-MM-DD")
						: null,
				};

				if (mode === "edit") {
					mutationUpdateInvoice.mutate(
						{ data, id },
						{
							onSuccess: () => {
								setSubmitting(false);
								route.push("/invoice");
							},
							onError: (error: any) => {
								console.error(error);
							},
						}
					);
				}
			}}
		>
			{({ submitForm, isSubmitting, values, setFieldValue }) => (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						width: "40%",
					}}
				>
					<Field
						component={TextField}
						name="invoice_number"
						label="Invoice Number"
						sx={{ marginBottom: "20px" }}
					/>
					<Field
						component={TextField}
						name="receiver_name"
						label="Receiver Name"
						sx={{ marginBottom: "20px" }}
					/>
					<Field
						component={TextField}
						name="receiver_address"
						label="Receiver Address"
						sx={{ marginBottom: "20px" }}
					/>
					<Field
						component={TextField}
						name="sender_name"
						label="Sender Name"
						sx={{ marginBottom: "20px" }}
					/>
					<Field
						component={TextField}
						name="sender_address"
						label="Sender Address"
						sx={{ marginBottom: "20px" }}
					/>
					<Field
						component={TextField}
						name="subtotal"
						label="Subtotal"
						type="number"
						sx={{ marginBottom: "20px" }}
					/>
					<Field
						component={TextField}
						name="tax"
						label="Tax"
						type="number"
						sx={{ marginBottom: "20px" }}
					/>
					<Field
						component={TextField}
						type="number"
						name="total"
						label="Total"
						sx={{ marginBottom: "20px" }}
					/>
					{/* <Field
							component={DatePicker}
							label="Invoice Date"
							name="invoiceDate"
							values={values.invoiceDate}
						/> */}

					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							label="Invoice Date"
							value={
								values.invoiceDate
									? dayjs(values.invoiceDate)
									: null
							}
							onChange={(newValue) => {
								setFieldValue("invoiceDate", newValue);
							}}
							sx={{ borderColor: "black" }}
							defaultValue={null}
						/>
					</LocalizationProvider>

					{isSubmitting && <LinearProgress />}
					<br />
					<Button
						variant="contained"
						color="primary"
						disabled={isSubmitting}
						onClick={submitForm}
					>
						Submit
					</Button>
				</Box>
			)}
		</Formik>
	);
};

export default InvoiceForm;

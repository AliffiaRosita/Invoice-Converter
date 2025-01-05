"use client";
import { useUpdateInvoice } from "@/services/rest/invoices/mutation";
import { Invoice } from "@/services/rest/invoices/type";
import { Box, Button, LinearProgress } from "@mui/material";
import { Field, Formik } from "formik";
import { TextField } from "formik-mui";
import { DatePicker } from "formik-mui-x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import * as yup from "yup";
import moment from "moment";
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
	}> = yup.object().shape({
		invoice_number: yup.string(),
		receiver_name: yup.string(),
		receiver_address: yup.string(),
		sender_name: yup.string(),
		sender_address: yup.string(),
		subtotal: yup.number().min(0).required(),
		tax: yup.number().min(0).required(),
		total: yup.number().min(0).required(),
		invoiceDate: yup.date().required(),
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
	moment.updateLocale("en", {
		longDateFormat: {
			L: "DD/MM/YYYY",
			LL: "DD/MM/YYYY",
			LLL: "DD/MM/YYYY HH:mm",
			LLLL: "DD/MM/YYYY HH:mm",
			LTS: "HH:mm:ss",
			LT: "HH:mm",
		},
	});
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
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
						invoiceDate: moment(values.invoiceDate)
							.format("LL")
							.toString(),
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
				{({ submitForm, isSubmitting, values }) => (
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
						<Field
							component={DatePicker}
							label="Invoice Date"
							name="invoiceDate"
							inputFormat="DD/MM/YYYY"
						/>
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
		</LocalizationProvider>
	);
};

export default InvoiceForm;

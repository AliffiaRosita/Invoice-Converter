"use client";
import { useUpdateItem } from "@/services/rest/items/mutation";
import { Item } from "@/services/rest/items/types";
import { Box, Button, LinearProgress } from "@mui/material";
import { Field, Formik } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/navigation";
import { use, useMemo } from "react";
import * as yup from "yup";
type Props = {
	id: string;
	mode: string;
	data?: Item;
};
const ItemForm = ({ id, mode, data }: Props) => {
	const mutationUpdateInvoice = useUpdateItem();
	const route = useRouter();

	const formValidationSchema: yup.ObjectSchema<{
		description: string;
		quantity: number;
		price: number;
		tax?: number;
	}> = yup.object().shape({
		description: yup.string().required(),
		quantity: yup.number().min(1).required(),
		price: yup.number().min(0).required(),
		tax: yup.number().min(0),
	});

	const initialValues = useMemo(() => {
		return {
			description: data?.description || "",
			quantity: data?.quantity || 0,
			price: data?.price || 0,
			tax: data?.tax || 0,
		};
	}, [data]);
	return (
		<Formik
			initialValues={initialValues}
			enableReinitialize
			validationSchema={formValidationSchema}
			onSubmit={(values, { setSubmitting }) => {
				const data = {
					description: values.description,
					quantity: values.quantity,
					price: values.price,
					tax: values.tax,
				};

				if (mode === "edit") {
					mutationUpdateInvoice.mutate(
						{ data, id },
						{
							onSuccess: () => {
								setSubmitting(false);
								route.push("/items");
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
						name="description"
						label="Description"
						sx={{ mb: 2 }}
					/>
					<Field
						component={TextField}
						name="quantity"
						label="Quantity"
						type="number"
						sx={{ mb: 2 }}
					/>
					<Field
						component={TextField}
						name="price"
						label="Price"
						type="number"
						sx={{ mb: 2 }}
					/>
					<Field
						component={TextField}
						name="tax"
						label="Tax"
						type="number"
						sx={{ mb: 2 }}
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
	);
};

export default ItemForm;

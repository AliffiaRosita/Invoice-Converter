import { useCreateUser, useUpdateUser } from "@/services/rest/users/mutation";
import { Users } from "@/services/rest/users/type";
import { Box, Button, LinearProgress, MenuItem } from "@mui/material";
import { Field, Formik } from "formik";
import { Select, TextField } from "formik-mui";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import * as yup from "yup";

type Props = {
	id?: string;
	mode: string;
	data?: Users;
};
const UserForm = ({ id, mode, data }: Props) => {
	const mutationCreateUser = useCreateUser();
	const mutationUpdateUser = useUpdateUser();
	const route = useRouter();
	const formValidationSchema: yup.ObjectSchema<{
		email: string;
		password: string | undefined;
		name: string;
		role: string;
	}> = yup.object().shape({
		email: yup.string().email().required(),
		password:
			mode === "create" ? yup.string().min(8).required() : yup.string(),
		name: yup.string().required(),
		role: yup.string().required(),
	});

	const initialValues = useMemo(() => {
		return {
			email: data?.email || "",
			password: "",
			name: data?.name || "",
			role: data?.role || "admin",
		};
	}, [data]);
	return (
		<Formik
			initialValues={initialValues}
			enableReinitialize
			validationSchema={formValidationSchema}
			onSubmit={(values, { setSubmitting }) => {
				const data = {
					email: values.email,
					password: values.password,
					name: values.name,
					role: values.role,
				};
				if (mode === "edit") {
					mutationUpdateUser.mutate(
						{ id, data },
						{
							onSuccess: () => {
								setSubmitting(false);
								route.push("/user");
							},
							onError: (error: any) => {
								console.error(error);
							},
						}
					);
				} else {
					mutationCreateUser.mutate(data, {
						onSuccess: () => {
							setSubmitting(false);
							route.push("/user");
						},
						onError: (error: any) => {
							console.error(error);
						},
					});
				}
				// setTimeout(() => {
				// 	setSubmitting(false);
				// 	alert(JSON.stringify(values, null, 2));
				// }, 500);
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
						name="name"
						type="text"
						label="Name"
						sx={{ marginBottom: "20px" }}
					/>
					<Field
						component={TextField}
						name="email"
						type="email"
						label="Email"
						sx={{ marginBottom: "20px" }}
					/>
					<Field
						component={TextField}
						type="password"
						label="Password"
						name="password"
						sx={{ marginBottom: "20px" }}
					/>
					<Field
						component={Select}
						id="role"
						name="role"
						labelId="role-simple"
						label="role"
						value={values?.role || "admin"}
					>
						<MenuItem value={"admin"}>Admin</MenuItem>
						<MenuItem value={"employee"}>Employee</MenuItem>
					</Field>
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

export default UserForm;

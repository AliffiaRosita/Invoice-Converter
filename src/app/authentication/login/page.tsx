"use client";
import Link from "next/link";
import {
	Grid,
	Box,
	Card,
	Stack,
	Typography,
	Collapse,
	Alert,
	IconButton,
} from "@mui/material";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthLogin from "../auth/AuthLogin";
import { IconX } from "@tabler/icons-react";
import React from "react";

const Login2 = () => {
	const [open, setOpen] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState("");
	return (
		<PageContainer title="Login" description="this is Login page">
			<Box
				sx={{
					position: "relative",
					"&:before": {
						content: '""',
						background:
							"radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
						backgroundSize: "400% 400%",
						animation: "gradient 15s ease infinite",
						position: "absolute",
						height: "100%",
						width: "100%",
						opacity: "0.3",
					},
				}}
			>
				<Grid
					container
					spacing={0}
					display={"flex"}
					justifyContent="center"
				>
					<Box>
						<Collapse in={open}>
							<Alert
								action={
									<IconButton
										aria-label="close"
										color="inherit"
										size="small"
										onClick={() => {
											setOpen(false);
										}}
									>
										<IconX />
									</IconButton>
								}
								sx={{ mt: 2, backgroundColor: "error.light" }}
								severity="error"
							>
								{errorMessage}
							</Alert>
						</Collapse>
					</Box>
				</Grid>

				<Grid
					container
					spacing={0}
					justifyContent="center"
					sx={{ height: "100vh" }}
				>
					<Grid
						item
						xs={12}
						sm={12}
						lg={4}
						xl={3}
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
						<Card
							elevation={9}
							sx={{
								p: 4,
								zIndex: 1,
								width: "100%",
								maxWidth: "500px",
							}}
						>
							<Box
								display="flex"
								alignItems="center"
								justifyContent="center"
							>
								<Logo />
							</Box>
							<AuthLogin
								setErrorModal={setOpen}
								setErrorMessage={setErrorMessage}
							/>
						</Card>
					</Grid>
				</Grid>
			</Box>
		</PageContainer>
	);
};
export default Login2;

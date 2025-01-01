import React from "react";
import {
	Box,
	Typography,
	Button,
	Stack,
	Collapse,
	Alert,
	IconButton,
	CircularProgress,
} from "@mui/material";
import Link from "next/link";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { redirect } from "next/dist/server/api-utils";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IconX } from "@tabler/icons-react";

interface loginType {
	title?: string;
	subtitle?: JSX.Element | JSX.Element[];
	subtext?: JSX.Element | JSX.Element[];
	setErrorModal?: any;
	setErrorMessage?: any;
}

const AuthLogin = ({
	title,
	subtitle,
	subtext,
	setErrorModal,
	setErrorMessage,
}: loginType) => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [errorEmail, setErrorEmail] = React.useState(false);
	const [errorPassword, setErrorPassword] = React.useState(false);
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const { push } = useRouter();
	// const callbackUrl = searchParams?.callbackUrl || "/";
	const handleSignIn = async (event: any) => {
		setIsSubmitting(true);
		event.preventDefault();

		try {
			if (!email) {
				setErrorEmail(true);
				setIsSubmitting(false);
				return;
			} else if (!password) {
				setErrorPassword(true);
				setIsSubmitting(false);
				return;
			}
			const res = await signIn("credentials", {
				redirect: false,
				email: email,
				password: password,
				// callbackUrl: callbackUrl,
			});
			if (res?.error) {
				setIsSubmitting(false);
				setErrorModal(true);
				setErrorMessage(res.error);
			} else {
				setIsSubmitting(false);
				window.location.href = "/";
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<>
			{title ? (
				<Typography fontWeight="700" variant="h2" mb={1}>
					{title}
				</Typography>
			) : null}

			{subtext}

			<Stack>
				<Box>
					<Typography
						variant="subtitle1"
						fontWeight={600}
						component="label"
						htmlFor="email"
						mb="5px"
					>
						Email
					</Typography>
					<CustomTextField
						variant="outlined"
						type="email"
						fullWidth
						value={email}
						onChange={(e: any) => setEmail(e.target.value)}
						error={errorEmail}
					/>
					<Typography variant="body2" color="error">
						{errorEmail && "Email is required"}
					</Typography>
				</Box>
				<Box mt="25px">
					<Typography
						variant="subtitle1"
						fontWeight={600}
						component="label"
						htmlFor="password"
						mb="5px"
					>
						Password
					</Typography>
					<CustomTextField
						value={password}
						onChange={(e: any) => setPassword(e.target.value)}
						type="password"
						variant="outlined"
						fullWidth
						error={errorPassword}
					/>
					<Typography variant="body2" color="error">
						{errorPassword && "Password is required"}
					</Typography>
				</Box>
				{/* <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        my={2}
      >
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remeber this Device"
          />
        </FormGroup>
        <Typography
          component={Link}
          href="/"
          fontWeight="500"
          sx={{
            textDecoration: "none",
            color: "primary.main",
          }}
        >
          Forgot Password ?
        </Typography>
      </Stack> */}
			</Stack>
			<Box>
				{isSubmitting ? (
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							mt: 3,
						}}
					>
						<CircularProgress size={20} />
					</Box>
				) : (
					<Button
						color="primary"
						variant="contained"
						size="large"
						fullWidth
						component={Link}
						href="#"
						sx={{ mt: 3 }}
						onClick={(e) => handleSignIn(e)}
					>
						Sign In
					</Button>
				)}
			</Box>
			{subtitle}
		</>
	);
};
export default AuthLogin;

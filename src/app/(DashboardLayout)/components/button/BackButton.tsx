import { Button } from "@mui/material";
import { IconChevronLeft } from "@tabler/icons-react";
import React from "react";

const BackButton = ({ router }: any) => {
	return (
		<Button
			variant="contained"
			color="error"
			onClick={() => router.back()}
			sx={{
				marginY: "2rem",
			}}
		>
			<IconChevronLeft /> Back
		</Button>
	);
};

export default BackButton;

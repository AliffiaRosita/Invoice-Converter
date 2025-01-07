import { Card, CardContent, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

interface TotalCard {
	label: string;
	value: string;
	color?: any;
}
const TotalCard = ({ label, value, color = red[500] }: TotalCard) => {
	return (
		<Card sx={{ backgroundColor: color }}>
			<CardContent>
				<Typography
					variant="h2"
					sx={{
						mb: 2,
						textAlign: "center",
						color: "#fff",
					}}
				>
					{value}
				</Typography>
				<Typography
					variant="h5"
					sx={{
						mb: 2,
						textAlign: "center",
						color: "#fff",
					}}
				>
					{label}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default TotalCard;

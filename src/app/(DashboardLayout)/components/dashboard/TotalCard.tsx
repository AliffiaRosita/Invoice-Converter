import { Card, CardContent, Grid, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { Icon123 } from "@tabler/icons-react";
import React from "react";

interface TotalCard {
	label: string;
	value: string;
	icon: any;
}
const TotalCard = ({ label, value, icon }: TotalCard) => {
	return (
		<Card>
			<CardContent>
				<Grid container spacing={2}>
					<Grid item xs={6} lg={6}>
						<Typography
							sx={{
								mb: 2,
							}}
						>
							{label}
						</Typography>
						<Typography
							variant="h2"
							sx={{
								mb: 2,
							}}
						>
							{value}
						</Typography>
					</Grid>
					<Grid
						justifyContent={"center"}
						alignContent={"center"}
						item
						xs={6}
						lg={4}
					>
						{icon}
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default TotalCard;

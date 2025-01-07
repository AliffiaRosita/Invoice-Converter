"use client";
import { Grid, Box, Typography, Card, CardContent } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { useSession } from "next-auth/react";
import { blue, blueGrey, red, teal } from "@mui/material/colors";
import TotalCard from "./components/dashboard/TotalCard";

const Dashboard = () => {
	const { data } = useSession();
	return (
		<PageContainer title="Dashboard" description="this is Dashboard">
			<Box>
				<Typography variant="h5" sx={{ mb: 5 }}>
					Welcome, {data?.user?.name}
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12} lg={3}>
						<TotalCard label="Total Item" value="10" />
					</Grid>
					<Grid item xs={12} lg={3}>
						<TotalCard
							label="Total User"
							value="10"
							color={blue[500]}
						/>
					</Grid>
					<Grid item xs={12} lg={3}>
						<TotalCard
							label="Total File"
							value="10"
							color={teal[400]}
						/>
					</Grid>
					<Grid item xs={12} lg={3}>
						<TotalCard
							label="Total Invoice"
							value="200"
							color={blueGrey[400]}
						/>
					</Grid>
				</Grid>
			</Box>
		</PageContainer>
	);
};

export default Dashboard;

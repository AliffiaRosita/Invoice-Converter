"use client";
import { Grid, Box, Typography, Card, CardContent } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { useSession } from "next-auth/react";
import { blue, blueGrey, green, indigo, red, teal } from "@mui/material/colors";
import TotalCard from "./components/dashboard/TotalCard";
import {
	IconBox,
	IconFile,
	IconFileAnalytics,
	IconUser,
} from "@tabler/icons-react";
import { useGetDashboardReport } from "@/services/rest/dashboard/mutation";
import React from "react";
import { DashboardReport } from "@/services/rest/dashboard/types";

const Dashboard = () => {
	const { data } = useSession();
	const mutation = useGetDashboardReport();
	const [dataDashboard, setDataDashboard] = React.useState<DashboardReport>();

	const getData = () => {
		mutation.mutate(undefined, {
			onSuccess: (data: any) => {
				const res = data.data.data;
				setDataDashboard(res);
			},
			onError: (error: any) => {
				console.error(error);
			},
		});
	};

	React.useEffect(() => {
		getData();
	}, []);
	return (
		<PageContainer title="Dashboard" description="this is Dashboard">
			<Box>
				<Typography variant="h5" sx={{ mb: 5 }}>
					Welcome, {data?.user?.name}
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12} lg={3}>
						<TotalCard
							label="Total Item"
							value={`${dataDashboard?.item_count || 0}`}
							icon={<IconBox size={85} color={red[100]} />}
						/>
					</Grid>
					<Grid item xs={12} lg={3}>
						<TotalCard
							label="Total User"
							value={`${dataDashboard?.user_count || 0}`}
							icon={<IconUser size={85} color={indigo[100]} />}
						/>
					</Grid>
					<Grid item xs={12} lg={3}>
						<TotalCard
							label="Total File"
							value={`${dataDashboard?.file_invoice_count || 0}`}
							icon={<IconFile size={85} color={teal[100]} />}
						/>
					</Grid>
					<Grid item xs={12} lg={3}>
						<TotalCard
							label="Total Invoice"
							value={`${dataDashboard?.invoice_count || 0}`}
							icon={
								<IconFileAnalytics
									size={85}
									color={green[100]}
								/>
							}
						/>
					</Grid>
				</Grid>
			</Box>
		</PageContainer>
	);
};

export default Dashboard;

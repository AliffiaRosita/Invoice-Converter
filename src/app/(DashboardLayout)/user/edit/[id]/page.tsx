"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { Typography } from "@mui/material";
import React from "react";

const EditUser = () => {
	return (
		<PageContainer title="Edit User" description="this is Edit User page">
			<DashboardCard title="Edit User">
				<Typography>This is a Edit User page</Typography>
			</DashboardCard>
		</PageContainer>
	);
};

export default EditUser;

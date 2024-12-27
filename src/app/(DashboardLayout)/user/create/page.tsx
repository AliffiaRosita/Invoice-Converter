"use client";
import React from "react";
import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import { Typography } from "@mui/material";

const UserCreate = () => {
	return (
		<PageContainer
			title="User Create"
			description="this is User Create page"
		>
			<DashboardCard title="User Create">
				<Typography>This is a User Create page</Typography>
			</DashboardCard>
		</PageContainer>
	);
};

export default UserCreate;

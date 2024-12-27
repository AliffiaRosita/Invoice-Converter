"use client";
import React from "react";
import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import { Typography } from "@mui/material";
import UserForm from "../components/UserForm";

const UserCreate = () => {
	return (
		<PageContainer
			title="User Create"
			description="this is User Create page"
		>
			<DashboardCard title="User Create">
				<UserForm mode="create" />
			</DashboardCard>
		</PageContainer>
	);
};

export default UserCreate;

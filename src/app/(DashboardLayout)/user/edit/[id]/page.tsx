"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import UserForm from "../../components/UserForm";
import { useDetailUser } from "@/services/rest/users/mutation";

const EditUser = ({ params }: any) => {
	const userId = params?.id;

	const mutationDetailUser = useDetailUser();
	const [data, setData] = React.useState();
	const getDetails = async () => {
		mutationDetailUser.mutate(userId, {
			onSuccess: (data) => {
				const response = data.data.data;
				setData(response);
			},
			onError: (error) => {
				console.error(error);
			},
		});
	};
	useEffect(() => {
		getDetails();
	}, []);
	return (
		<PageContainer title="Edit User" description="this is Edit User page">
			<DashboardCard title="Edit User">
				<UserForm id={userId} mode={"edit"} data={data} />
			</DashboardCard>
		</PageContainer>
	);
};

export default EditUser;

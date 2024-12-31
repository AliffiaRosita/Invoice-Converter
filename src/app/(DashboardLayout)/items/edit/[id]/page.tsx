"use client";

import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useGetItemById } from "@/services/rest/items/mutation";
import React from "react";
import ItemForm from "../../components/ItemForm";

const EditItems = ({ params }: any) => {
	const mutationItemById = useGetItemById();
	const [data, setData] = React.useState();

	const getDetails = async () => {
		mutationItemById.mutate(params.id, {
			onSuccess: (data) => {
				const response = data.data.data;

				setData(response);
			},
			onError: (error) => {
				console.error(error);
			},
		});
	};
	React.useEffect(() => {
		getDetails();
	}, []);
	return (
		<PageContainer title="Edit Item" description="this is Edit Item page">
			<DashboardCard title="Edit Item">
				<ItemForm id={params.id} mode={"edit"} data={data} />
			</DashboardCard>
		</PageContainer>
	);
};

export default EditItems;

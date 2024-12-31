"use client";

import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useGetInvoiceById } from "@/services/rest/invoices/mutation";
import React from "react";
import InvoiceForm from "../../components/InvoiceForm";

const EditInvoice = ({ params }: any) => {
	const mutationInvoiceById = useGetInvoiceById();
	const [data, setData] = React.useState();

	const getDetails = async () => {
		mutationInvoiceById.mutate(params.id, {
			onSuccess: (data) => {
				const response = data.data.data.invoice;

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
		<PageContainer
			title="Edit Invoice"
			description="this is Edit Invoice page"
		>
			<DashboardCard title="Edit Invoice">
				<InvoiceForm id={params.id} mode={"edit"} data={data} />
			</DashboardCard>
		</PageContainer>
	);
};

export default EditInvoice;

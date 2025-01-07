export type DashboardReport = {
	file_invoice_count: number;
	invoice_count: number;
	item_count: number;
	user_count: number;
};

export type ResponseGetDashboardReport = {
	success: boolean;
	data: DashboardReport;
};

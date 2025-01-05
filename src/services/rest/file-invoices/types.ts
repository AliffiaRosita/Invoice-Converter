export type Report = {
	id: string;
	name: string;
	created_at: string;
	updated_at: string;
	generated_url?: string | null;
	result_generated?: string | null;
	generate_status: string;
};

export type ResponseGetInvoices = {
	success: boolean;
	data: Report[];
};

export type ResponseGenerateInvoice = {
	success: boolean;
	data: Report;
};

export type ResponseDownloadInvoice = {
	response: Blob;
};

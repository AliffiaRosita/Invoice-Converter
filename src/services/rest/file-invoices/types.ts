export type Report = {
	id: string;
	name: string;
	created_at: string;
	updated_at: string;
	generated_url?: string | null;
	result_generated?: string | null;
	generate_status: string;
};

export type ResponseGetFileInvoices = {
	success: boolean;
	data: Report[];
};

export type ResponseGenerateFileInvoice = {
	success: boolean;
	data: Report;
};

export type ResponseDownloadFileInvoice = {
	response: Blob;
};

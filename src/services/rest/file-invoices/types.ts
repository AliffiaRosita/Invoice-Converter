export type Invoices = {
	id: string;
	name: string;
	created_at: string;
	updated_at: string;
	generated_url?: string | null;
	result_generated?: string | null;
};

export type ResponseGetInvoices = {
	success: boolean;
	data: Invoices[];
};

export type ResponseGenerateInvoice = {
	success: boolean;
	data: Invoices;
};

export type ResponseDownloadInvoice = {
	response: Blob;
};

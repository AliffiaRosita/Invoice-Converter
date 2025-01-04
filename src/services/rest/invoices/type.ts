export type Invoice = {
	id: number;
	file_invoice_id: number;
	invoice_number: string;
	receiver_name: string;
	invoice_date: string;
	receiver_address: string;
	sender_name: string;
	sender_address: string;
	subtotal: number;
	tax: number;
	total: number;
	file_url: string;
	created_at: string;
	updated_at: string;
};

export type ResponseGetInvoices = {
	success: boolean;
	data: Invoice[];
};
export type ResponsePdfInvoice = {
	response: Blob;
};

export type ResponseXlsInvoice = {
	response: Blob;
};

export type ResponseInvoiceById = {
	success: boolean;
	data: Invoice;
};

export type RequestUpdateInvoice = {
	invoice_number: string;
	receiver_name: string;
	receiver_address: string;
	sender_name: string;
	sender_address: string;
	subtotal: number;
	tax: number;
	total: number;
};

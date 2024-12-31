export type Item = {
	id: number;
	file_invoice_id: number;
	description: string;
	quantity: number | null;
	price: number;
	created_at: string;
	updated_at: string;
};

export type ResponseGetItems = {
	success: boolean;
	data: Item[];
};

export type ResponseDownloadItems = {
	response: Blob;
};

export type RequestUpdateItem = {
	description: string;
	quantity: number;
	price: number;
};

export type ResponseGetItemById = {
	success: boolean;
	data: Item;
};

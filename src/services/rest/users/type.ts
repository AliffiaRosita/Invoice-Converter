export type RequestCreateUser = {
	email: string;
	password?: string;
	name: string;
	role: string;
};

export type Users = {
	id: string;
	email: string;
	name: string;
	role: string;
	last_login_at?: string | null;
	created_at: string;
	updated_at: string;
};

export type ResponseDetailUsers = {
	success: boolean;
	data: Users;
};
export type ResponseGetUsers = {
	success: boolean;
	data: Users[];
};

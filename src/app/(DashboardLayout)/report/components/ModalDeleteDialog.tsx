import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Typography,
} from "@mui/material";
import { IconAlertTriangle } from "@tabler/icons-react";
import React from "react";

interface ModalDeleteDialogProps {
	id: any;
	open: any;
	closeDialog: () => void;
	setTableData: (data: any) => void;
}

const ModalDeleteDialog = ({
	id,
	open,
	closeDialog,
	setTableData,
}: ModalDeleteDialogProps) => {
	const [isSubmitting, setisSubmitting] = React.useState(false);
	const handleDelete = () => {
		setisSubmitting(true);
		const url = `${process.env.NEXT_PUBLIC_API_URL}/invoice/${id}`;
		fetch(url, {
			method: "DELETE",
		})
			.then((response) => response.json())
			.then((data) => {
				setTableData((prevTableData: any) => {
					return prevTableData.filter((item: any) => item.id !== id);
				});
				setisSubmitting(false);
				closeDialog();
			})
			.catch((error) => {
				console.error(error);
			});
	};
	return (
		<Dialog
			open={open}
			onClose={() => closeDialog()}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 1,
					}}
				>
					<IconAlertTriangle style={{ color: "red" }} />
					<Typography sx={{ color: "red" }}>
						Delete this report
					</Typography>
				</Box>
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Once deleting this report, you can&apos;t undo it.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => closeDialog()} disabled={isSubmitting}>
					Cancel
				</Button>
				<Button
					onClick={() => handleDelete()}
					disabled={isSubmitting}
					autoFocus
				>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ModalDeleteDialog;

"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./global.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Provider } from "@/providers/Provider";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<ThemeProvider theme={baselightTheme}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					<Provider>
						<ReactQueryProvider>{children}</ReactQueryProvider>
					</Provider>
				</ThemeProvider>
			</body>
		</html>
	);
}

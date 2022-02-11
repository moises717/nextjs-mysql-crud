import { Navbar } from "./Navbar";
export const Layout = ({ children }) => {
	return (
		<>
			<Navbar />

			<div className="bg-gray-100  h-screen p-10">
				<div className="container mx-auto h-full my-10">{children}</div>
			</div>
		</>
	);
};

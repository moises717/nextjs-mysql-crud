import axios from "axios";
import { Layout } from "../components/Layout";

import { ProductList } from "../components/ProductList";

const HomePage = ({ products }) => {
	return (
		<Layout>
			<div className="grid gap-4 grid-cols-1 md:grid-cols-3">
				<ProductList products={products} />
			</div>
		</Layout>
	);
};

export const getServerSideProps = async (context) => {
	const { data: products } = await axios.get("http://localhost:3000/api/products");

	return {
		props: {
			products,
		},
	};
};

export default HomePage;

import { Layout } from "../components/Layout";
import { ProductForm } from "../components/ProductForm";

const NewPage = () => {
	return (
		<Layout>
			<div className="grid place-items-center h-full">
				<ProductForm />
			</div>
		</Layout>
	);
};

export default NewPage;

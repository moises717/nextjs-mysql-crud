import { useRouter } from "next/router";
import axios from "axios";
import { Layout } from "../../components/Layout";

const ProductPage = ({ product }) => {
	const router = useRouter();

	const handleDeelete = async (id) => {
		await axios.delete(`http://localhost:3000/api/products/${id}`);
		router.push("/");
	};
	return (
		<Layout>
			<div className="h-full grid place-items-center">
				<div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
					<a href="#">
						<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
					</a>
					<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.description}</p>
					<a
						href="#"
						onClick={() => handleDeelete(product.id)}
						class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						Eliminar
						<svg
							class="w-6 h-4 dark:text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
						</svg>
					</a>
					<a
						href="#"
						onClick={() => router.push("/products/edit/" + product.id)}
						class="inline-flex ml-3 items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						Editar
						<svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path
								fill-rule="evenodd"
								d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
								clip-rule="evenodd"></path>
						</svg>
					</a>
				</div>
			</div>
		</Layout>
	);
};

export const getServerSideProps = async (context) => {
	const { data: product } = await axios.get("http://localhost:3000/api/products/" + context.query.id);

	return {
		props: {
			product,
		},
	};
};

export default ProductPage;

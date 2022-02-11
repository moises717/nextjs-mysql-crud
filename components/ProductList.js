import Link from "next/link";
import { ProductCard } from "./ProductCard";

export const ProductList = ({ products }) => {
	return (
		<>
			{products.map((product) => (
				<Link href={`products/${product.id}`} key={product.id}>
					<ProductCard product={product} />
				</Link>
			))}
		</>
	);
};

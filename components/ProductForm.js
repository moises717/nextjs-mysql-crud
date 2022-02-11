import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export const ProductForm = () => {
	const [product, setProduct] = useState({
		name: "",
		price: "",
		description: "",
	});

	const router = useRouter();

	const notify = (message) => {
		toast.error(message, {
			position: "bottom-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (product.name === "" || product.price === "" || product.description === "") {
			notify("Rellena todos os campos!");
			return;
		}

		try {
			if (!router.query.id) {
				await axios.post("/api/products", {
					...product,
				});
			} else {
				await axios.put("/api/products/" + router.query.id, {
					...product,
				});
			}
		} catch (error) {
			notify(error.message);

			return;
		}

		router.push("/");
	};

	const onChange = (e) => {
		setProduct({
			...product,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		const getProduct = async (id) => {
			const { data: product } = await axios.get("/api/products/" + id);
			setProduct(product);
		};

		if (router.query.id) {
			getProduct(router.query.id);
		}
	}, []);

	return (
		<div className="w-full max-w-xs">
			<form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<div className="mb-4">
					<label htmlFor="name" className="block text-gray-700 text-sm font-bold md-2">
						Nombre
					</label>
					<input
						type="text"
						onChange={onChange}
						name="name"
						value={product.name}
						className="shadow appearance  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="price" className="block text-gray-700 text-sm font-bold md-2">
						Precio
					</label>
					<input
						type="text"
						onChange={onChange}
						name="price"
						value={product.price}
						className="shadow appearance  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="price"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="description" className="block text-gray-700 text-sm font-bold md-2">
						Descripción{" "}
					</label>
					<textarea
						name="description"
						className="shadow appearance  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={onChange}
						value={product.description}
						id="descripction"></textarea>
				</div>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline text-white font-bold">
					{router.query.id ? "Actualizar producto" : "Agregar producto"}
				</button>
			</form>
			<Toaster />
		</div>
	);
};

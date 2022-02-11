import { pool } from "../../../config/db";

export default async function handler(req, res) {
	switch (req.method) {
		case "GET": {
			return getProducts(req, res);
		}
		case "DELETE": {
			return deleteProduct(req, res);
		}
		case "PUT": {
			return updateProduct(req, res);
		}
	}
}

const getProducts = async (req, res) => {
	const { id } = req.query;
	const [result] = await pool.query("SELECT * FROM product WHERE id = ?", [id]);
	res.status(200).json(result[0]);
};

const deleteProduct = async (req, res) => {
	try {
		const { id } = req.query;
		await pool.query("DELETE FROM product WHERE id = ?", [id]);
		res.status(204).json();
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

const updateProduct = async (req, res) => {
	const { id } = req.query;
	const { name, description, price } = req.body;

	try {
		await pool.query("UPDATE product SET name = ?, description = ?, price = ? WHERE id = ?", [
			name,
			description,
			price,
			id,
		]);
		res.status(204).json();
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

import { pool } from "../../../config/db";

export default async function handler(req, res) {
	switch (req.method) {
		case "POST": {
			return saveProduct(req, res);
		}
		case "GET": {
			return getProducts(req, res);
		}
	}
}

const saveProduct = async (req, res) => {
	const { name, price, description } = req.body;

	try {
		const [result] = await pool.query("INSERT INTO product SET ?", { name, description, price });

		return res.status(200).json({
			message: "Product created",
			id: result.insertId,
			name,
			price,
			description,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

const getProducts = async (req, res) => {
	try {
		const [result] = await pool.query("SELECT * FROM product");

		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

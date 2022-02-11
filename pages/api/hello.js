import { pool } from "../../config/db";

export default async function handler(req, res) {
	const [rows] = await pool.query("SELECT NOW()");

	res.status(200).json({
		message: rows[0]["NOW()"],
	});
}

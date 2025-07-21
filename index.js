const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get("/cek-resi", async (req, res) => {
  const { resi, kurir } = req.query;
  const apiKey = process.env.BINDERBYTE_API_KEY;

  if (!resi || !kurir) {
    return res.status(400).json({ error: "resi dan kurir wajib diisi" });
  }

  try {
    const response = await axios.get(
      `https://api.binderbyte.com/v1/track?api_key=${apiKey}&courier=${kurir}&awb=${resi}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Gagal mengambil data:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log("KEY:", process.env.BINDERBYTE_API_KEY);
});

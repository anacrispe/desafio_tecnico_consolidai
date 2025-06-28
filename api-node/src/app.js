const express = require('express');
const cors = require('cors'); 
const app = express();
require('dotenv').config();

const produtosRoutes = require('./routes/produtos');

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use('/produtos', produtosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

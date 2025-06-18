const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const boardRoutes = require('./api/boards.js');
app.use('/api/boards', boardRoutes);

const cardRoutes = require('./api/cards.js');
app.use('/api/cards', cardRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening at port: ${PORT}`)
})

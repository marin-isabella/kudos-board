const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const boardRoutes = require('./routes/boards.js');
app.use('/api/boards', boardRoutes);

const cardRoutes = require('./routes/cards.js');
app.use('/api/cards', cardRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening at port: ${PORT}`)
})

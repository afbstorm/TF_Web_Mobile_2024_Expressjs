const express = require('express');
const router = require('./router/users');

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(router);


app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`);
});

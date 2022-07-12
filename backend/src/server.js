const app = require('./');

const port = 8888;

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});
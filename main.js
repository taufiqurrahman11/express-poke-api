import express from 'express';
import { router as pokemonRoutes } from './routes/index.js';
import { handleClientError } from './helpers/handleError.js';

const app = express();
const PORT = 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', pokemonRoutes);

app.use((req, res) => {
    return handleClientError(res, 404, 'URL not found');
});

app.listen(PORT, ()=> {
    console.log(`App running on PORT ${PORT}`)
})
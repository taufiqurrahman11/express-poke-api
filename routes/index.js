import express from 'express';
import { getPokemonList, getPokemonDetail, catchPokemon, getMyPokemon, releasePokemon, renamePokemon } from '../controller/index.js';

export const router = express.Router();

router.get('/pokemon', getPokemonList);
router.get('/pokemon/:id', getPokemonDetail);
router.post('/pokemon', catchPokemon);
router.get('/my-pokemon', getMyPokemon);
router.delete('/my-pokemon/:name', releasePokemon);
router.put('/my-pokemon/rename/:id', renamePokemon);
import axios from 'axios';
import { loadData, storeData } from '../helpers/databaseHelper.js';
import { v4 as uuidv4 } from 'uuid';
import { isPrime } from '../helpers/isPrime.js';
import { fibonacci } from '../helpers/fibonacci.js';
import { handleClientError, handleServerError } from '../helpers/handleError.js';


export const getPokemonList = async (req, res) => {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
        const datas = response.data;

        return res.status(200).json({ data: datas, status: 200, message: 'Success' })
    } catch (error) {
        return handleServerError(res)
    }
}

export const getPokemonDetail = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return handleClientError(res, 400, 'Check again, Id must be a number');
        }

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const responseById = response.data

        const selectedData = {
            name: responseById.name,
            order: responseById.order,
            species: responseById.species,
            base_experience: responseById.base_experience,
            forms: responseById.forms,
            abilities: responseById.abilities
        }
        // name, order, species, base_experience, forms

        if(!responseById) {
            return handleClientError(res, 404, 'Pokemon not found')
        }

        return res.status(200).json({ data: selectedData, status: 200, message: 'Success get by id'})
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return handleClientError(res, 404, 'Pokemon not found');
        }
        return handleServerError(res)
    }
}

export const catchPokemon = async (req, res) => {
    try {
        const randomId = Math.floor(Math.random() * 1000) + 1;
        const pokemonDetail = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);

        const probabilitySuccess = Math.random() < 0.5;

        if (probabilitySuccess) {
            const myPokemonList = loadData();

            const isDuplicate = myPokemonList.some(pokemon => pokemon.name === pokemonDetail.data.name);
            if (isDuplicate) {
                return res.status(400).json({ message: 'You already caught this Pokemon' });
            }

            const catchedPokemon = {
                id: uuidv4(),
                name: pokemonDetail.data.name,
            }
            // console.log(catchedPokemon);

            myPokemonList.push(catchedPokemon);
            storeData(myPokemonList);

            return res.status(201).json({ data: catchedPokemon, status: 201, message: 'Pokemon catch successfully!'})
        } else {
            return res.status(400).json({ message: 'Let\'s catch Pokemon again'})
        }
    } catch (error) {
        return handleServerError(res)
    }
}

export const getMyPokemon = async (req, res) => {
    try {
        const myPokemonList = await loadData();

        if (myPokemonList.length === 0) {
            return handleClientError(res, 404, 'Empty pokemon!');
        }

        return res.status(200).json({ data: myPokemonList, status: 200, message: 'Success get your pokemon list.' });
    } catch (error) {
        return handleServerError(res)
    }
}

export const releasePokemon = async (req, res) => {
    try {
        const { name } = req.params;
        const myPokemonList = loadData();

        const releasedPokemon = myPokemonList.findIndex(pokemon => pokemon.name.toLowerCase() === name.toLowerCase())
        
        if (releasedPokemon === -1) {
            return handleClientError(res, 404, 'Pokemon not in your list')
        }
        
        const randomNumber = Math.floor(Math.random() * 1000 + 1);

        if (!isPrime(randomNumber)) {
            return res.status(400).json({ message: 'Release pokemon failed' });
        }

        myPokemonList.splice(releasedPokemon, 1);
        storeData(myPokemonList);

        return res.status(200).json({ message: 'Release successful. Pokemon has been removed from your list.' });
    } catch (error) {
        return handleServerError(res)
    }
}

export const renamePokemon = async (req, res) => {
    try {
        const { id } = req.params;
        const { renameFromBody } = req.body;
        const myPokemonList = loadData();

        const targetPokemon = myPokemonList.find(pokemon => pokemon.id === id);
        console.log(targetPokemon);
        if (!targetPokemon) {
            return handleClientError(res, 404, 'Pokemon not in your list');
        }

        const namePokemon = targetPokemon.name.split('-');
        console.log(namePokemon);
        const renameCount = targetPokemon.renameCount || 0;
        

        let newName = '';
        if(renameFromBody) {
            newName = `${renameFromBody}-${renameCount > 0 ? fibonacci(renameCount) : 0}`
        } else {
            newName = `${namePokemon[0]}-${namePokemon[1] ? fibonacci(renameCount) : 0}`;
        }
        
        targetPokemon.name = newName;
        targetPokemon.renameCount = renameCount + 1;

        storeData(myPokemonList);
        return res.status(200).json({
            newName,
            message: `Success rename your pokemon`
        })
    } catch (error) {
        return handleServerError(res);
    }
}
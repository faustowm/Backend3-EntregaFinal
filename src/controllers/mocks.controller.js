import MockingService from "../services/mocking.js";
import User from "../dao/models/User.js";
import Pet from "../dao/models/Pet.js";

const getMockingPets = async (req, res) => {
    try {
        const limit = Number(req.query.pets) || 100; // Limitar por query o usar 100 por defecto
        const pets = await MockingService.generateMockingPets(limit); // Generar solo la cantidad solicitada
        res.status(200).json({
            status: "success",
            requested: limit,
            payload: pets,
        });
    } catch (error) {
        console.error("Error fetching mocking pets:", error);
        res.status(500).json({ error: "Failed to fetch pets" });
    }
};

const getMockingUsers = async (req, res) => {
    try {
        const limit = Number(req.query.users) || 50; // Limitar por query o usar 50 por defecto
        const users = await MockingService.generateMockingUsers(limit); // Generar solo la cantidad solicitada
        res.status(200).json({
            status: "success",
            requested: limit,
            payload: users,
        });
    } catch (error) {
        console.error("Error fetching mocking users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

const generateData = async (req, res) => {
    const { users = 0, pets = 0 } = req.query;

    try {
        const numUsers = parseInt(users) || 0;
        const numPets = parseInt(pets) || 0;

        const generatedUsers = await MockingService.generateMockingUsers(numUsers);
        const generatedPets = await MockingService.generateMockingPets(numPets);

        res.status(200).json({
            message: "Data generated successfully (POST)",
            generated: {
                users: generatedUsers.length,
                pets: generatedPets.length,
            },
        });
    } catch (error) {
        console.error("Error generating data:", error);
        res.status(500).json({ error: "Failed to generate data" });
    }
};

const generateDataGet = async (req, res) => {
    const { users = 0, pets = 0 } = req.query;

    try {
        const numUsers = parseInt(users) || 0;
        const numPets = parseInt(pets) || 0;

        const generatedUsers = await MockingService.generateMockingUsers(numUsers);
        const generatedPets = await MockingService.generateMockingPets(numPets);

        res.status(200).json({
            message: "Data generated successfully (GET)",
            generated: {
                users: generatedUsers.length,
                pets: generatedPets.length,
            },
        });
    } catch (error) {
        console.error("Error generating data:", error);
        res.status(500).json({ error: "Failed to generate data" });
    }
};

export default {
    getMockingUsers,
    getMockingPets,
    generateData, // Para POST
    generateDataGet, // Para GET
};
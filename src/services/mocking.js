import { faker } from "@faker-js/faker/locale/es";
import { createHash } from "../utils/index.js";
import User from "../dao/models/User.js";
import Pet from "../dao/models/Pet.js";

class MockingService {
    static async generateMockingUsers(num) {
        const users = [];
        for (let i = 0; i < num; i++) {
            const user = {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: await createHash("coder123"),
                role: faker.helpers.arrayElement(["user", "admin"]),
                pets: [],
            };

            const savedUser = await User.create(user); 
            users.push(savedUser); 
        }
        return users;
    }

    static async generateMockingPets(num) {
        const pets = [];
        const allowedSpecies = [
            { name: "Dog", }, 
            { name: "Cat", }
        ];

        for (let i = 0; i < num; i++) {
            const species = faker.helpers.arrayElement(allowedSpecies); 
            const pet = {
                name: faker.helpers.arrayElement([faker.animal.dog(), faker.animal.cat()]), 
                specie: species.name,
                adopted: false,
                image: species.image
            };
            const savedPet = await Pet.create(pet); 
            pets.push(savedPet); 
        }
        console.log(pets);
        return pets; 
    }
}

export default MockingService;
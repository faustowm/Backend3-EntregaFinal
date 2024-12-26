import supertest from 'supertest';
import { expect } from 'chai';

const requester = supertest('http://localhost:8080'); // Ajusta el puerto si es necesario

// IDs de prueba
const validUserId = "6744b0e63ba70f4b6d295ae6"; // ID de usuario válido
const validPetId = "6744b3093e8d12d4eba8e733"; // ID de mascota válida

describe('Testing Adoptme - Functional Endpoints', () => {
    let adoptionId;

    describe('GET /api/adoptions', () => {
        it('Should retrieve all adoptions', async () => {
            const response = await requester.get('/api/adoptions');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('payload');
            expect(response.body.payload).to.be.an('array');
        });
    });

    describe('GET /api/adoptions/:aid', () => {
        it('Should return 404 for a non-existing adoption', async () => {
            const response = await requester.get('/api/adoptions/1234567890abcdef12345678');
            expect(response.status).to.equal(404);
        });

        it('Should retrieve a specific adoption by ID', async () => {
            const allAdoptions = await requester.get('/api/adoptions');
            adoptionId = allAdoptions.body.payload[0]?._id;

            if (adoptionId) {
                const response = await requester.get(`/api/adoptions/${adoptionId}`);
                expect(response.status).to.equal(200);
                expect(response.body.payload).to.have.property('_id', adoptionId);
            } else {
                console.warn('No adoptions available for testing this case.');
            }
        });
    });

    describe('POST /api/adoptions/:uid/:pid', () => {
        it('Should successfully create a new adoption', async () => {
            const response = await requester.post(`/api/adoptions/${validUserId}/${validPetId}`);
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('message', 'Pet adopted');
        });

        it('Should return 404 for a non-existing user', async () => {
            const response = await requester.post('/api/adoptions/1234567890abcdef12345678/6744b3093e8d12d4eba8e735');
            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('error', 'user Not found');
        });

        it('Should return 400 if the pet is already adopted', async () => {
            const response = await requester.post(`/api/adoptions/${validUserId}/${validPetId}`);
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error', 'Pet is already adopted');
        });
    });
});

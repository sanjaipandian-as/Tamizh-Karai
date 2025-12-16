import request from 'supertest';
import app from '../../server.js';
import User from '../../Models/User.js';
import { connectDB, clearDB, closeDB } from '../utils/db.test.utils.js';

describe('User Authentication API', () => {
    beforeAll(async () => {
        await connectDB();
    });

    afterEach(async () => {
        await clearDB();
    });

    afterAll(async () => {
        await closeDB();
    });

    describe('POST /api/v1/auth/users/signup', () => {
        it('should register a new user successfully', async () => {
            const userData = {
                fullName: 'Test User',
                email: 'test@example.com',
                phone: '9876543210',
                password: 'Test@1234'
            };

            const response = await request(app)
                .post('/api/v1/auth/users/signup')
                .send(userData)
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.user.email).toBe(userData.email);
            expect(response.body.user.password).toBeUndefined();
        });

        it('should not register user with existing email', async () => {
            const userData = {
                fullName: 'Test User',
                email: 'test@example.com',
                phone: '9876543210',
                password: 'Test@1234'
            };

            await request(app).post('/api/v1/auth/users/signup').send(userData);

            const response = await request(app)
                .post('/api/v1/auth/users/signup')
                .send(userData)
                .expect(400);

            expect(response.body.success).toBe(false);
        });

        it('should validate email format', async () => {
            const userData = {
                fullName: 'Test User',
                email: 'invalid-email',
                phone: '9876543210',
                password: 'Test@1234'
            };

            const response = await request(app)
                .post('/api/v1/auth/users/signup')
                .send(userData)
                .expect(400);

            expect(response.body.success).toBe(false);
        });

        it('should validate password strength', async () => {
            const userData = {
                fullName: 'Test User',
                email: 'test@example.com',
                phone: '9876543210',
                password: 'weak'
            };

            const response = await request(app)
                .post('/api/v1/auth/users/signup')
                .send(userData)
                .expect(400);

            expect(response.body.success).toBe(false);
        });
    });

    describe('POST /api/v1/auth/users/login', () => {
        beforeEach(async () => {
            await User.create({
                fullName: 'Test User',
                email: 'test@example.com',
                phone: '9876543210',
                password: 'Test@1234'
            });
        });

        it('should login user with correct credentials', async () => {
            const response = await request(app)
                .post('/api/v1/auth/users/login')
                .send({
                    email: 'test@example.com',
                    password: 'Test@1234'
                })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.token).toBeDefined();
            expect(response.body.refreshToken).toBeDefined();
        });

        it('should not login with incorrect password', async () => {
            const response = await request(app)
                .post('/api/v1/auth/users/login')
                .send({
                    email: 'test@example.com',
                    password: 'WrongPassword123'
                })
                .expect(401);

            expect(response.body.success).toBe(false);
        });

        it('should not login non-existent user', async () => {
            const response = await request(app)
                .post('/api/v1/auth/users/login')
                .send({
                    email: 'nonexistent@example.com',
                    password: 'Test@1234'
                })
                .expect(401);

            expect(response.body.success).toBe(false);
        });
    });

    describe('GET /api/v1/auth/users/profile', () => {
        let token;

        beforeEach(async () => {
            await User.create({
                fullName: 'Test User',
                email: 'test@example.com',
                phone: '9876543210',
                password: 'Test@1234'
            });

            const loginResponse = await request(app)
                .post('/api/v1/auth/users/login')
                .send({
                    email: 'test@example.com',
                    password: 'Test@1234'
                });

            token = loginResponse.body.token;
        });

        it('should get user profile with valid token', async () => {
            const response = await request(app)
                .get('/api/v1/auth/users/profile')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.user.email).toBe('test@example.com');
        });

        it('should not get profile without token', async () => {
            const response = await request(app)
                .get('/api/v1/auth/users/profile')
                .expect(401);

            expect(response.body.message).toContain('Unauthorized');
        });

        it('should not get profile with invalid token', async () => {
            const response = await request(app)
                .get('/api/v1/auth/users/profile')
                .set('Authorization', 'Bearer invalid-token')
                .expect(401);

            expect(response.body.message).toContain('Unauthorized');
        });
    });
});

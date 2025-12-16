import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// User schema (simplified)
const userSchema = new mongoose.Schema({
    fullName: String,
    email: { type: String, unique: true },
    phone: String,
    password: String
});

const User = mongoose.model('User', userSchema);

async function createTestUser() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to database');

        // Check if test user exists
        const existingUser = await User.findOne({ email: 'test@example.com' });
        if (existingUser) {
            console.log('ℹ️  Test user already exists');
            console.log('Email: test@example.com');
            console.log('Password: Test@1234');
            process.exit(0);
        }

        // Create test user
        const hashedPassword = await bcrypt.hash('Test@1234', 12);
        const testUser = await User.create({
            fullName: 'Test User',
            email: 'test@example.com',
            phone: '9876543210',
            password: hashedPassword
        });

        console.log('✅ Test user created successfully!');
        console.log('\n📝 Login Credentials:');
        console.log('Email: test@example.com');
        console.log('Password: Test@1234');
        console.log('\nYou can now use these credentials to test login!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

createTestUser();

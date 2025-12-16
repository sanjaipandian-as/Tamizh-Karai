import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema({
    fullName: String,
    email: { type: String, unique: true },
    phone: String,
    password: String
});

const User = mongoose.model('User', userSchema);

async function checkUser() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to database\n');

        // Find the test user
        const user = await User.findOne({ email: 'test@example.com' }).select('+password');

        if (!user) {
            console.log('❌ Test user NOT found in database!');
            console.log('Run: node create-test-user.js to create it');
            process.exit(1);
        }

        console.log('✅ Test user found in database');
        console.log('\n📝 User Details:');
        console.log('Email:', user.email);
        console.log('Full Name:', user.fullName);
        console.log('Phone:', user.phone);
        console.log('Password Hash:', user.password.substring(0, 20) + '...');

        // Test password comparison
        console.log('\n🔐 Testing Password:');
        const testPassword = 'Test@1234';
        const isMatch = await bcrypt.compare(testPassword, user.password);

        if (isMatch) {
            console.log('✅ Password "Test@1234" matches!');
            console.log('\n✨ Login should work with:');
            console.log('   Email: test@example.com');
            console.log('   Password: Test@1234');
        } else {
            console.log('❌ Password does NOT match!');
            console.log('There might be an issue with the stored password.');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

checkUser();

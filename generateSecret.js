const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Generate a random string of 64 characters
const generateSecret = () => {
    return crypto.randomBytes(32).toString('hex');
};

// Read the current .env file
const envPath = path.join(__dirname, '.env');
const secret = generateSecret();

try {
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Replace existing JWT_SECRET or add new one
    if (envContent.includes('JWT_SECRET=')) {
        envContent = envContent.replace(/JWT_SECRET=.*/, `JWT_SECRET=${secret}`);
    } else {
        envContent += `\nJWT_SECRET=${secret}`;
    }
    
    // Write back to .env file
    fs.writeFileSync(envPath, envContent);
    
    console.log('JWT Secret generated and added to .env file');
    console.log('Generated Secret:', secret);
} catch (error) {
    console.error('Error updating .env file:', error);
} 
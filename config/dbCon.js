import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

// MongoDB connection
const connectdb = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection error details:', {
            message: err.message,
            code: err.code,
            uri: process.env.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//****:****@') // Log URI without credentials
        });
    });
};

export default connectdb;  
import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    //If the database is already connected, don't connect again
    if (connected) {
        console.log('Database is already connected');
        return;
    }

    //Connect to the database
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
        console.log('MongoDB connected');
    }catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

export default connectDB;
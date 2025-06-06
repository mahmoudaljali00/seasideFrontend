// lib/mongodb.js

import { MongoClient } from "mongodb";

export default async function connectToDatabase(params) {
    const clint = new MongoClient(process.env.MONGODB_URI);

    try {
        await clint.connect();
        return clint.db();

    } catch (error) {
        console.error('Error connecting to mongodb:', error)
        throw error;
    }
}
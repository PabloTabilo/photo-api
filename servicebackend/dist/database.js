"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
async function startConnection() {
    const db = await mongoose_1.connect('mongodb://localhost/photo-gallery-db', {
        useNewUrlParser: true,
        useFindAndModify: false
    });
    console.log('Database is connected');
}
exports.startConnection = startConnection;

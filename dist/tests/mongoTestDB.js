"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongod = mongodb_memory_server_1.MongoMemoryServer.create();
// Connect to DB
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    const uri = (yield mongod).getUri();
    // const mongooseOpts = {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     poolSize:10
    // };
    yield mongoose_1.default.connect(uri)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error('Could not connect to MongoDB: ', err));
});
// Disconnect and close connection
const closeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.dropDatabase();
    yield mongoose_1.default.connection.close();
    yield (yield mongod).stop();
});
// Clear the DB remove all data
const clearDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const collections = mongoose_1.default.connection.collections;
    for (const key in collections) {
        if (key) {
            const collection = collections[key];
            yield collection.deleteMany({});
        }
    }
});
const testDB = {
    connect,
    closeDatabase,
    clearDatabase
};
exports.default = testDB;
//# sourceMappingURL=mongoTestDB.js.map
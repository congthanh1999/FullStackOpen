"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_2 = require("express");
const router = (0, express_2.Router)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const pingRouter = router.get("/", (_req, res) => {
    res.send("pong");
});
app.use("/api/ping", pingRouter);
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`connected to server on PORT: ${PORT}`);
});

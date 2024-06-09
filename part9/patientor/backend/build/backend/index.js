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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnoses_1 = __importDefault(require("../data/diagnoses"));
// import patients from "../data/patients";
const router = express_1.default.Router();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const getDiagnoses = router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(diagnoses_1.default);
}));
// const getPatients = router.get("/", async (_req, res) => {
//   res.json(patients);
// });
app.use("/api/diagnoses", getDiagnoses);
// app.use("/api/patients", getPatients);
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`connected to server on PORT: ${PORT}`);
});

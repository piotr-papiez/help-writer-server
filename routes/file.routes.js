import { Router } from "express";

import { presign } from "../controllers/file.controller.js";

const router = Router();

router.post("/files", presign);

export default router;
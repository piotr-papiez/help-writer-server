import { Router } from "express";

import {
    loadArticle,
    loadArticles,
    createArticle,
    copyArticle,
    updateArticle
} from "../controllers/article.controller.js";

const router = Router();

router.get("/articles/:articleId", loadArticle);
router.get("/articles", loadArticles);

router.post("/articles", createArticle);
router.post("/copy-article/:articleId", copyArticle);

router.put("/articles/:articleId", updateArticle);

export default router;
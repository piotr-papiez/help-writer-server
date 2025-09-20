import { Router } from "express";

import {
    deleteArticle,
    loadArticle,
    loadArticles,
    createArticle,
    copyArticle,
    updateArticle
} from "../controllers/article.controller.js";

const router = Router();

router.delete("/articles/:articleId", deleteArticle);

router.get("/articles/:articleId", loadArticle);
router.get("/articles", loadArticles);

router.post("/articles", createArticle);
router.post("/copy-article/:articleId", copyArticle);

router.put("/articles/:articleId", updateArticle);

export default router;
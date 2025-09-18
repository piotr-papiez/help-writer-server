import xss from "xss";

import Article from "../models/article.model.js";

// GET: /api/articles/:articleId
export const loadArticle = async (req, res) => {
    const articleId = req.params.articleId;
    console.log(articleId);

    try {
        const article = await Article.findById(articleId);

        res.status(200).json(article);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while loading article" });
    }
};

// GET: /api/articles
export const loadArticles = async (req, res) => {
    try {
        const articles = await Article.find();

        res.status(200).json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while loading articles" });
    }
};

// POST: /api/articles
export const createArticle = async (req, res) => {
    console.log(req.body);
    const { title } = req.body;

    try {
        const titleAlreadyExists = await Article.find({ title: title });
        console.log(titleAlreadyExists);

        if (titleAlreadyExists.length > 0) return res.status(409).json({ error: "Title already exists" });

        const newArticle = await Article.create({
            title,
            creationDate: new Date(),
            lastModificationDate: new Date(),
            content: "[]"
        });

        res.status(201).json({ newArticleId: newArticle._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while creating new article" });
    }
};

// PUT: /api/articles/:articleId
export const updateArticle = async (req, res) => {
    const articleId = req.params.articleId;
    const { title, lastModificationDate, content } = req.body;
    const article = await Article.findById(articleId);

    if (!article) return res.status(404).json({ error: "Article not found" });

    try {
        await Article.findByIdAndUpdate(articleId, {
            title,
            lastModificationDate,
            content
        }); console.log("@@@@@");

        res.status(200).json({ message: "Article successfully updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while updating article" })
    }
}
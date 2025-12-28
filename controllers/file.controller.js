// POST: api/files
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

export const presign = async (req, res) => {
    const R2 = new S3Client({
        region: "auto",
        endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY,
            secretAccessKey: process.env.R2_SECRET_KEY
        }
    });

    try {
        const { blockId, fileName, contentType } = req.body;

        if (!blockId || !fileName || !contentType) return res.status(400).json({ error: "BAD_REQUEST" });
        if (!contentType.startsWith("image/")) return res.status(400).json({ error: "ONLY_IMAGES_ALLOWED" });

        const safeName = fileName.replace(/[^\w.\-()]+/g, "_");
        const key = `editor/${safeName}-${crypto.randomUUID()}`;

        const cmd = new PutObjectCommand({
            Bucket: process.env.R2_BUCKET,
            Key: key,
            ContentType: contentType
        });

        const uploadUrl = await getSignedUrl(R2, cmd, { expiresIn: 60 });
        const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

        return res.json({ uploadUrl, publicUrl, key });
    } catch (error) {
        return res.status(500).json({ error: "SERVER_ERROR" });
    }
}
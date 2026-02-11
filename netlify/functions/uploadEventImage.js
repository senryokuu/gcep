const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FB_PROJECT_ID,
      clientEmail: process.env.FB_CLIENT_EMAIL,
      privateKey: process.env.FB_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    storageBucket: process.env.FB_STORAGE_BUCKET,
  });
}

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: "Method Not Allowed",
      };
    }

    const { fileName, fileBase64 } = JSON.parse(event.body);

    if (!fileName || !fileBase64) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing data" }),
      };
    }

    const buffer = Buffer.from(fileBase64, "base64");
    const bucket = admin.storage().bucket();

    const file = bucket.file(`event-images/${Date.now()}-${fileName}`);

    await file.save(buffer, {
      metadata: {
        contentType: "image/jpeg",
      },
    });

    await file.makePublic();

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

    return {
      statusCode: 200,
      body: JSON.stringify({ url: publicUrl }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Upload failed" }),
    };
  }
};

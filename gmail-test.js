import { google } from "googleapis";

async function sendMail() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials/service-account.json",
      scopes: ["https://www.googleapis.com/auth/gmail.send"],
    });

    const gmail = google.gmail({ version: "v1", auth });

    const message = [
      "From: your_email@gmail.com",
      "To: your_email@gmail.com",
      "Subject: OpenClaw Gmail Test",
      "",
      "Hello from OpenClaw chatbot!",
    ].join("\n");

    const encodedMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const res = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log("Mail sent!");
    console.log(res.data);

  } catch (error) {
    console.error(error);
  }
}

sendMail();


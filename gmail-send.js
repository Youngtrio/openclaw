import fs from "fs";
import { google } from "googleapis";

export async function sendMail(subject, text) {

  const credentials = JSON.parse(
    fs.readFileSync("credentials/gmail-oauth.json")
  );

  const token = JSON.parse(
    fs.readFileSync("credentials/gmail-token.json")
  );

  const { client_secret, client_id, redirect_uris } =
    credentials.installed;

  const auth = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  auth.setCredentials(token);

  const gmail = google.gmail({ version: "v1", auth });

  const message = [
    "From: leeyounghoo85@gmail.com",
    "To: leeyounghoo85@gmail.com",
    `Subject: ${subject}`,
    "",
    text
  ].join("\n");

  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw: encodedMessage }
  });

  console.log("Email sent");
}


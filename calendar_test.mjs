import fs from "fs";
import path from "path";
import { google } from "googleapis";
import { authenticate } from "@google-cloud/local-auth";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

async function authorize() {

  const client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });

  // 토큰 저장
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(client.credentials));

  return client;
}

async function main() {

  const auth = await authorize();

  const calendar = google.calendar({
    version: "v3",
    auth: auth,
  });

  const event = {
    summary: "OpenClaw Test Event",
    start: {
      dateTime: "2026-03-16T10:00:00",
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: "2026-03-16T11:00:00",
      timeZone: "Asia/Kolkata",
    },
  };

  const res = await calendar.events.insert({
    calendarId: "primary",
    requestBody: event,
  });

  console.log("✅ 일정 생성 성공");
  console.log(res.data.htmlLink);
}

main().catch(console.error);


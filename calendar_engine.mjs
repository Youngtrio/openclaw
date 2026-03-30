import { google } from "googleapis";
import fs from "fs";

const key = JSON.parse(fs.readFileSync("./service-account.json"));

const auth = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ["https://www.googleapis.com/auth/calendar"]
);

const calendar = google.calendar({ version: "v3", auth });

const summary = process.argv[2];
const start = process.argv[3];
const end = process.argv[4];

async function main() {
  const event = {
    summary: summary,
    start: {
      dateTime: start,
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: end,
      timeZone: "Asia/Kolkata",
    },
  };

  const res = await calendar.events.insert({
    calendarId: "leeyounghoo85@gmail.com",   // 본인 캘린더 ID
    requestBody: event,
  });

  console.log("✅ 일정 생성 성공");
  console.log(res.data.htmlLink);
}

main().catch(console.error);

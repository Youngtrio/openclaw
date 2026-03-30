import { google } from "googleapis";

export async function getCalendarEvents() {

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials/service-account.json",
    scopes: ["https://www.googleapis.com/auth/calendar.readonly"]
  });

  const calendar = google.calendar({ version: "v3", auth });

  const res = await calendar.events.list({
    calendarId: "leeyounghoo85@gmail.com",
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime"
  });

  return res.data.items;
}


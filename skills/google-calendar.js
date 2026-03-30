import { google } from "googleapis";

export async function getTodayEvents() {

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials/service-account.json",
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  const calendar = google.calendar({ version: "v3", auth });

  const res = await calendar.events.list({
    calendarId: "primary",
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });

  return res.data.items.map(e => ({
    title: e.summary,
    start: e.start?.dateTime || e.start?.date
  }));

}


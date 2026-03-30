import { google } from "googleapis";

async function testCalendar() {
  try {
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

    console.log("Events:");
    console.log(res.data.items);

  } catch (error) {
    console.error("Error:", error);
  }
}

testCalendar();


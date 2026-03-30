import { sendMail } from "./gmail-send.js";
import { getCalendarEvents } from "./calendar-read.js";

async function runAgent() {

  const events = await getCalendarEvents();

  let summary = "Today's upcoming events\n\n";

  for (const e of events) {

    const start =
      e.start.dateTime || e.start.date;

    summary += `${start} - ${e.summary}\n`;
  }

  await sendMail(
    "Daily Calendar Summary",
    summary
  );
}

runAgent();


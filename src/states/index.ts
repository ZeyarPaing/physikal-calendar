import { $Storage } from "@/utils";
import { format, subDays } from "date-fns";
import { createEffect, createSignal } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";

const currentDate = $Storage.get("CURRENT_DATE");
export const [dateState, setDateState] = createSignal<Date>(
  currentDate ? new Date(currentDate) : new Date()
);

export const getMonthName = () =>
  new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    new Date(dateState().getFullYear(), dateState().getMonth(), 1)
  );

export const switchMonth = (type: "next" | "prev") => {
  // set datestate to plus one month next
  const year = dateState().getFullYear();
  const month = dateState().getMonth();
  if (type === "next") {
    setDateState(new Date(year, month + 1, 1));
  } else {
    setDateState(new Date(year, month - 1, 1));
  }
  $Storage.store("CURRENT_DATE", dateState().toISOString());
};

export const [monthEvents, setMonthEvents] = createStore<MonthEvents>(
  $Storage.get("EVENTS") ?? {}
);

// export const updateMonthEvents = (
//   ...args: Parameters<SetStoreFunction<MonthEvents>>
// ) => {
//   setMonthEvents(...args);
// };

export const getDaysInMonth = (): { date: Date; events: CEvent[] }[] => {
  const year = dateState().getFullYear();
  const month = dateState().getMonth();
  const date = new Date(year, month, 1);
  let calDays: { date: Date; events: CEvent[] }[] = [];
  let prevMonthDayLength = date.getDay();
  if (prevMonthDayLength) {
    let prevMonth = new Date(year, month, 1);
    for (let i = prevMonthDayLength; i >= 1; i--) {
      calDays.push({ date: subDays(prevMonth, i), events: [] });
    }
  }
  while (date.getMonth() === month) {
    const events = monthEvents[format(date, "yyyy-MM-dd")];
    calDays.push({ date: new Date(date), events: events ?? [] });
    date.setDate(date.getDate() + 1);
  }
  return calDays;
};

export function updateAllColors() {
  const events = $Storage.get("EVENTS") ?? {};
  const newEvents = Object.keys(events).reduce((acc, key) => {
    acc[key] = events[key].map((event: CEvent) => {
      return event.color === "rgb(248 113 113)"
        ? { ...event, color: "rgb(230 80 80)" }
        : event;
    });
    return acc;
  }, {} as MonthEvents);
  console.log("newEvents: ", newEvents);
  setMonthEvents(newEvents);
  $Storage.store("EVENTS", newEvents);
}

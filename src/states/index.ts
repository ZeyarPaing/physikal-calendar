import { createSignal } from "solid-js";

export const [dateState, setDateState] = createSignal(new Date());

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
};

export const getDaysInMonth = () => {
  const year = dateState().getFullYear();
  const month = dateState().getMonth();
  const date = new Date(year, month, 1);
  let days: Date[] = [];
  let prevMonthDayLength = date.getDay();
  if (prevMonthDayLength) {
    let prevMonth = new Date(year, month, 1);
    for (let i = 1; i < prevMonthDayLength + 1; i++) {
      prevMonth.setDate(date.getDate() - i);
      days.push(new Date(prevMonth));
    }
  }
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

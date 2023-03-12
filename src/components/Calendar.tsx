import { weekDays } from "@/utils";
import { Component, For } from "solid-js";
import calendarBg from "@/assets/calendar-bg.jpg";
import { format, isSameMonth } from "date-fns";
import { dateState, getDaysInMonth, getMonthName, monthEvents } from "@/states";
import { setEventForm } from "@/views/EventForm";

const Calendar: Component = () => {
  return (
    <>
      <div
        id="calendar-view"
        class="w-full relative aspect-[1/0.8] bg-slate-600"
      >
        {/* //aspect-[8.5/11] */}
        {/* <div class="absolute w-full h-full object-cover">
          <img class="w-full h-full" src={calendarBg} alt="bg" />
        </div> */}
        <div class="absolute w-full h-full dark:bg-gray-900 bg-gray-200"></div>
        <div class="absolute w-full h-full flex flex-col justify-end">
          <section class="flex flex-col dark:text-white text-black p-10">
            <h2 class="text-2xl">{dateState().getFullYear()}</h2>
            <h1 class="text-4xl font-bold">{getMonthName()}</h1>
            <section class="mt-4 w-full bg-gray-400/30 rounded-xl shadow-lg overflow-hidden">
              <section class="weekname grid grid-cols-7 text-center bg-gray-400/30 dark:bg-gray-800/40">
                {weekDays.map((day) => (
                  <div class="[&:not(:last-child)]:border-r border-gray-400/70 border-b  p-4">
                    <p class="font-bold">{day.en}</p>
                    <p class="font-extralight text-sm">{day.mm}</p>
                  </div>
                ))}
              </section>
              <section class="grid grid-cols-7 text-center">
                <For each={getDaysInMonth()}>
                  {(day) => (
                    <div class="h-24 px-2 py-1 border-b border-b-gray-400/70 [&:not(:nth-child(7n))]:border-r border-r-gray-400/70">
                      <p
                        class={`text-right ${
                          isSameMonth(dateState(), day.date)
                            ? " text-black dark:text-white"
                            : "text-gray-400"
                        }`}
                      >
                        {day.date.getDate()}
                      </p>
                      <div class="flex flex-col gap-1">
                        <For each={day.events}>
                          {(event) => (
                            <button
                              onClick={() => {
                                setEventForm({
                                  show: true,
                                  type: "update",
                                  event,
                                });
                              }}
                              class="bg-red-400 text-[8px] leading-4 p-1 rounded-md w-full text-left text-white"
                            >
                              <strong>{event.name} </strong>
                              <p>{event.description}</p>
                            </button>
                          )}
                        </For>
                      </div>
                    </div>
                  )}
                </For>
              </section>
            </section>
          </section>
        </div>
      </div>
    </>
  );
};

export default Calendar;

import { weekDays } from "@/utils";
import { Component } from "solid-js";
import calendarBg from "@/assets/calendar-bg.jpg";
import { dateState, getDaysInMonth, getMonthName } from "@/states";

const Calendar: Component = () => {
  return (
    <>
      <div
        id="calendar-view"
        class="w-full relative aspect-[8.5/11] bg-slate-600"
      >
        {/* //aspect-[8.5/11] */}
        <div class="absolute w-full h-full object-cover">
          <img class="w-full h-full" src={calendarBg} alt="bg" />
        </div>
        <div class="absolute w-full h-full bg-gradient-to-tr from-slate-900/50 to-indigo-900/25"></div>
        <div class="absolute w-full h-full flex flex-col justify-end">
          <section class="flex flex-col text-white p-10">
            <h2 class="text-2xl">{dateState().getFullYear()}</h2>
            <h1 class="text-4xl font-bold">{getMonthName()}</h1>
            <section class="mt-4 w-full bg-[#1d1d1dbe] rounded-xl">
              <section class="weekname grid grid-cols-7 text-center">
                {weekDays.map((day) => (
                  <div class="[&:not(:last-child)]:border-r border-r-gray-500 p-4">
                    <p class="font-bold">{day.en}</p>
                    <p class="font-extralight text-sm">{day.mm}</p>
                  </div>
                ))}
              </section>
              <section class="grid grid-cols-7 text-center">
                {getDaysInMonth().map((x) => (
                  <div class="h-24 px-2 py-1 border-y border-y-gray-500 [&:not(:nth-child(7n))]:border-r border-r-gray-500">
                    <p
                      class={`text-right ${
                        dateState().getMonth() === x.getMonth()
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                    >
                      {x.getDate()}
                    </p>
                  </div>
                ))}
              </section>
            </section>
          </section>
        </div>
      </div>
    </>
  );
};

export default Calendar;

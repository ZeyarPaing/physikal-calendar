import { colors, weekDays } from "@/utils";
import {
  Component,
  For,
  Show,
  createEffect,
  createMemo,
  createSignal,
} from "solid-js";
import calendarBg from "@/assets/bg/March.jpg";
import { format, isSameMonth } from "date-fns";
import {
  dateState,
  getDaysInMonth,
  getMonthName,
  updateAllColors,
} from "@/states";
import { setEventForm } from "@/views/EventForm";
import { events, qoutes } from "@/data.mock";
let handler = null;
async function getImageUrl(name) {
  clearTimeout(handler);
  return await new Promise<Promise<HTMLImageElement>>((resolve, reject) => {
    handler = setTimeout(() => {
      const url = new URL(`../assets/bg/${name}.jpg`, import.meta.url).href;
      let img: Promise<HTMLImageElement> = new Promise((resolve, reject) => {
        let image = new Image();
        image.src = url;
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error("could not load image"));
      });
      resolve(img);
    }, 200);
  });
}

const Calendar: Component = () => {
  const references = createMemo(() =>
    getDaysInMonth().flatMap((d) =>
      d.events.filter((e) => e.type === "reference")
    )
  );
  const [img, setImg] = createSignal<HTMLImageElement>(null);

  createEffect(() => {
    getImageUrl(getMonthName()).then((image) => {
      console.log("image : ", image);
      setImg(image);
    });
  });
  return (
    <>
      <div
        id="calendar-view"
        class="w-full relative aspect-[8.5/11] bg-slate-600"
      >
        {/* //aspect-[8.5/11] */}
        <div class="absolute w-full h-full object-cover">
          {img}
          {/* <img
            class="w-full h-full aspect-[8.5/11] "
            src={getImageUrl(getMonthName())}
            loading="lazy"
            decoding="async"
            alt="bg"
          /> */}
        </div>
        {/* <div class="absolute w-full h-full dark:bg-black/30 bg-gray-200"></div> */}
        <div class="absolute w-full h-full flex flex-col justify-end">
          <section class="flex flex-col dark:text-white text-black p-10">
            <div class="flex justify-between items-center">
              <div
                class="text-xl text-yellow-300 max-w-[65%] leading-8"
                style={{
                  "font-family": "Myanmar Handwriting",
                }}
              >
                “{qoutes[getMonthName()].text}”
                <Show when={qoutes[getMonthName()].author}>
                  <br />
                  <span class="block text-base text-red-500 mt-2">
                    ({qoutes[getMonthName()].author})
                  </span>
                </Show>
              </div>
              <div>
                <span class="text-[2.1rem] mr-2 font-light">
                  {dateState().getFullYear()}{" "}
                </span>
                <span class="text-4xl font-bold">{getMonthName()}</span>
              </div>
            </div>
            <section class="mt-3 w-full border border-gray-400/70 bg-calendar-bg rounded-xl shadow-lg overflow-hidden">
              {/* dark:bg-calendar-head */}
              <section class="weekname grid grid-cols-7 text-center bg-black/30 ">
                {weekDays.map((day) => (
                  <div class="[&:not(:last-child)]:border-r border-gray-400/70 border-b p-2.5">
                    <p class="font-bold text-sm">{day.en}</p>
                    <p class="font-extralight text-xs">{day.mm}</p>
                  </div>
                ))}
              </section>
              <section class="grid grid-cols-7 text-center">
                <For each={getDaysInMonth()}>
                  {(day) => (
                    <div
                      onClick={() => {
                        // !day.events.length &&
                        setEventForm({
                          show: true,
                          type: "create",
                          event: {
                            id: Date.now(),
                            name: "",
                            date: format(day.date, "yyyy-MM-dd"),
                            color: colors.red,
                          },
                        });
                      }}
                      class={`h-[5.5rem] ${
                        !day.events?.length ? "hover:bg-gray-300/10" : ""
                      } relative p-0.5 border-b border-b-gray-400/70 [&:not(:nth-child(7n))]:border-r border-r-gray-400/70`}
                    >
                      <p
                        class={`absolute left-0.5 text-left text-sm pr-0.5 pb-0.5 ${
                          isSameMonth(dateState(), day.date)
                            ? " text-black dark:text-white"
                            : "text-gray-400"
                        }`}
                      >
                        {day.date.getDate()}
                      </p>
                      <div class="text-left ml-5 -mt-1">
                        <For each={day.events}>
                          {(event) => (
                            <button
                              onClick={(e) => {
                                setEventForm({
                                  show: true,
                                  type: "update",
                                  event,
                                });
                                e.stopPropagation();
                              }}
                              style={{ "--evt-color": event.color }}
                              class={
                                "text-[8px] leading-[0.8rem] px-1.5 py-1 rounded-md w-full text-left hover:opacity-80" +
                                (event.type === "outline" ||
                                event.type === "reference"
                                  ? " text-[var(--evt-color)] bg-transparent border border-[var(--evt-color)]"
                                  : " text-white bg-[var(--evt-color)]") +
                                " " +
                                (event.type === "reference"
                                  ? "border-dashed w-fit inline mr-1"
                                  : "")
                              }
                            >
                              <Show
                                when={event.type === "reference"}
                                fallback={
                                  <>
                                    <p class="font-semibold">{event.name} </p>
                                    <p class="font-light text-[7px]">
                                      {event.description}
                                    </p>
                                  </>
                                }
                              >
                                အညွှန်း {day.date.getDate()} - {event.refNumber}
                              </Show>
                            </button>
                          )}
                        </For>
                      </div>
                    </div>
                  )}
                </For>
              </section>
              <Show when={references().length}>
                <section class="py-2 px-4">
                  <p class="text-sm">အညွှန်းများ</p>
                  <div class="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                    <For each={references()}>
                      {(event) => (
                        <div style={{ "--evt-color": event.color }}>
                          <span class="text-[10px] mr-2 border border-dashed rounded-md p-1 text-[var(--evt-color)] border-[var(--evt-color)]">
                            အညွှန်း {event.date.split("-")[2]}-{event.refNumber}
                          </span>
                          <span class="text-[10px]">{event.name}</span>
                        </div>
                      )}
                    </For>
                  </div>
                </section>
              </Show>
            </section>
          </section>
        </div>
      </div>
    </>
  );
};

export default Calendar;

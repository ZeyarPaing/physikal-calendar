import Button from "@/components/Button";
import Input from "@/components/Input";
import RadioGroup from "@/components/RadioGroup";
import Select from "@/components/Select";
import { setMonthEvents } from "@/states";
import { $Storage, colors } from "@/utils";
import { Component, Show, createEffect, createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";

type EventForm = {
  show: boolean;
  type: "create" | "update";
  event?: CEvent;
};

export const [eventForm, setEventForm] = createStore<EventForm>({
  show: false,
  type: "create",
});

const EventForm: Component<{}> = (props) => {
  let eventDate: string;
  function handleChange(e) {
    if (e.target.name === "date" && !eventDate) {
      eventDate = eventForm.event.date;
    }
    // @ts-ignore
    setEventForm((form) => ({
      ...form,
      event: {
        ...form.event,
        [e.target.name]: e.target.value,
      },
    }));
  }

  const handleEsc = (e) => {
    e.code === "Escape" && closeForm();
  };

  createEffect(() => {
    if (eventForm.show) {
      window.addEventListener("keydown", handleEsc);
    } else {
      window.removeEventListener("keydown", handleEsc);
    }
  });

  function deleteEvent() {
    setMonthEvents((evnts) => {
      const events = { ...evnts };
      events[eventForm.event.date] = events[eventForm.event.date].filter(
        (x) => x.id !== eventForm.event?.id
      );
      $Storage.store("EVENTS", events);
      return events;
    });
    closeForm();
  }

  function updateEvent() {
    setMonthEvents((evts) => {
      const events = { ...evts };
      let monthEvents = [...(events[eventForm.event?.date] ?? [])];
      let prevMonth = [...(events[eventDate] ?? [])];
      let eventIdx = monthEvents.findIndex(
        (evt) => evt.id === eventForm.event.id
      );
      if (eventIdx !== -1) {
        monthEvents[eventIdx] = {
          ...eventForm.event,
          id: Date.now(),
        };
      } else {
        prevMonth = prevMonth.filter(
          (month) => month.id !== eventForm.event.id
        );
        monthEvents[0] = {
          ...eventForm.event,
        };
      }
      console.log("ed :", eventDate, "cd : ", eventForm.event.date);
      events[eventDate] = prevMonth;
      events[eventForm.event?.date] = monthEvents;
      $Storage.store("EVENTS", events);
      return events;
    });
  }

  function createEvent() {
    setMonthEvents((evts) => {
      let events = structuredClone(evts);
      let monthEvents = [...(events[eventForm.event?.date] ?? [])];
      monthEvents.push({ ...eventForm.event, id: Date.now() });
      events[eventForm.event?.date] = monthEvents;
      console.log("events : ", monthEvents);
      $Storage.store("EVENTS", events);
      return events;
    });
  }

  function mutateEvent(e) {
    e.preventDefault();
    if (eventForm.type === "create") createEvent();
    else updateEvent();
    closeForm();
  }

  function closeForm() {
    setEventForm({ show: false, type: "create", event: undefined });
    eventDate = "";
  }

  return (
    <Show when={eventForm.show}>
      <section
        onClick={(e) => {
          e.currentTarget === e.target && closeForm();
        }}
        class="fixed inset-0 bg-black/30 z-50 grid place-items-center h-screen overflow-y-auto"
      >
        <form
          onChange={handleChange}
          onSubmit={mutateEvent}
          class="bg-white rounded-lg p-6 max-w-lg w-full"
        >
          <div class="flex justify-between">
            <h2 class="font-bold text-lg">
              {eventForm.type === "create" ? "Add event" : "Edit event"}
            </h2>
            <button
              accessKey="esc"
              type="reset"
              class="scale-y-75"
              onClick={closeForm}
            >
              X
            </button>
          </div>
          <Input value={eventForm.event?.name} label="Event name" name="name" />
          <Input
            value={eventForm.event?.description}
            label="Description"
            name="description"
          />
          <Input
            value={eventForm.event?.date}
            label="Date"
            name="date"
            type="date"
          />
          <Select
            label="Type"
            name="type"
            value={eventForm.event?.type}
            options={[
              {
                label: "Normal",
                value: "normal",
              },
              {
                label: "Outline",
                value: "outline",
              },
              {
                label: "Reference",
                value: "reference",
              },
            ]}
          />
          <Show when={eventForm.event?.type === "reference"}>
            <Input
              value={eventForm.event?.refNumber}
              name="refNumber"
              label="Reference number"
            />
          </Show>

          <RadioGroup
            name="color"
            label="Color"
            value={eventForm.event?.color}
            options={[
              {
                value: colors.red,
                label: (
                  <div class="bg-red-400 rounded-md px-1 text-sm text-white">
                    Red
                  </div>
                ),
              },
              {
                value: colors.green,
                label: (
                  <div class="bg-amber-400 rounded-md px-1 text-sm text-white">
                    Amber
                  </div>
                ),
              },
              {
                value: colors.blue,
                label: (
                  <div class="bg-blue-500 rounded-md px-1 text-sm text-white">
                    Blue
                  </div>
                ),
              },
            ]}
          />
          <Show when={eventForm.type === "update"}>
            <>
              {(() => {
                const [confirm, setConfirm] = createSignal(false);
                return (
                  <Button
                    class="w-full mt-5 text-red-500 border-current"
                    variant="outline"
                    type="button"
                    onClick={() => {
                      if (confirm()) deleteEvent();
                      else setConfirm(true);
                    }}
                  >
                    {confirm() ? "Are you sure ? Yes, delete" : "Delete"}
                  </Button>
                );
              })()}
            </>
          </Show>
          <Button type="submit" class="w-full mt-3">
            {eventForm.type === "create" ? "Add" : "Save"}
          </Button>
        </form>
      </section>
    </Show>
  );
};

export default EventForm;

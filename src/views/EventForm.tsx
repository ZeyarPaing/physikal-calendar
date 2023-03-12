import Button from "@/components/Button";
import Input from "@/components/Input";
import { monthEvents, setMonthEvents } from "@/states";
import { $Storage } from "@/utils";
import { Component, Show } from "solid-js";
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
  function handleChange(e) {
    // @ts-ignore
    setEventForm((form) => ({
      ...form,
      event: {
        ...form.event,
        [e.target.name]: e.target.value,
      },
    }));
  }

  function closeForm() {
    setEventForm({ show: false, type: "create" });
  }
  return (
    <Show when={eventForm.show}>
      <section class="fixed inset-0 bg-black/30 z-50 grid place-items-center h-screen overflow-y-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setMonthEvents((evts) => {
              const events = { ...evts };
              let monthEvents = [...(events[eventForm.event.date] ?? [])];
              if (eventForm.type === "update") {
                let eventIdx = monthEvents.findIndex(
                  (evt) => evt.id === eventForm.event.id
                );
                monthEvents[eventIdx] = { ...eventForm.event, id: Date.now() };
              } else {
                monthEvents.push({ ...eventForm.event, id: Date.now() });
              }
              events[eventForm.event.date] = monthEvents;
              $Storage.store("EVENTS", events);
              return events;
            });
            closeForm();
          }}
          class="bg-white rounded-lg p-6 max-w-lg w-full"
        >
          <div class="flex justify-between">
            <h2 class="font-bold text-lg">
              {eventForm.type === "create" ? "Add event" : "Edit event"}
            </h2>
            <button
              class=" scale-y-75"
              onClick={() => setEventForm((form) => ({ ...form, show: false }))}
            >
              X
            </button>
          </div>
          <Input
            value={eventForm.event?.name}
            label="Event name"
            name="name"
            onInput={handleChange}
          />
          <Input
            value={eventForm.event?.description}
            label="Description"
            name="description"
            onInput={handleChange}
          />
          <Input
            value={eventForm.event?.date}
            label="Date"
            name="date"
            type="date"
            onInput={handleChange}
          />
          <Show when={eventForm.type === "update"}>
            <Button
              class="w-full mt-5 text-red-500 border-current"
              variant="outline"
              type="button"
              onClick={() => {
                setMonthEvents((evnts) => {
                  const events = { ...evnts };
                  events[eventForm.event.date] = events[
                    eventForm.event.date
                  ].filter((x) => x.id !== eventForm.event.id);
                  $Storage.store("EVENTS", events);
                  return events;
                });
                closeForm();
              }}
            >
              Delete
            </Button>
          </Show>
          <Button type="submit" class="w-full mt-1">
            {eventForm.type === "create" ? "Add" : "Save"}
          </Button>
        </form>
      </section>
    </Show>
  );
};

export default EventForm;

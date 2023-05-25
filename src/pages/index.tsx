import ChevronRight from "@/assets/chevron-right";
import Calendar from "@/components/Calendar";
import {
  getMonthName,
  switchMonth,
  dateState,
  updateAllColors,
} from "@/states";
import { Component, createSignal } from "solid-js";
import { toJpeg, toPng } from "html-to-image";
import Button from "@/components/Button";
import EventForm, { setEventForm } from "@/views/EventForm";

const Home: Component = () => {
  const [isExporting, setExproting] = createSignal(false);
  let bgInput: HTMLInputElement;
  return (
    <section class="mb-10">
      <h1 class="text-2xl text-center font-bold my-6">Physikal Calendar</h1>
      <EventForm />
      <section class="flex justify-between items-center mb-5">
        <div class="flex items-center border border-gray-400 rounded-lg">
          <button
            onClick={() => {
              switchMonth("prev");
            }}
            class="px-3 py-2"
          >
            <span class="rotate-180 block">
              <ChevronRight />
            </span>
          </button>
          <h3 class="font-semibold w-28 text-center border-x border-gray-400 py-2">
            {getMonthName()}
          </h3>
          <button
            onClick={() => {
              switchMonth("next");
            }}
            class="px-3 py-2"
          >
            <ChevronRight />
          </button>
        </div>
        {/* <div>
          <input
            onInput={(e) => console.log("e . :", bgInput.files[0])}
            ref={bgInput}
            hidden
            type="file"
            accept="image/*"
          />
          <Button onClick={() => bgInput.click()} variant="outline">
            Background image
          </Button>
        </div> */}
        <div>
          <Button onClick={() => setEventForm({ show: true, type: "create" })}>
            + Add event
          </Button>
        </div>
      </section>
      <Calendar />
      <Button
        class="mt-4"
        loading={isExporting()}
        onClick={() => {
          setExproting(true);
          toJpeg(document.getElementById("calendar-view"), {
            quality: 1,
            canvasWidth: 2550,
            canvasHeight: 3300,
          }).then(function (dataUrl) {
            const link = document.createElement("a");
            link.download = `${dateState().getFullYear()}-${getMonthName()}.jpg`;
            link.href = dataUrl;
            link.click();
            setExproting(false);
          });
        }}
      >
        Export
      </Button>
      {/* <button onClick={updateAllColors}>Update color</button> */}
    </section>
  );
};

export default Home;

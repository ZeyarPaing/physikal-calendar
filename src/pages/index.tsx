import ChevronRight from "@/assets/chevron-right";
import Calendar from "@/components/Calendar";
import { getMonthName, switchMonth, dateState } from "@/states";
import { Component, createSignal } from "solid-js";
import { toPng } from "html-to-image";
import Button from "@/components/Button";

const Home: Component = () => {
  const [isExporting, setExproting] = createSignal(false);
  return (
    <section class="mb-10">
      <h1 class="text-2xl font-bold my-4">Physikal Calendar</h1>
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
        <div>
          <Button>+ Add event</Button>
        </div>
      </section>
      <Calendar />
      <Button
        class="mt-4"
        loading={isExporting()}
        onClick={() => {
          setExproting(true);
          toPng(document.getElementById("calendar-view"), {
            quality: 1,
            canvasWidth: 2550,
            canvasHeight: 3300,
          }).then(function (dataUrl) {
            const link = document.createElement("a");
            link.download = `${dateState().getFullYear()}-${getMonthName()}.png`;
            link.href = dataUrl;
            link.click();
            setExproting(false);
          });
        }}
      >
        Export
      </Button>
    </section>
  );
};

export default Home;

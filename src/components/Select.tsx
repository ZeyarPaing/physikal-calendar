import { Component, For, JSX } from "solid-js";

type Props = JSX.InputHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  menuItems: {
    label: string;
    value: string;
  }[];
};
const Select: Component<Props> = (props) => {
  return (
    <div class="py-1">
      <label>
        <p class="text-sm mb-1">{props.label}</p>
        <select
          class="w-full border border-gray-300 rounded-md px-3 py-2"
          {...props}
        >
          <For each={props.menuItems}>
            {(menu) => <option value={menu.value}>{menu.label}</option>}
          </For>
        </select>
      </label>
    </div>
  );
};

export default Select;

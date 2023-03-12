import { Component, JSX } from "solid-js";

type Props = JSX.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};
const Input: Component<Props> = (props) => {
  return (
    <div class="py-1">
      <label>
        <p class="text-sm mb-1">{props.label}</p>
        <input
          class="w-full border border-gray-300 rounded-md px-3 py-2"
          {...props}
        />
      </label>
    </div>
  );
};

export default Input;

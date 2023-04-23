import { Component, For, JSX } from "solid-js";

type Props = JSX.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  options: {
    label: JSX.Element | string;
    value: string;
  }[];
};
const RadioGroup: Component<Props> = (props) => {
  return (
    <div class="py-1">
      <fieldset>
        <p class="text-sm mb-1">{props.label}</p>
        <div class="flex gap-3">
          <For each={props.options}>
            {(option) => (
              <label class="flex flex-row-reverse gap-1 items-center">
                <span>{option.label}</span>
                <input
                  {...props}
                  checked={props.value === option.value}
                  value={option.value}
                  type="radio"
                />
              </label>
            )}
          </For>
        </div>
      </fieldset>
    </div>
  );
};

export default RadioGroup;

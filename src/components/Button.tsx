import { Component, JSX, Show } from "solid-js";
import Spinner from "./Spinner";

type Props = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};
const Button: Component<Props> = (props) => {
  const { class: className, ...rest } = props;
  return (
    <button
      class={
        "px-5 py-2 rounded-lg bg-primary text-white hover:bg-primary-light active:bg-primary-dark " +
        className
      }
      {...rest}
    >
      <div class="flex items-center justify-center space-x-3">
        <span>{props.children}</span>
        <Show when={props.loading}>
          <Spinner class="text-primary fill-blue-300" />
        </Show>
      </div>
    </button>
  );
};

export default Button;

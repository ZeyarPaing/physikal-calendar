import Loading from "@/components/Loading";
import { Component, Suspense } from "solid-js";

const $Loadable: <T>(
  AsyncComponent: Component<T> & {
    preload: () => Promise<{
      default: Component<T>;
    }>;
  }
) => Component<T> = (AsyncComponent) => (props) => {
  return (
    <Suspense fallback={<Loading />}>
      <AsyncComponent {...props} />
    </Suspense>
  );
};

export default $Loadable;

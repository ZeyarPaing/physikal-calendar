import { Component, lazy } from "solid-js";
import Footer from "@/components/layout/Footer";
import { Route, Router, Routes } from "@solidjs/router";
import $Loadable from "@/components/$Loadable";

const Home = $Loadable(lazy(() => import("@/pages/index")));

const App: Component = () => {
  return (
    <Router>
      <main class="min-h-screen fluidContainer text-dark dark">
        <Routes>
          <Route path="/" component={Home} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import pages from "./pages";

function App() {
  console.log(pages);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          {pages.map((page) => {
            return (
              <Route
                key={page.path}
                path={page.path}
                element={<page.Component />}
                exact
              ></Route>
            );
          })}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;

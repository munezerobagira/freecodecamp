import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import pages from "./pages";

function App() {
  return (
    <>
      <div className="container">
        <Navbar />
        <main>
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
        </main>
      </div>
    </>
  );
}

export default App;

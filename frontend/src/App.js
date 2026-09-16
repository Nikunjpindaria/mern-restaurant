import "./App.css";
import Header from "./component/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDataProduct } from "./redux/productSlide";
import Footer from "./component/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const domain = process.env.REACT_APP_SERVER_DOMIN;
        if (!domain) {
          console.warn("REACT_APP_SERVER_DOMIN environment variable is not defined!");
          return;
        }
        const res = await fetch(`${domain}/product`);
        if (res.ok) {
          const resData = await res.json();
          dispatch(setDataProduct(resData));
        }
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    })();
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;

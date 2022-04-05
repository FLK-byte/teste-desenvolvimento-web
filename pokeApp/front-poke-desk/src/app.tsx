import {Home} from "./Pages/Home/home";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

export function App() {
  return(
    <>
      <Home />
      <ToastContainer />

    </>
  );
}

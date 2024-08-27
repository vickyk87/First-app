import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import React, { useState } from "react";
import Alert from "./components/Alert";
// import Crud from "./components/Crud";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    // setTimeout(() => {
    //   setAlert(null);
    // }, 1500);
  };

  const removeBodyClasses = () => {
    document.body.classList.remove("bg-light");
    document.body.classList.remove("bg-dark");
    document.body.classList.remove("bg-warning");
    document.body.classList.remove("bg-success");
    document.body.classList.remove("bg-danger");
    // document.body.classList.add("bg-light");
  };

  const toggleMode = (cls) => {
    removeBodyClasses();
    // console.log(cls);
    document.body.classList.add("bg-" + cls);
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#042743";
      // showAlert("Dark Mode Has Been Activated", "success");
      // document.title = "Vicky - Dark Mode";
      // setInterval(() => {
      //   document.title = "Vicky - Is Amazing";
      // }, 2000);
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      // showAlert("Normal Mode Has Been Activated", "success");
      // document.title = "Vicky - Light Mode";
      // setInterval(() => {
      //   document.title = "Vicky - Is Good";
      // }, 1500);
    }
  };

  return (
    <>
      {/* <Navbar title="Vicky" aboutText="About Us" contactText="Contact Us" /> */}
      <Router>
        <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path="/about" element={<About mode={mode} />} />
            <Route
              exact
              path="/"
              element={
                <TextForm
                  heading="Try Textutils - Word Counter, Character Counter, Removed Extra Spaces, Copy Text"
                  mode={mode}
                  showAlert={showAlert}
                />
              }
            />
            <Route exact path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
      {/* {<Crud />} */}
    </>
  );
}

export default App;

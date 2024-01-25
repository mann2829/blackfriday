import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { useState } from "react";

function App() {
  const [isCountdown, setIsCountDown] = useState(false);
  const [eventName, setEventName] = useState("");
  const handleFooter = (countdown) => {
    setIsCountDown(countdown);
  };
  const handleEventType = (name) => {
    setEventName(name);
  };
  return (
    <>
      <Header eventName={eventName} />
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              handleFooter={handleFooter}
              handleEventType={handleEventType}
            />
          }
        />
      </Routes>
      {isCountdown && <Footer />}
    </>
  );
}

export default App;

import "./App.css";
import Form from "./components/Form";
import Canvas from "./components/Canvas";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [overlayOptions, setOverlayOptions] = useState({});
  return (
    <div className="App">
      <Header />
      <Form onOverlay={setOverlayOptions} />
      <Canvas {...overlayOptions} />
      <Footer />
    </div>
  );
}

export default App;

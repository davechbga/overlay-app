import "./App.css";
import Form from "./components/Form";
import Canvas from "./components/Canvas";
import { useState } from "react";
import Header from "./components/Header";

function App() {
  const [overlayOptions, setOverlayOptions] = useState({});
  return (
    <div className="App">
      <Header />
      <Form onOverlay={setOverlayOptions} />
      <Canvas {...overlayOptions} />
    </div>
  );
}

export default App;

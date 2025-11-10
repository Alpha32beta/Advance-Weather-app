import { useState } from "react"
import Header from "./components/Header"
import MainContent from "./components/MainContent"
import { imperialContext } from "./context/imperialContext";

function App() {
  const [imperial, setImperial] = useState(true);
  return <imperialContext.Provider value={{ imperial, setImperial }} >
    <div className="m-8 mx-auto max-w-[1200px]">
      <Header />
      <MainContent />
    </div>
  </imperialContext.Provider>
}

export default App

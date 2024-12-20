import './App.css'
import '@mantine/core/styles.css';
import {MantineProvider} from "@mantine/core";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <MantineProvider>
        <Routes>
            <Route path="/" element={<div>Home page</div>}/>
            <Route path="/support" element={<div>Support page</div>}/>
        </Routes>
    </MantineProvider>
  )
}

export default App

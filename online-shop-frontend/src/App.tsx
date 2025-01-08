import './App.css'
import '@mantine/core/styles.css';
import {MantineProvider} from "@mantine/core";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/common/layout";

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<div>Store page</div>}></Route>
                <Route path="/community" element={<div>Community page</div>}/>
                <Route path="/library" element={<div>Library page</div>}/>
                <Route path="/profile" element={<div>Profile page</div>}/>
                <Route path="/support" element={<div>Support page</div>}/>
                <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Route>
        </Routes>
    </MantineProvider>
  )
}

export default App

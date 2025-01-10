import './App.css'
import '@mantine/core/styles.css';
import {MantineProvider, createTheme} from "@mantine/core";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/common/layout";
import PageNotFound from "./pages/pagenotfound";

function App() {
    const theme = createTheme({
        primaryColor: "main_color",
        colors: {
            "main_color": [
                "#ffeaeb",
                "#fdd6d6",
                "#f1abac",
                "#e67e7e",
                "#dd5858",
                "#d83f3f",
                "#d63232",
                "#be2425",
                "#aa1c20",
                "#961119"
            ]
        }
    });

    return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<div>Store page</div>}></Route>
                <Route path="/community" element={<div>Community page</div>}/>
                <Route path="/library" element={<div>Library page</div>}/>
                <Route path="/profile" element={<div>Profile page</div>}/>
                <Route path="/support" element={<div>Support page</div>}/>
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    </MantineProvider>
  )
}

export default App;

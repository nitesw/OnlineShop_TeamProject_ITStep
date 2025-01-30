import './App.css'
import '@mantine/core/styles.css';
import {MantineProvider, createTheme} from "@mantine/core";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/common/layout";
import PageNotFound from "./pages/pagenotfound";
import LoginPage from "./pages/login_page";
import SignupPage from "./pages/signup_page";
import ForgotPasswordPage from "./pages/forgot_password_page";
import SupportPage from "./pages/support_page";
import AboutPage from "./pages/about_page";

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
                <Route index element={<div>Store page</div>} />
                <Route path="/wishlist" element={<div>Wishlist page</div>} />
                <Route path="/news" element={<div>News page</div>} />
                <Route path="/stats" element={<div>Stats page</div>} />
                <Route path="/community" element={<div>Community page</div>} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/library" element={<div>Library page</div>} />
                <Route path="/profile" element={<div>Profile page</div>} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    </MantineProvider>
  )
}

export default App;

import Footer from "./footer.tsx";
import {Flex} from "@mantine/core";
import classes from './css/layout.module.css';
import Header from "./header.tsx";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <Flex
            direction="column"
            className={classes.height}
        >
            <Header />
            <div className={classes.content}>
                <Outlet />
            </div>
            <Footer />
        </Flex>
    )
}

export default Layout;
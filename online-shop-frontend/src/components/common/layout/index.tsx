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
                <div style={{width:'100%', margin:"40px 0px"}}>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </Flex>
    )
}

export default Layout;
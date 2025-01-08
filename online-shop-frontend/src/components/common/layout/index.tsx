import Footer from "./footer.tsx";
import {Flex} from "@mantine/core";
import classes from './css/layout.module.css';

const Layout = () => {
    return (
        <Flex
            direction="column"
            className={classes.height}
        >
            <div>header</div>
            <div>content</div>
            <Footer />
        </Flex>
    )
}

export default Layout;
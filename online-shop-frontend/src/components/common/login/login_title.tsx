import {Anchor, Text, Title} from "@mantine/core";
import classes from "./css/login.module.css";
import {Link} from "react-router-dom";

const LoginTitle = () => {
    return (
        <>
            <Title ta="center" className={classes.title}>
                Welcome back!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{" "}
                <Link to="/signup" className={classes.link}>
                    <Anchor size="sm" component="button">
                       Create account
                    </Anchor>
                </Link>
            </Text>
        </>
    )
}

export default LoginTitle;
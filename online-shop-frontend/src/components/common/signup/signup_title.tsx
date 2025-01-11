import { Anchor, Text, Title } from "@mantine/core";
import classes from "./css/signup.module.css";
import {Link} from "react-router-dom";

const SignupTitle = () => {
    return (
        <>
            <Title ta="center" className={classes.title}>
                Join Us!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Already have an account?{" "}
                <Link to="/login" className={classes.link}>
                    <Anchor size="sm" component="button">
                        Log in
                    </Anchor>
                </Link>
            </Text>
        </>
    );
};

export default SignupTitle;

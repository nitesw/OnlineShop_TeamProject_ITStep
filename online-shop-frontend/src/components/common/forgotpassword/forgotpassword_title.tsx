import {Text, Title} from "@mantine/core";
import classes from './css/forgotpassword.module.css';

const ForgotPasswordTitle = () => {
    return(
        <>
            <Title className={classes.title} ta="center">
                Forgot your password?
            </Title>
            <Text c="dimmed" fz="sm" ta="center">
                Enter your email to get a reset link
            </Text>
        </>
    )
}

export default ForgotPasswordTitle;
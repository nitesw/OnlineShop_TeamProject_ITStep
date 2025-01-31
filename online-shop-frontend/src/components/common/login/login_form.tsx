import {Anchor, Button, Checkbox, Group, Paper, PasswordInput, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {Link, useNavigate} from "react-router-dom";
import classes from "./css/login.module.css";
import {LoginFormFields} from "../../../models/accounts.ts";
import {useUserLoginMutation} from "../../../services/api.users.service.ts";
import {accountService} from "../../../services/account.service.ts";
import {notifications} from "@mantine/notifications";
import {IconCheck, IconX} from "@tabler/icons-react";
import {tokenService} from "../../../services/token.service.ts";
import {setAccount} from "../../../redux/account/accountSlice.ts";
import {useDispatch} from "react-redux";
import {APIError} from "../../../models/errors.ts";

const LoginForm = () => {
    const [userLogin] = useUserLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const form = useForm<LoginFormFields>({
        mode: "uncontrolled",
        initialValues: {username: "", password: "", rememberMe: false},
        validate: {
            username: (value) => (value.length > 3 ? null : "Username must be at least 4 characters long"),
            password: (value) =>
                /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}[\]:;"'<>,.?/\\|-]{8,}$/.test(value)
                    ? null
                    : "Password must be at least 8 characters long, include one uppercase letter, one number, and may contain special characters.",
        },
    });

    const handleLogin = async (values: LoginFormFields) => {
        try {
            const response = await userLogin(values).unwrap();
            if (response.access) {
                const rememberMe = form.getValues().rememberMe!;
                accountService.login(response.access, response.refresh, rememberMe);
                notifications.show({
                    title: "Success",
                    icon: <IconCheck />,
                    position: "top-center",
                    message: "Successfully logged in!",
                    color: "green",
                    autoClose: 1500,
                    withCloseButton: false
                });
                navigate("/");
                const payload = tokenService.getPayload();
                if (payload) dispatch(setAccount(payload));
            }
        } catch (error) {
            if (error && typeof error === 'object' && 'status' in error) {
                const apiError = error as APIError;

                if (apiError.status === 401) {
                    notifications.show({
                        title: "Error",
                        icon: <IconX />,
                        position: "top-center",
                        message: "Incorrect username or password. Please try again.",
                        color: "red",
                        autoClose: 1500,
                        withCloseButton: false
                    });
                } else {
                    notifications.show({
                        title: "Error",
                        icon: <IconX />,
                        position: "top-center",
                        message: "Something went wrong. Please try again.",
                        color: "red",
                        autoClose: 1500,
                        withCloseButton: false
                    });
                }
            } else {
                notifications.show({
                    title: "Error",
                    icon: <IconX />,
                    position: "top-center",
                    message: "An unknown error occurred.",
                    color: "red",
                    autoClose: 1500,
                    withCloseButton: false
                });
            }
        }
    };

    return (
        <>
            <form onSubmit={form.onSubmit(handleLogin)}>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput
                        label="Username"
                        placeholder="Enter your username..."
                        key={form.key("username")}
                        {...form.getInputProps("username")}
                        required
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password..."
                        key={form.key("password")}
                        {...form.getInputProps("password")}
                        required
                        mt="md"
                    />
                    <Group justify="space-between" mt="lg">
                        <Checkbox
                            label="Remember me"
                            {...form.getInputProps("rememberMe", { type: "checkbox" })}
                        />
                        <Link to="/forgotpassword" className={classes.link}>
                            <Anchor component="button" size="sm">
                                Forgot password?
                            </Anchor>
                        </Link>
                    </Group>
                    <Button fullWidth mt="xl" type="submit">
                        Sign in
                    </Button>
                </Paper>
            </form>
        </>
    );
}

export default LoginForm;
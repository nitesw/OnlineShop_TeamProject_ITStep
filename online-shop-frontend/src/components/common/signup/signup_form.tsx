import {Button, Paper, PasswordInput, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useUserRegisterMutation} from "../../../services/api.users.service.ts";
import {useNavigate} from "react-router-dom";
import {RegisterFormFields, RegisterModel} from "../../../models/accounts.ts";
import {accountService} from "../../../services/account.service.ts";
import {notifications} from "@mantine/notifications";
import {IconCheck, IconX} from "@tabler/icons-react";
import {tokenService} from "../../../services/token.service.ts";
import {setAccount} from "../../../redux/account/accountSlice.ts";
import {APIError} from "../../../models/errors.ts";

const SignupForm = () => {
    const [userRegister] = useUserRegisterMutation();
    const navigate = useNavigate();

    const form = useForm<RegisterFormFields>({
        mode: "uncontrolled",
        initialValues: { username: "", email: "", password1: "", password2: "" },
        validate: {
            username: (value) =>
                value.length > 3 ? null : "Username must be at least 4 characters long",
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",
            password1: (value) =>
                /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}[\]:;"'<>,.?/\\|-]{8,}$/.test(value)
                    ? null
                    : "Password must be at least 8 characters long, include one uppercase letter, one number, and may contain special characters.",
            password2: (value, values) =>
                value === values.password1
                    ? null
                    : "Passwords do not match",
        },
    });

    const handleRegister = async (values: RegisterFormFields) => {
        const registerData: RegisterModel = {
            username: values.username,
            email: values.email,
            password: values.password1,
        };

        try {
            const response = await userRegister(registerData).unwrap();
            if (response.message === "User registered successfully!") {
                notifications.show({
                    title: "Success",
                    icon: <IconCheck />,
                    position: "top-center",
                    message: "Successfully registered!",
                    color: "green",
                    autoClose: 1500,
                    withCloseButton: false
                });
                navigate("/login");
            }
        } catch (error) {
            if (error && typeof error === "object" && "status" in error) {
                const apiError = error as APIError;

                let errorMessage = "Something went wrong. Please try again.";

                if (apiError.status === 400 && apiError.data) {
                    if (apiError.data.username) {
                        errorMessage = "Username is already taken.";
                    } else if (apiError.data.email) {
                        errorMessage = "Email is already in use.";
                    }
                }

                notifications.show({
                    title: "Error",
                    icon: <IconX />,
                    position: "top-center",
                    message: errorMessage,
                    color: "red",
                    autoClose: 1500,
                    withCloseButton: false
                });
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
            <form onSubmit={form.onSubmit(handleRegister)}>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput label="Email"
                               placeholder="Enter your email..."
                               key={form.key('email')}
                               {...form.getInputProps('email')}
                               required />
                    <TextInput label="Username"
                               placeholder="Enter your username..."
                               key={form.key('username')}
                               {...form.getInputProps('username')}
                               required
                               mt="md" />
                    <PasswordInput label="Password"
                                   placeholder="Enter your password..."
                                   key={form.key('password1')}
                                   {...form.getInputProps('password1')}
                                   required
                                   mt="md" />
                    <PasswordInput label="Confirm Password"
                                   placeholder="Re-enter your password..."
                                   key={form.key('password2')}
                                   {...form.getInputProps('password2')}
                                   required
                                   mt="md" />
                    <Button fullWidth mt="xl" type="submit">
                        Sign in
                    </Button>
                </Paper>
            </form>
        </>
    );
}

export default SignupForm;
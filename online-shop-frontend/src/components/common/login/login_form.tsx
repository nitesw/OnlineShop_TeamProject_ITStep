import {Anchor, Button, Checkbox, Group, Paper, PasswordInput, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {Link} from "react-router-dom";
import classes from "./css/login.module.css";

const LoginForm = () => {
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {username: "", password: ""},
        validate: {
            username: (value) => (value.length > 3 ? null : "Username must be at least 4 characters long"),
            password: (value) =>
                /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
                    ? null
                    : "Password must be at least 8 characters long, include one uppercase letter and one number",
        },
    });

    return (
        <>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput label="Username"
                               placeholder="Enter your username..."
                               key={form.key('username')}
                               {...form.getInputProps('username')}
                               required />
                    <PasswordInput label="Password"
                                   placeholder="Enter your password..."
                                   key={form.key('password')}
                                   {...form.getInputProps('password')}
                                   required
                                   mt="md" />
                    <Group justify="space-between" mt="lg">
                        <Checkbox label="Remember me" />
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
import {Button, Paper, PasswordInput, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";

const SignupForm = () => {
    const form = useForm({
        mode: "uncontrolled",
        initialValues: { username: "", email: "", password1: "", password2: "" },
        validate: {
            username: (value) =>
                value.length > 3 ? null : "Username must be at least 4 characters long",
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",
            password1: (value) =>
                /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
                    ? null
                    : "Password must be at least 8 characters long, include one uppercase letter, and one number",
            password2: (value, values) =>
                value === values.password1
                    ? null
                    : "Passwords do not match",
        },
    });

    return (
        <>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
                                   placeholder="Re-enter  your password..."
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
import {Anchor, Box, Button, Center, Group, Paper, TextInput} from "@mantine/core";
import {IconArrowLeft} from "@tabler/icons-react";
import classes from './css/forgotpassword.module.css';
import {useForm} from "@mantine/form";
import {Link} from "react-router-dom";

const ForgotPasswordForm = () => {
    const form = useForm({
        mode: "uncontrolled",
        initialValues: { email: ""},
        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",
        },
    });

    return (
        <>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                    <TextInput label="Your email"
                               placeholder="Enter your email..."
                               key={form.key('email')}
                               {...form.getInputProps('email')}
                               required />
                    <Group justify="space-between" mt="lg" className={classes.controls}>
                        <Link to="/login">
                            <Anchor c="dimmed" size="sm" className={classes.control}>
                                <Center inline>
                                    <IconArrowLeft size={12} stroke={1.5} />
                                    <Box ml={5}>Back to the login page</Box>
                                </Center>
                            </Anchor>
                        </Link>
                        <Button className={classes.control} type="submit">Reset password</Button>
                    </Group>
                </Paper>
            </form>
        </>
    )
}

export default ForgotPasswordForm;
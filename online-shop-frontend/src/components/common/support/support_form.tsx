import { Button, Group, SimpleGrid, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const SupportForm = () => {
    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
        validate: {
            name: (value) =>
                value.trim().length < 2 ? "Name must be at least 2 characters long" : null,
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email address. Please enter a valid email.",
            subject: (value) =>
                value.trim().length === 0 ? "Subject cannot be empty" : null,
            message: (value) =>
                value.trim().length < 10 ? "Message must be at least 10 characters long" : null,
        },
    });

    return (
        <>
            <form onSubmit={form.onSubmit(() => {})} style={{width:'100%'}}>
                <SimpleGrid cols={{base: 1, sm: 2}} mt="xl">
                    <TextInput
                        label="Name"
                        placeholder="Your name"
                        name="name"
                        variant="filled"
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        label="Email"
                        placeholder="Your email"
                        name="email"
                        variant="filled"
                        {...form.getInputProps('email')}
                    />
                </SimpleGrid>

                <TextInput
                    label="Subject"
                    placeholder="Subject"
                    mt="md"
                    name="subject"
                    variant="filled"
                    {...form.getInputProps('subject')}
                />
                <Textarea
                    mt="md"
                    label="Message"
                    placeholder="Your message"
                    maxRows={10}
                    minRows={5}
                    autosize
                    name="message"
                    variant="filled"
                    {...form.getInputProps('message')}
                />

                <Group justify="center" mt="xl">
                    <Button type="submit" size="md">
                        Send message
                    </Button>
                </Group>
            </form>
        </>
    )
}

export default SupportForm;
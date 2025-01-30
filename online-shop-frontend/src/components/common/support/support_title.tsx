import {Title, Text} from "@mantine/core";

const SupportTitle = () => {
    return (
        <>
            <Title
                order={2}
                size="h1"
                style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
                fw={900}
                ta="center"
            >
                Get in touch
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Need help or have inquiries? Reach out to us by filling out the form below!
            </Text>
        </>
    )
}

export default SupportTitle;
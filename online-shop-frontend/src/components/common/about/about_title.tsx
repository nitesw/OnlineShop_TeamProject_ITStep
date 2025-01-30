import {Badge, Group, Title, Text} from "@mantine/core"
import classes from "./css/about.module.css";

const AboutTitle = () => {
    return (
        <>
            <Group justify="center">
                <Badge variant="filled" size="lg">
                    Welcome to Spiral
                </Badge>
            </Group>

            <Title order={2} className={classes.title} ta="center" mt="sm">
                Seamlessly connect with your favorite games and communities
            </Title>

            <Text c="dimmed" className={classes.description} ta="center" mt="md">
                Spiral is your hub for discovering, managing, and sharing games.
                While you can't play or download them here, it's the perfect place to organize your collection and connect with others who share your passion.
            </Text>

        </>
    )
}

export default AboutTitle;
import { Card, MantineTheme, Text } from "@mantine/core";
import classes from "./css/about.module.css";
import { IconProps } from '@tabler/icons-react';

interface Feature {
    title: string;
    description: string;
    icon: React.ForwardRefExoticComponent<IconProps>;
}

interface AboutCardProps {
    feature: Feature;
    theme: MantineTheme;
}

const AboutCard = ({ feature, theme }: AboutCardProps) => {
    return (
        <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
            <feature.icon size={50} stroke={2} color={theme.colors.main_color[6]} />
            <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
                {feature.title}
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
                {feature.description}
            </Text>
        </Card>
    );
};

export default AboutCard;

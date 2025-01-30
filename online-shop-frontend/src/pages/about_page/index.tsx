import {Container, SimpleGrid, useMantineTheme} from "@mantine/core";
import AboutTitle from "../../components/common/about/about_title.tsx";
import AboutCard from "../../components/common/about/about_card.tsx";
import { IconSearch, IconLock, IconUsers } from '@tabler/icons-react';

const features = [
    {
        title: 'Seamless browsing experience',
        description: 'Explore a huge catalog of games with ease and enjoy smooth navigation and fast search.',
        icon: IconSearch,
    },
    {
        title: 'Privacy-first platform',
        description: 'Your privacy matters to us. We do not share your data with third parties and ensure top-notch security.',
        icon: IconLock,
    },
    {
        title: 'Engage with the community',
        description: 'Join a dynamic community, exchange reviews, and connect with friends for game recommendations.',
        icon: IconUsers,
    },
];


const AboutPage = () => {
    const theme = useMantineTheme();
    return(
        <Container size="lg" py="xl">
            <AboutTitle />
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
                {features.map(feature => (
                    <AboutCard key={feature.title} feature={feature} theme={theme} />
                ))}
            </SimpleGrid>
        </Container>
    )
}

export default AboutPage;
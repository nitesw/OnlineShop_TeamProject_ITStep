import {
    IconChevronDown,
    IconHome,
    IconHeart, IconNews,
    IconChartBar,
} from '@tabler/icons-react';
import {
    Box,
    Burger,
    Button,
    Center,
    Collapse,
    Divider,
    Drawer,
    Group,
    HoverCard,
    ScrollArea,
    SimpleGrid,
    Text,
    ThemeIcon,
    UnstyledButton,
    useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './css/header.module.css';
import {Link} from "react-router-dom";

const mockdata = [
    {
        icon: IconHome,
        title: 'Home',
        description: 'Explore new games and updates.',
    },
    {
        icon: IconHeart,
        title: 'Wishlist',
        description: 'Track your favorite games.',
    },
    {
        icon: IconNews,
        title: 'News',
        description: 'Get the latest gaming news.',
    },
    {
        icon: IconChartBar,
        title: 'Stats',
        description: 'Check out bestsellers and game trends.',
    },
];

const Header = () => {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme = useMantineTheme();

    const links = mockdata.map((item) => (
        <Link to={item.title === "Wishlist" ? "/wishlist" : item.title === "News" ? "/news" : item.title === "Stats" ? "/stats" : "/"}>
            <UnstyledButton className={classes.subLink} key={item.title}>
                <Group wrap="nowrap" align="flex-start">
                    <ThemeIcon size={34} variant="default" radius="md">
                        <item.icon size={22} color={theme.colors.main_color[6]} />
                    </ThemeIcon>
                    <div>
                        <Text size="sm" fw={500}>
                            {item.title}
                        </Text>
                        <Text size="xs" c="dimmed">
                            {item.description}
                        </Text>
                    </div>
                </Group>
            </UnstyledButton>
        </Link>
    ));

    return (
        <Box pb={120}>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <div>Logo</div>
                    <Group h="100%" gap={0} visibleFrom="sm">
                        <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                            <HoverCard.Target>
                                <Link to="/" className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Store
                                        </Box>
                                        <IconChevronDown size={16} color={theme.colors.main_color[6]}/>
                                    </Center>
                                </Link>
                            </HoverCard.Target>

                            <HoverCard.Dropdown style={{overflow: 'hidden'}}>
                                <SimpleGrid cols={2} spacing={0}>
                                    {links}
                                </SimpleGrid>
                            </HoverCard.Dropdown>
                        </HoverCard>
                        <Link to="/community" className={classes.link}>
                            Community
                        </Link>
                        <Link to="/about" className={classes.link}>
                            About
                        </Link>
                        <Link to="/support" className={classes.link}>
                            Support
                        </Link>
                    </Group>

                    <Group visibleFrom="sm">
                        <Link to="/login">
                            <Button variant="default">Log in</Button>
                        </Link>
                        <Link to="/signup">
                            <Button>Sign up</Button>
                        </Link>
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm"/>
                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h="calc(100vh - 80px" mx="-md">
                    <Divider my="sm"/>
                    <UnstyledButton className={classes.link} onClick={toggleLinks}>
                        <Center inline>
                            <Box component="span" mr={5}>
                                Store
                            </Box>
                            <IconChevronDown size={16} color={theme.colors.main_color[6]}/>
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{links}</Collapse>
                    <Link to="/community" className={classes.link}>
                        Community
                    </Link>
                    <Link to="/about" className={classes.link}>
                        About
                    </Link>
                    <Link to="/support" className={classes.link}>
                        Support
                    </Link>

                    <Divider my="sm"/>

                    <Group justify="center" grow pb="xl" px="md">
                        <Link to="/login">
                            <Button variant="default">Log in</Button>
                        </Link>
                        <Link to="/signup">
                            <Button>Sign up</Button>
                        </Link>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}

export default Header;
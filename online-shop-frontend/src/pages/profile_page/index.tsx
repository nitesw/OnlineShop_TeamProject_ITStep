import {
    Button,
    Container,
    Divider,
    Flex,
    Grid,
    Paper,
    px,
    SimpleGrid,
    Skeleton,
    Stack,
    useMantineTheme
} from '@mantine/core';
import AvatarWithRole from "../../components/common/profile/profile_avatar_with_role.tsx";
import GeneralInfo from "../../components/common/profile/profile_general_info.tsx";
import ProfileBio from "../../components/common/profile/profile_bio.tsx";
import OtherInfo from "../../components/common/profile/profile_other_info.tsx";
import ProfileLinks from "../../components/common/profile/profile_links.tsx";
import OwnedGames from "../../components/common/profile/profile_owned_games.tsx";
import AddedGames from "../../components/common/profile/profile_added_games.tsx";
import Posts from "../../components/common/profile/profile_posts.tsx";
import Reviews from "../../components/common/profile/profile_reviews.tsx";
import {useGetUserQuery} from "../../services/api.users.service.ts";
import {useAppSelector} from "../../redux/hooks.ts";
import {selectAccount} from "../../redux/account/accountSlice.ts";

const ProfilePage = ()=> {
    const theme = useMantineTheme();
    const BASE_HEIGHT = 700;
    const getSubHeight = (children: number, spacing: number) =>
        BASE_HEIGHT / children - spacing * ((children - 1) / children);

    const account = useAppSelector(selectAccount);
    const userId = Number(account?.id);
    const {data: user, isLoading} = useGetUserQuery(userId, { skip: isNaN(userId) });
    console.log(user);

    return (
        <>
            {isLoading ? (
                <Container my="md">
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <Skeleton height={BASE_HEIGHT} radius="md" animate={false} />
                        <Stack>
                            <Skeleton
                                height={getSubHeight(2, px(theme.spacing.md) as number)}
                                radius="md"
                                animate={false}
                            />
                            <Skeleton
                                height={getSubHeight(2, px(theme.spacing.md) as number)}
                                radius="md"
                                animate={false}
                            />
                        </Stack>
                    </SimpleGrid>
                </Container>
                ) : (
                <Container my="md">
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <Paper shadow="xs" radius="md" p="xl" bg="#424242">
                            <Flex direction="column" gap="md">
                                <Grid flex={1} h={100}>
                                    <Grid.Col span={{ base: 12, xs: 6, sm: 6 }}>
                                        <AvatarWithRole avatarUrl={user!.profile_picture} roleId={user!.role} />
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 6, sm: 6 }}>
                                        <GeneralInfo username={user!.username} isOnline={user!.is_online} location={user!.location} status={user!.status_message} />
                                    </Grid.Col>
                                </Grid>
                                <ProfileBio bio={user!.bio} />
                                <Flex gap="md">
                                    <OtherInfo />
                                    <Flex flex={1} gap="md" direction="column">
                                        <ProfileLinks twitchId={user!.twitch_id} discordId={user!.discord_id} />
                                        {account?.id === user?.id ? (
                                            <Button variant="light" fullWidth>Edit Profile</Button>
                                        ) : (
                                            <Button variant="light" fullWidth>Add Friend</Button>
                                        )}
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Paper>
                        <Stack>
                            <Paper
                                shadow="xs"
                                radius="md"
                                p="xl"
                                bg="#424242"
                                h={getSubHeight(2, px(theme.spacing.md) as number)}
                            >
                                <Flex direction="column" gap="md" style={{ height: '100%' }}>
                                    <div style={{ flex: 1 }}>
                                        <OwnedGames ownedGames={user!.owned_games || []} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <AddedGames added_games={user!.added_games || []} />
                                    </div>
                                </Flex>
                            </Paper>
                            <Paper
                                shadow="xs"
                                radius="md"
                                p="xl"
                                bg="#424242"
                                h={getSubHeight(2, px(theme.spacing.md) as number)}
                            >
                                <Flex direction="column" gap="md" style={{ height: '100%' }}>
                                    <div style={{ flex: 1 }}>
                                        <Posts posts={user!.posts || []} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <Reviews reviews={user!.reviews || []} />
                                    </div>
                                </Flex>
                            </Paper>
                        </Stack>
                    </SimpleGrid>
                </Container>
            )}
        </>
    );
}

export default ProfilePage;
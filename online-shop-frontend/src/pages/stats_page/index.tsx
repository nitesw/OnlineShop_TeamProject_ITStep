import {Container, Grid, Skeleton, Stack} from "@mantine/core";
import BaseStats from "../../components/common/stats/stats_base_statistics.tsx";
import TopGenres from "../../components/common/stats/stats_top_genres.tsx";
import TopGames from "../../components/common/stats/stats_top_games.tsx";
import TopUsers from "../../components/common/stats/stats_top_users.tsx";
import {useGetStatsQuery} from "../../services/api.stats.service.ts";

const StatsPage = () => {
    const {data: stats, isLoading} = useGetStatsQuery();

    console.log('Redux stats: ', stats);

    return (
        <>
            {isLoading ? (
                <Container my="md">
                    <Grid>
                        <Grid.Col span={{base: 12, sm: 8}}>
                            <Stack>
                                <Skeleton
                                    height={350}
                                    radius="md"
                                    animate={true}
                                />
                                <Skeleton
                                    height={250}
                                    radius="md"
                                    animate={true}
                                />
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{base: 12, sm: 4}}>
                            <Stack>
                                <Skeleton
                                    height={350}
                                    radius="md"
                                    animate={true}
                                />
                                <Skeleton
                                    height={250}
                                    radius="md"
                                    animate={true}
                                />
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Container>
            ) : (
                <Container my="md">
                    <Grid>
                        <Grid.Col span={{base: 12, sm: 8}}>
                            <Stack>
                                <BaseStats stats={stats!.stats} />
                                <TopGames topGames={stats!.top_games} />
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{base: 12, sm: 4}}>
                            <Stack>
                                <TopUsers topUsers={stats!.top_users} />
                                <TopGenres topGenres={stats!.top_genres} />
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Container>
            )}

        </>
    )
}

export default StatsPage;
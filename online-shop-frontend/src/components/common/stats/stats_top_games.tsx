import {Carousel} from "@mantine/carousel";
import {Paper} from "@mantine/core";
import GameItem from "./stats_game_item.tsx";
import {StatsResponse} from "../../../models/stats.ts";

interface TopGamesProps {
    topGames: StatsResponse["top_games"];
}

const TopGames = ({ topGames }: TopGamesProps) => {
    return (
        <Paper shadow="lg" radius="md" p="md" bg="#494949" h={250}>
            <Carousel height="100%" slideGap="xs" slideSize="100%">
                {topGames.map((game) => (
                    <Carousel.Slide key={game.id}>
                        <GameItem game={game} />
                    </Carousel.Slide>
                ))}
            </Carousel>
        </Paper>
    );
};

export default TopGames;
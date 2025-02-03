import { DonutChart } from "@mantine/charts";
import { Paper } from "@mantine/core";
import { StatsResponse } from "../../../models/stats";

interface TopGenresProps {
    topGenres: StatsResponse["top_genres"];
}

const TopGenres: React.FC<TopGenresProps> = ({ topGenres }) => {
    const colors = ['yellow', 'blue', 'orange', 'green', 'grape'];
    const genreData = topGenres.map((genre, index) => ({
        name: genre.genres_name,
        value: genre.genre_game_count,
        color: colors[index % colors.length],
    }));

    return (
        <Paper shadow="lg" radius="md" p="md" bg="#494949" h="250px">
            <DonutChart
                size={138}
                withLabelsLine
                labelsType="value"
                withLabels
                thickness={14}
                strokeWidth={0}
                tooltipDataSource="segment"
                mx="auto"
                my="auto"
                chartLabel="Top Genres"
                data={genreData}
            />
        </Paper>
    );
};

export default TopGenres;

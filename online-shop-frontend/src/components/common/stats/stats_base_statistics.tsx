import {DefaultMantineColor, Paper} from "@mantine/core";
import { BarChart } from "@mantine/charts";
import {StatsModel} from "../../../models/stats.ts";

const convertStatsToData = (stats: StatsModel) => {
    return [
        { item: 'Games', Total: stats.total_games, color: 'yellow' as DefaultMantineColor },
        { item: 'Users', Total: stats.total_users, color: 'blue' as DefaultMantineColor },
        { item: 'Genres', Total: stats.total_genres, color: 'orange' as DefaultMantineColor },
        { item: 'Reviews', Total: stats.total_reviews, color: 'grape' as DefaultMantineColor },
        { item: 'Sales', Total: stats.total_purchases, color: 'green' as DefaultMantineColor },
        { item: 'Posts', Total: stats.total_posts, color: 'pink' as DefaultMantineColor },
    ];
};

interface BaseStatsProps {
    stats: StatsModel;
}

const BaseStats: React.FC<BaseStatsProps> = ({ stats }) => {
    const data = convertStatsToData(stats);
    return (
        <Paper shadow="lg" radius="md" p="md" bg="#494949" h="350px">
            <BarChart
                h="100%"
                data={data}
                dataKey="item"
                xAxisLabel="Spiral Stats"
                yAxisLabel="Total"
                series={[{ name: "Total", color: "white" }]}
            />
        </Paper>
    );
};


export default BaseStats;

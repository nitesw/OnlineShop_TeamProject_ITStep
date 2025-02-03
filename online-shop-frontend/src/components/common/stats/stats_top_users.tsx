import { Paper } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import UserItem from "./stats_user_item.tsx";
import { StatsResponse } from "../../../models/stats";

interface TopUsersProps {
    topUsers: StatsResponse["top_users"];
}

const TopUsers: React.FC<TopUsersProps> = ({ topUsers }) => {
    const sortedUsers = [...topUsers].sort((a, b) => b.num_owned_games - a.num_owned_games);

    return (
        <Paper shadow="lg" radius="md" p="md" bg="#494949" h={350}>
            <Carousel height="318" orientation="vertical" slideGap={5} slideSize="100%" w="100%">
                {sortedUsers.map((user, index) => (
                    <Carousel.Slide key={user.id}>
                        <UserItem
                            username={user.username}
                            profilePicture={user.profile_picture}
                            numOwnedGames={user.num_owned_games}
                            rank={index + 1}
                        />
                    </Carousel.Slide>
                ))}
            </Carousel>
        </Paper>
    );
};

export default TopUsers;
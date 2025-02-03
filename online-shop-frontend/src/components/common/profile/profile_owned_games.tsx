import DisplayItems from "./profile_items_display.tsx";
import {Badge, Flex} from "@mantine/core";
import {GameModelForOwnedGamesAndUserReviews} from "../../../models/games.ts";

const OwnedGames = ({ownedGames} : {ownedGames: GameModelForOwnedGamesAndUserReviews[]}) => {
    const items = ownedGames.map(game => ({
        id: game.id,
        coverImage: game.cover_image,
        title: game.title,
    }));

    return (
        <Flex direction="column" gap={5}>
            <Badge size="lg" variant="light" color="gray">Owned games</Badge>
            <DisplayItems type="image" items={items} comp="owned_games" />
        </Flex>
    )
}

export default OwnedGames;
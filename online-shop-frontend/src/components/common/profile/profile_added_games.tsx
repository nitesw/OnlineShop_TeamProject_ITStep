import DisplayItems from "./profile_items_display.tsx";
import {Badge, Flex} from "@mantine/core";
import {GameModelForAddedGames} from "../../../models/games.ts";

const AddedGames = ({added_games} : {added_games: GameModelForAddedGames[]}) => {
    const items = added_games.map(game => ({
        id: game.id,
        coverImage: game.cover_image,
        title: game.title,
    }));

    return (
        <Flex direction="column" gap={5}>
            <Badge size="lg" variant="light" color="gray">Added games</Badge>
            <DisplayItems type="image" items={items} comp="added_games" />
        </Flex>
    )
}

export default AddedGames;
import {Flex, Paper, Text} from "@mantine/core";
import DisplayImageItem from "./profile_image_item_display.tsx";
import {Carousel} from "@mantine/carousel";
import DisplayTextItem from "./profile_text_item_display.tsx";

interface ImageItem {
    id: number;
    coverImage: string;
    title: string;
}
interface TextItem {
    id: number;
    rating: boolean;
    reviewFor: {
        id: number;
        title: string;
        coverImage: string;
    };
    createdAt: Date;
}
type DisplayItemsProps =
    | { type: "image"; items: ImageItem[]; comp: string }
    | { type: "text"; items: TextItem[]; comp: string };

const DisplayItems = (props: DisplayItemsProps) => {
    const itemsLength = Array.isArray(props.items) ? props.items.length : 0;

    return (
        <Paper shadow="lg" radius="md" p="md" bg="#494949" flex={1} h={100}>
            {itemsLength > 0 ? (
                <Carousel height="100%">
                    {props.type === "image" ? (
                        props.items.map((item) => (
                            <Carousel.Slide key={item.id}>
                                <DisplayImageItem item={item} />
                            </Carousel.Slide>
                        ))
                    ) : (
                        props.items.map((item) => (
                            <Carousel.Slide key={item.id}>
                                <DisplayTextItem item={item} />
                            </Carousel.Slide>
                        ))
                    )}
                </Carousel>
            ) : (
                <Paper shadow="lg" radius="md" p="md" bg="#505050" flex={1} h={69}>
                    <Flex flex={1} w="100%" h="100%" justify="center" align="center">
                        {props.comp === "owned_games" ? (
                            <Text size="xl">No Owned Games Found</Text>
                        ) : props.comp === "added_games" ? (
                            <Text size="xl">No Games Added</Text>
                        ) : props.comp === "reviews" ? (
                            <Text size="xl">No Reviews Written Yet</Text>
                        ) : props.comp === "posts" ? (
                            <Text size="xl">No Posts to Display</Text>
                        ) : (
                            <Text size="xl">No Items Available</Text>
                        )}
                    </Flex>
                </Paper>
            )}
        </Paper>
    )
}

export default DisplayItems;
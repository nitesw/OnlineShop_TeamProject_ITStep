import { Badge, Flex, Paper, Space, Text, Title } from "@mantine/core";

interface GameItemProps {
    game: {
        id: number;
        title: string;
        cover_image: string;
        genres: { id: number; name: string; slug: string; description: string }[];
        average_rating: number;
        price: number;
        discount: number;
        discounted_price: number;
        num_sales: number;
    };
}

const GameItem = ({ game }: GameItemProps) => {
    return (
        <div style={{ height: "218px", backgroundColor: "#505050", borderRadius: "10px", padding: "12px" }}>
            <Flex direction="column" gap="xs" h="100%">
                <Flex flex={1} w="100%" gap="sm">
                    <Flex flex={1} w="100%" align="center">
                        <img
                            src={game.cover_image}
                            alt={game.title}
                            style={{ borderRadius: "10px", width: "272px" }}
                            draggable={false}
                        />
                    </Flex>
                    <Flex flex={1} direction="column" gap="sm" h="100%">
                        <Flex justify="space-between">
                            <Flex direction="column">
                                <Title order={3}>{game.title}</Title>
                                <Text style={{ marginTop: "-6px" }} size="sm">{game.genres.map((genre) => genre.name).join(", ")}</Text>
                            </Flex>
                            <Flex>
                                <Badge circle size="xl" variant="light" color="red">#1</Badge>
                            </Flex>
                        </Flex>
                        <Paper shadow="lg" radius="md" p={6} bg="#545454" w="100%" h="100%">
                            <Flex h="100%" w="100%" align="center" justify="center">
                                <Title order={3} ta="center">Rating: <span>{game.average_rating > 0 ? 'Super Positive' : 'No Rating'}</span></Title>
                            </Flex>
                        </Paper>
                    </Flex>
                </Flex>
                <Flex flex={1} gap="sm">
                    <Flex flex={1} align="center" h="100%">
                        <Paper shadow="lg" radius="md" p={6} bg="#545454" w="100%">
                            <Title order={2} ta="center">Total Sales: <span>{game.num_sales}</span></Title>
                        </Paper>
                    </Flex>
                    <Flex flex={1} align="center" w="100%">
                        <Paper shadow="lg" radius="md" p={6} bg="#545454" w="100%">
                            <Flex w="100%" align="center" justify="center">
                                <Title order={2} ta="center">Price:</Title>
                                <Space w={3} />
                                {Number(game.discount) !== 0 ? (
                                    <Flex align="flex-end">
                                        <Text style={{ alignSelf: "end", fontSize: "22px" }}>${game.discounted_price}</Text>
                                        <Text td="line-through" style={{ alignSelf: "start", fontSize: "12px" }}>${game.price}</Text>
                                    </Flex>
                                ) : (
                                    <Text style={{ alignSelf: "end", fontSize: "22px" }}>${game.price}</Text>
                                )}
                            </Flex>
                        </Paper>
                    </Flex>
                </Flex>
            </Flex>
        </div>
    );
};

export default GameItem;

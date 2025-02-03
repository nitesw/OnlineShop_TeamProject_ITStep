import { Badge, Flex, Title } from "@mantine/core";
import { IconDeviceGamepad2 } from "@tabler/icons-react";

interface UserItemProps {
    username: string;
    profilePicture: string;
    numOwnedGames: number;
    rank: number;
}

const UserItem: React.FC<UserItemProps> = ({ username, profilePicture, numOwnedGames, rank }) => {
    return (
        <div style={{ height: '100%', backgroundColor: '#505050', borderRadius: '10px', padding: '12px' }}>
            <Flex direction="column" h="100%" gap={4} align="center" justify="center">
                <img
                    style={{ borderRadius: "10px", height: "220px", width: "220px" }}
                    src={profilePicture === "" ? "https://t3.ftcdn.net/jpg/05/70/71/06/360_F_570710660_Jana1ujcJyQTiT2rIzvfmyXzXamVcby8.jpg" : profilePicture}
                    alt="Avatar"
                    draggable={false}
                />
                <Title order={3}>{username}</Title>
                <Flex w="100%" gap={4}>
                    <Badge variant="light" color="blue" leftSection={<IconDeviceGamepad2 size={14} />} fullWidth>
                        {numOwnedGames}
                    </Badge>
                    <Badge variant="light" color="red" fullWidth>
                        #{rank}
                    </Badge>
                </Flex>
            </Flex>
        </div>
    );
};

export default UserItem;

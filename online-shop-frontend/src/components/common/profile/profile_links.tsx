import {Badge, Flex, Paper, Tooltip} from "@mantine/core";
import {IconBrandDiscordFilled, IconBrandTwitch} from "@tabler/icons-react";

const ProfileLinks = ({discordId, twitchId} : {discordId: string, twitchId: string}) => {
    return (
        <Paper shadow="lg" radius="md" p="md" bg="#494949" flex={1}>
            <Flex direction="column" flex={1} style={{justifyContent:"space-between"}} h="100%" gap="xs">
                <Tooltip label={discordId ? "#" + discordId : "No linked Discord account"}>
                    <Badge fullWidth variant="light" color="blue" leftSection={<IconBrandDiscordFilled size={14}/>}>Discord</Badge>
                </Tooltip>
                <Tooltip label={twitchId ? "@" + twitchId : "No linked Twitch account"}>
                    <Badge fullWidth variant="light" color="grape" leftSection={<IconBrandTwitch size={14}/>}>Twitch</Badge>
                </Tooltip>
            </Flex>
        </Paper>
    )
}

export default ProfileLinks;
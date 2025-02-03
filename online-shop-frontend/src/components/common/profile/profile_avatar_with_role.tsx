import {AspectRatio, Badge, Flex, Paper} from "@mantine/core";
import {IconUser, IconUserBolt, IconUserCode} from "@tabler/icons-react";

const AvatarWithRole = ({ avatarUrl, roleId }: { avatarUrl: string; roleId: number }) => {
    return(
        <Paper shadow="lg" radius="md" p="md" bg="#494949" flex={1}>
            <Flex direction="column" justify="center" align="start">
                <AspectRatio flex="0 0 100px" ratio={1} style={{ alignSelf: "center" }}>
                    <img style={{borderRadius:"10px"}}
                         src={avatarUrl === null ? "https://t3.ftcdn.net/jpg/05/70/71/06/360_F_570710660_Jana1ujcJyQTiT2rIzvfmyXzXamVcby8.jpg" : avatarUrl}
                         alt="Avatar"
                         draggable={false}
                    />
                </AspectRatio>
                <Badge variant="light" leftSection={
                    roleId === 1 ? <IconUserCode size={14}/> :
                        roleId === 2 ? <IconUserBolt size={14}/> :
                            <IconUser size={14}/>}
                       color={roleId === 2 ? "yellow" : roleId === 3 ? "blue" : ""}
                       fullWidth>{roleId === 1 ? "Admin" : roleId === 2 ? "Seller" : "User"}</Badge>
            </Flex>
        </Paper>
    )
}

export default AvatarWithRole;
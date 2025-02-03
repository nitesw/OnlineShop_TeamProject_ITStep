import {Divider, Flex, Paper, ScrollArea, Title} from "@mantine/core";

const ProfileBio = ({bio} : {bio: string}) => {
    return (
        <Paper shadow="lg" radius="md" p="md" bg="#494949">
            <Flex direction="column" w="100%">
                <Title order={5}>Bio</Title>
                <Divider size="xs" mb="xs" style={{borderColor: "#c9c9c9"}} />
                <ScrollArea h={185} offsetScrollbars style={{margin: "0"}}>
                    {bio ? bio : "This user hasn't added a bio yet."}
                </ScrollArea>
            </Flex>
        </Paper>
    )
}
export default ProfileBio;
import {Divider, Flex, Paper, Title, Text, Badge} from "@mantine/core";
import {IconCircle, IconCircleFilled, IconMapPin} from "@tabler/icons-react";

const GeneralInfo = ({ username, isOnline, location, status }: { username: string, isOnline: boolean, location: string, status: string }) => {
    return (
        <Paper shadow="lg" radius="md" p="md" bg="#494949" style={{ height: '100%' }}>
            <Flex direction="column" align="center" justify="space-between" style={{height: '100%'}} gap="md">
                <Paper shadow="lg" radius="md" p="xs" bg="#515151" w="100%">
                    <Flex direction="column" w="100%" gap={5}>
                        <Text truncate="end" ta="center">{username}</Text>
                        <Badge fullWidth variant="light" color={isOnline ? "green" : "red"}
                               leftSection={isOnline ? <IconCircleFilled size={14}/> : <IconCircle size={14}/>}>
                            {isOnline ? 'Online' : 'Offline'}
                        </Badge>
                        <Badge fullWidth color="gray" leftSection={<IconMapPin size={14}/>}>
                            {location ? location : "No Location"}
                        </Badge>
                    </Flex>
                </Paper>
                <Flex flex={1} w="100%">
                    <Paper shadow="lg" radius="md" p="xs" bg="#515151" w="100%">
                        <Title order={6}>Status message</Title>
                        <Divider size="xs" style={{borderColor: "#c9c9c9"}} />
                        <Text>
                            {status ? status : "No status set yet."}
                        </Text>
                    </Paper>
                </Flex>
            </Flex>
        </Paper>
    );
};

export default GeneralInfo;

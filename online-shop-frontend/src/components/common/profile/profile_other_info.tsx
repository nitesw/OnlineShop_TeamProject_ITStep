import {Button, Flex, Paper} from "@mantine/core";
import {Link} from "react-router-dom";

const OtherInfo = () => {
    return (
        <Paper shadow="lg" radius="md" p="md" bg="#494949" flex={1}>
            <Flex direction="column" flex={1} style={{justifyContent:"space-between"}} h="100%">
                <Flex align="center" h="100%">
                    <Link to="/friends" style={{width:'100%', textDecoration:'none'}}>
                        <Button fullWidth variant="light" color="gray">Friends</Button>
                    </Link>
                </Flex>
                <Flex align="center" h="100%">
                    <Link to="/wishlist" style={{width:'100%', textDecoration:'none'}}>
                        <Button fullWidth variant="light" color="gray">Wishlist</Button>
                    </Link>
                </Flex>
            </Flex>
        </Paper>
    )
}

export default OtherInfo;
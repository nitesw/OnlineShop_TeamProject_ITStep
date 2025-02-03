import {AspectRatio, Flex, Paper} from "@mantine/core";
import {IconThumbDownFilled, IconThumbUpFilled} from "@tabler/icons-react";

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

const DisplayTextItem = ({item} : {item: TextItem}) => {
    const formatDate = (date: string | Date) => {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear();
        return `${day}.${month}.${year}`;
    };

    return (
        <Flex justify="center" align="center" flex={1}>
            <AspectRatio ratio={3}>
                <Flex justify="center" align="center">
                    <Paper shadow="lg" radius="md" p="xs" bg="#515151" w={184} h={69}>
                        <Flex direction="column" justify="start" align="start">
                            <span style={{fontSize:"11px"}}>Rating: {item.rating ? <IconThumbUpFilled size={14}/> : <IconThumbDownFilled size={14}/>}</span>
                            <span style={{fontSize:"11px"}}>Game: {item.reviewFor.title}</span>
                            <span style={{fontSize:"11px"}}>Date: {formatDate(item.createdAt)}</span>
                        </Flex>
                    </Paper>
                </Flex>
            </AspectRatio>
        </Flex>
    )
}

export default DisplayTextItem;
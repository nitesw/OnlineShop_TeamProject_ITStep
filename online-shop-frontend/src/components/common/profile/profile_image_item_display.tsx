import {AspectRatio, Flex} from "@mantine/core";

interface ImageItem {
    id: number;
    coverImage: string;
    title: string;
}

const DisplayImageItem = ({item} : {item: ImageItem}) => {
    return (
        <Flex justify="center" align="center" flex={1}>
            <AspectRatio ratio={3}>
                <Flex justify="center" align="center">
                    <img
                        src={item.coverImage}
                        alt={item.title}
                        style={{borderRadius: "10px", width: "184px", height: "69px"}}
                        draggable={false}
                    />
                </Flex>
            </AspectRatio>
        </Flex>
    )
}

export default DisplayImageItem;
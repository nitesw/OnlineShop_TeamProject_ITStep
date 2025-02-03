import DisplayItems from "./profile_items_display.tsx";
import {Badge, Flex} from "@mantine/core";
import {PostModelForUser} from "../../../models/posts.ts";

const Posts = ({posts} : {posts: PostModelForUser[]}) => {
    const items = posts.map(post => ({
        id: post.id,
        coverImage: post.cover_image,
        title: post.title,
    }));

    return (
        <Flex direction="column" gap={5}>
            <Badge size="lg" variant="light" color="gray">Posts</Badge>
            <DisplayItems type="image" items={items} comp="posts" />
        </Flex>
    )
}

export default Posts;
import DisplayItems from "./profile_items_display.tsx";
import {Badge, Flex} from "@mantine/core";
import {ReviewModelForUser} from "../../../models/reviews.ts";

const Reviews = ({reviews} : {reviews: ReviewModelForUser[]}) => {
    const items = reviews.map(review => ({
        id: review.id,
        rating: review.rating,
        reviewFor: {
            id: review.review_for.id,
            title: review.review_for.title,
            coverImage: review.review_for.cover_image,
        },
        createdAt: review.created_at,
    }));


    return (
        <Flex direction="column" gap={5}>
            <Badge size="lg" variant="light" color="gray">Reviews</Badge>
            <DisplayItems type="text" items={items} comp="reviews"/>
        </Flex>
    )
}

export default Reviews;
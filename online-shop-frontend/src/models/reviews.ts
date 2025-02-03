import {UserModelForReview} from "./accounts.ts";
import {GameModelForOwnedGamesAndUserReviews} from "./games.ts";

export interface ReviewModel {
    id: number;
    rating: boolean;
    created_at: Date;
    review_text: string;
    review_for: number;
    review_by: UserModelForReview;
}
export interface ReviewModelForUser {
    id: number;
    rating: boolean;
    created_at: Date;
    review_text: string;
    review_for: GameModelForOwnedGamesAndUserReviews;
}
import {GameModelForAddedGames, GameModelForOwnedGamesAndUserReviews, GameModelForWishlist} from "./games.ts";
import {PostModelForUser} from "./posts.ts";
import {ReviewModelForUser} from "./reviews.ts";

export interface LoginFormFields {
    username: string;
    password: string;
    rememberMe?: boolean;
}
export interface LoginModel {
    username: string;
    password: string;
}
export interface TokenPayload {
    id: number;
    username: string;
    role: string;
    exp: number;
}
export interface TokenPayloadItems {
    "user_id": number;
    "username": string;
    "role": string;
    "exp": number;
}
export interface UserModelForReview {
    id: number;
    username: string;
    owned_games_count: number;
    reviews_count: number;
    profile_picture: string;
}
export interface UserModel  {
    id: number;
    username: string;
    email: string;
    profile_picture: string;
    bio: string;
    location: string;
    discord_id: string;
    twitch_id: string;
    is_online: boolean;
    status_message: string;
    role: number;
    owned_games: GameModelForOwnedGamesAndUserReviews[];
    wishlist: GameModelForWishlist[];
    reviews: ReviewModelForUser[];
    posts: PostModelForUser[];
    added_games: GameModelForAddedGames[];
    friends: FriendModel[];
}
export interface UserModelForPosts {
    id: number;
    username: string;
    profile_picture: string;
}
export interface FriendModel {
    id: number;
    username: string;
    profile_picture: string;
}
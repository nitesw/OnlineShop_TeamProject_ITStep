import {ReviewModel} from "./reviews.ts";
import {GenreModel} from "./genres.ts";

export interface GameModel {
    id: number;
    title: string;
    description: string;
    cover_image: string;
    release_date: Date;
    developer: string;
    publisher: string;
    added_by: number;
    price: number;
    discount: number;
    discounted_price: number;
    average_rating: number;
    slug: string;
    reviews: ReviewModel[];
    images: string[];
    genres: GenreModel[];
}
export interface GameModelForOwnedGamesAndUserReviews {
    id: number;
    title: string;
    cover_image: string;
}
export interface GameModelForWishlist {
    id: number;
    title: string;
    cover_image: string;
    release_date: Date;
    price: number;
    discount: number;
    discounted_price: number;
    average_rating: number;
    genres: GenreModel[];
}
export interface GameModelForAddedGames {
    id: number;
    title: string;
    cover_image: string;
    release_date: Date;
    average_rating: number;
}
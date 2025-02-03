import {UserModelForPosts} from "./accounts.ts";
import {CategoryModel} from "./category.ts";

export interface PostModel {
    id: number;
    title: string;
    cover_image: string;
    created_at: Date;
    updated_at: Date;
    description: string;
    total_likes: number;
    slug: string;
    publisher: UserModelForPosts;
    categories: CategoryModel[];
}
export interface PostModelForUser {
    id: number;
    title: string;
    cover_image: string;
    created_at: Date;
    total_likes: number;
    categories: CategoryModel[];
}
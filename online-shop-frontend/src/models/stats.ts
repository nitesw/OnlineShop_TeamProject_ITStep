export interface StatsModel {
    total_games: number;
    total_users: number;
    total_genres: number;
    total_reviews: number;
    total_purchases: number;
    total_posts: number;
    updated_at: Date;
}
export interface StatsResponse {
    stats: StatsModel;
    top_users: {
        id: number;
        username: string;
        profile_picture: string;
        num_owned_games: number;
    }[];
    top_games: {
        id: number;
        title: string;
        cover_image: string;
        genres: {
            id: number;
            name: string;
            slug: string;
            description: string;
        }[];
        average_rating: number;
        price: number;
        discount: number;
        discounted_price: number;
        num_sales: number;
    }[];
    top_genres: {
        genres_id: number;
        genres_name: string;
        genre_game_count: number;
    }[]
}

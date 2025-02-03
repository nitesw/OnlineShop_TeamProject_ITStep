import {useGetGamesQuery} from "../../services/api.games.service.ts";

const StorePage = () => {
    const { data: games, isLoading, error } = useGetGamesQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.toString()}</div>;
    }

    console.log('Redux data: ', games);

    return (
        <>
        </>
    );
};


export default StorePage;
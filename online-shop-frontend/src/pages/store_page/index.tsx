import {useGetGenresQuery} from "../../services/api.genres.service.ts";

const StorePage = () => {
    const { data: genres, isLoading, error } = useGetGenresQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.toString()}</div>;
    }

    console.log('Redux data: ', genres);

    return (
        <>
        </>
    );
};


export default StorePage;
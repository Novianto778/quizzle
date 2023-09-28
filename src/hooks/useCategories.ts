import { useEffect, useState } from 'react';
import { getCategories } from '../services/actions';
import { Categories } from '../types/app.types';

const useCategories = () => {
    const [categories, setCategories] = useState<
        Categories['trivia_categories']
    >([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        getCategories().then((res) => {
            setCategories(res);
        });
        setIsLoading(false);
    }, []);

    return { categories, isLoading };
};

export default useCategories;

import { useState, useEffect } from "react";

const useAPI = (endpointURL, options) => {
    const [data, setdata] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const makeCall = async () => {
            setIsLoading(true)
            try {
                const res = await fetch(endpointURL, options);
                const formattedRes = await res.json();
                setdata(formattedRes);
                setIsLoading(false);
            } catch (err) {
                setError(err);
                setIsLoading(false);
                console.log("Error loading data from API: ", err)
            }
        };
        makeCall();
    }, []);

    return { data, error, isLoading };
};

export default useAPI;
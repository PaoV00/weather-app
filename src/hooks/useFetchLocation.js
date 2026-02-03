// src/hooks/useFetchLocation.js
import { useState, useEffect } from 'react';
import { fetchClient } from '../services/utils/fetchClient';

export default function useFetchLocation(locationId) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!locationId) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const result = await fetchClient(`/api/location/${locationId}`);
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [locationId]);

    return { data, loading, error };
}
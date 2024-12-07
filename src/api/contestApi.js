import { apiClient } from './apiClient';

export const fetchCurrentContest = async () => {
    try {
        const { data } = await apiClient.get('/api/contests');
        return data.response;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const fetchContestDetails = async (contestId) => {
    try {
        const { data } = await apiClient.get(`/api/contests/${contestId}`);
        return data.response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchContestPayments = async (startDate, endDate) => {
    try {
        const { data } = await apiClient.post('/api/contests/payment', {
            startDate,
            endDate,
        });
        return data.response;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const postContestEntry = async (data) => {
    try {
        const res = await apiClient.post('/api/posts', data);
        return res.response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const checkContestParticipation = async (contestId) => {
    try {
        const { data } = await apiClient.get(`/api/contests/${contestId}/check`);
        return data.response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getContestPosts = async (contestId, page, size) => {
    try {
        const { data } = await apiClient.get(`/api/contests/${contestId}/posts`, {
            params: { page, size },
        });
        return data.response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deletePost = async (postId) => {
    try {
        const { data } = await apiClient.delete(`/api/posts/${postId}`);
        return data.response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const likePost = async (postId) => {
    const { data } = await apiClient.post(`/api/posts/${postId}/like`);
    return data.response;
};

export const unlikePost = async (postId) => {
    const { data } = await apiClient.delete(`/api/posts/${postId}/like`);
    return data.response;
};


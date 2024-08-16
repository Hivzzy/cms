import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_DEV,
    headers: {
        'Content-Type': 'application/json',
    },
});

// User API
export const getAllUser = async (params) => {
    try {
        const response = await apiClient.get('/user-management/users', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get data:', error.response.data);
        // throw error;
        return error.response.data;
    }
};

export const createUser = async (body) => {
    try {
        const response = await apiClient.post('/user-management/users', body);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get data:', error.response.data);
        return error.response.data;
    }
};

export const getUserById = async (params) => {
    try {
        const response = await apiClient.get('/user-management/users/id', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get data:', error.response.data);
        return error.response.data;
    }
};


export const updateUser = async (body, params) => {
    try {
        const response = await apiClient.put('/user-management/users', body, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get data:', error.response.data);
        return error.response.data;
    }
};

export const deleteUser = async (params) => {
    try {
        const response = await apiClient.delete('/user-management/users/id', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get data:', error.response.data);
        return error.response.data;
    }
};

// Article API
export const getAllArticle = async (params) => {
    try {
        const response = await apiClient.get('/article-management/articles/cms-articles', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get data:', error.response.data);
        // throw error;
        return error.response.data;
    }
};

// Career API
export const getAllCareer = async (params) => {
    try {
        const response = await apiClient.get('/career-management/cms-careers', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get data:', error.response.data);
        // throw error;
        return error.response.data;
    }
};


//Client Category API
export const getAllClientCategory = async (params) => {
    try {
        const response = await apiClient.get('/client-category-management/client-categories', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get data:', error.response.data);
        // throw error;
        return error.response.data;
    }
};

export const createClientCategory = async (body) => {
    try {
        const response = await apiClient.post('/client-category-management/client-categories', body);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get data:', error.response.data);
        return error.response.data;
    }
};



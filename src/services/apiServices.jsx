import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_DEV,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth API
export const authSignIn = async (body) => {
    try {
        const response = await apiClient.post('/auth-management/auth/sign-in', body);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};

// User API
export const getAllUser = async (params) => {
    try {
        const response = await apiClient.get('/user-management/users', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
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
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};

export const getUserById = async (params) => {
    try {
        const response = await apiClient.get('/user-management/users/id', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};


export const updateUser = async (body, params) => {
    try {
        const response = await apiClient.put('/user-management/users', body, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};

export const deleteUser = async (params) => {
    try {
        const response = await apiClient.delete('/user-management/users/id', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
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
        console.error('Get error data:', error.response.data);
        // throw error;
        return error.response.data;
    }
};

export const getArticleById = async (id) => {
    try {
        const response = await apiClient.get(`/article-management/articles/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};

export const deleteArticle = async (id) => {
    try {
        const response = await apiClient.delete(`/article-management/articles/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response);
        return error.response.data;
    }
};

export const createArticle = async (request, imageFile) => {
    const formData = new FormData();
    try {
        const json = JSON.stringify(request);
        const blob = new Blob([json], {
            type: 'application/json'
        });

        formData.append('request', blob);

        formData.append('file', imageFile[0]);

        console.log('formData API request', request);
        console.log('formData API request', JSON.stringify(request));
        console.log('formData API', imageFile[0]);


        const response = await apiClient.post('/article-management/articles', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        // throw error;
        return error.response.data;
    }
};
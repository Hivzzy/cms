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

const urlToFile = async (url, filename, mimeType) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: mimeType });
};

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

export const getUserById = async (id) => {
    try {
        const response = await apiClient.get(`/user-management/users/${id}`);
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

export const deleteUser = async (id) => {
    try {
        const response = await apiClient.delete(`/user-management/users/id/${id}`);
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
        console.log('form data di api', request);
        console.log('blob di api', blob);
        formData.append('request', blob);
        formData.append('file', imageFile[0]);

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

export const updateArticle = async (request, imageFile) => {
    const formData = new FormData();
    try {
        const json = JSON.stringify(request);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append('request', blob);
        console.log('form data di api', request);
        console.log('blob di api', blob);
        
        if (imageFile === null) {
            const imageFromURL = await urlToFile(request.image, request.title, 'image/jpeg');
            formData.append('file', imageFromURL);
        } else {
            formData.append('file', imageFile[0]);
        }

        const response = await apiClient.put('/article-management/articles', formData, {
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

// Metadata
export const getAllMetadata = async (params) => {
    try {
        const response = await apiClient.get('/company-metadata-management/metadatas', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        // throw error;
        return error.response.data;
    }
};

export const getMetadataById = async (id) => {
    try {
        const response = await apiClient.get(`/company-metadata-management/metadatas/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        // throw error;
        return error.response.data;
    }
};
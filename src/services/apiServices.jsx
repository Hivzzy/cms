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

export const getCareerById = async (id) => {
    try {
        const response = await apiClient.get(`/career-management/careers/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};

export const createCareer = async (body) => {
    try {
        const response = await apiClient.post('/career-management/careers', body);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get data:', error.response.data);
        return error.response.data;
    }
};

export const updateCareer = async (body) => {
    try {
        const response = await apiClient.put(`/career-management/careers`,body);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return error.response?.data || { error: error.message };
    }
};

export const deleteCareer = async (id) => {
    try {
        const response = await apiClient.delete(`/career-management/careers/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};

// Client API
export const getAllClient = async (params) => {
    try {
        const response = await apiClient.get('/client-management/cms-clients', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get data:', error.response.data);
        // throw error;
        return error.response.data;
    }
};

export const getClientById = async (id) => {
    try {
        const response = await apiClient.get(`/client-management/clients/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};

export const createClient = async (request, imageFile) => {
    const formData = new FormData();
    const json = JSON.stringify(request);
    const blob = new Blob([json], { type: 'application/json' });
    formData.append('request', blob);
    formData.append('file', imageFile[0]);

    try {
        const response = await apiClient.post('/client-management/clients', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response) {
            console.error('Get error data:', error.response.data);
            return error.response.data;
        } else {
            return { message: 'An unexpected error occurred.' };
        }
    }
};

export const updateClient = async (request, imageFile) => {
    console.log(request)
    const formData = new FormData();
    try {
        const json = JSON.stringify(request);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append('request', blob);
        
        if (imageFile) {
            formData.append('file', imageFile[0]);
        }

        const response = await apiClient.put('/client-management/clients', formData, {
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

export const deleteClient = async (id) => {
    try {
        const response = await apiClient.delete(`/client-management/clients/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
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

export const getClientCategoryById = async (id) => {
    try {
        const response = await apiClient.get(`/client-category-management/client-categories/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
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

export const updateClientCategory = async (body) => {
    try {
        const response = await apiClient.put(`/client-category-management/client-categories`,body);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return error.response?.data || { error: error.message };
    }
};

export const deleteClientCategory = async (id) => {
    try {
        const response = await apiClient.delete(`/client-category-management/client-categories/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};


// Expertise Category API
export const getAllExpertiseCategory = async (params) => {
    try {
        const response = await apiClient.get('/expertise-category-management/expertise-categories', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get data:', error.response.data);
        // throw error;
        return error.response.data;
    }
}

export const getExpertiseCategoryById = async (id) => {
    try {
        const response = await apiClient.get(`/expertise-category-management/expertise-categories/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};

export const createExpertiseCategory = async (request, imageFile) => {
    const formData = new FormData();
    const json = JSON.stringify(request);
    const blob = new Blob([json], { type: 'application/json' });
    formData.append('request', blob);
    formData.append('file', imageFile[0]);

    try {
        const response = await apiClient.post('/expertise-category-management/expertise-categories', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response) {
            console.error('Get error data:', error.response.data);
            return error.response.data;
        } else {
            return { message: 'An unexpected error occurred.' };
        }
    }
};

export const updateExpertiseCategory = async (request, imageFile) => {
    console.log(request);
    console.log(imageFile)
    const formData = new FormData();
    try {
        const json = JSON.stringify(request);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append('request', blob);
        
        if (imageFile) {
            formData.append('file', imageFile[0]);
        }

        const response = await apiClient.put('/expertise-category-management/expertise-categories', formData, {
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

export const deleteExpertiseCategory = async (id) => {
    try {
        const response = await apiClient.delete(`/expertise-category-management/expertise-categories/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};

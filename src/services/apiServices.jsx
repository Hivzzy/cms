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

// eslint-disable-next-line no-unused-vars
const urlToFile = async (url, filename, mimeType) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: mimeType });
};

// Auth API
const authPath = '/auth-management/auth'
export const authSignIn = async (body) => {
    try {
        const response = await apiClient.post(`${authPath}/sign-in`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const authRequestResetPassword = async (params) => {
    try {
        console.log(params);

        const response = await apiClient.post(`${authPath}/request-forgot-password`, null, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};

export const authRequestChangePassword = async (body, params) => {
    try {
        const response = await apiClient.put(`${authPath}/change-password`, body, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};

// User API
const userPath = '/user-management/users';
export const getAllUser = async (params) => {
    try {
        const response = await apiClient.get(userPath, { params });
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
        const response = await apiClient.post(userPath, body);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};

export const getUserById = async (id) => {
    try {
        const response = await apiClient.get(`${userPath}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};


export const updateUser = async (body) => {
    try {
        console.log('update on body', body);

        const response = await apiClient.put(userPath, body);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await apiClient.delete(`/user-management/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};

// Article API
const articlePath = '/article-management/articles';
export const getAllArticle = async (params) => {
    try {
        const response = await apiClient.get(`${articlePath}/cms-articles`, { params });
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
        const response = await apiClient.get(`${articlePath}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};

export const deleteArticle = async (id) => {
    try {
        const response = await apiClient.delete(`${articlePath}/${id}`);
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

        const response = await apiClient.post(articlePath, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
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

        if (imageFile !== null) {
            formData.append('file', imageFile[0]);
        }

        const response = await apiClient.put(articlePath, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};

// Metadata
const companyMetadataPath = '/company-metadata-management/metadatas'
export const getAllMetadata = async (params) => {
    try {
        const response = await apiClient.get(companyMetadataPath, { params });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getMetadataById = async (id) => {
    try {
        const response = await apiClient.get(`${companyMetadataPath}/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const createMetadata = async (body) => {
    try {
        const response = await apiClient.post(companyMetadataPath, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const updateMetadata = async (body) => {
    try {
        console.log('call api', body);

        const response = await apiClient.put(companyMetadataPath, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const deleteMetadata = async (id) => {
    try {
        const response = await apiClient.delete(`${companyMetadataPath}/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Expertise
export const getAllExpertise = async (params) => {
    try {
        const response = await apiClient.get('/expertise-management/cms-expertises', { params });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getExpertiseById = async (id) => {
    try {
        const response = await apiClient.get(`/expertise-management/expertises/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const deleteExpertise = async (id) => {
    try {
        const response = await apiClient.delete(`/expertise-management/expertises/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const createExpertise = async (request, imageFile) => {
    const formData = new FormData();
    try {
        const json = JSON.stringify(request);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append('request', blob);

        if (imageFile !== null) {
            formData.append('file', imageFile[0]);
        }

        const response = await apiClient.post('/expertise-management/expertises', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};

export const updateExpertise = async (request, imageFile) => {
    const formData = new FormData();
    try {
        const json = JSON.stringify(request);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append('request', blob);

        if (imageFile !== null) {
            formData.append('file', imageFile[0]);
        }

        const response = await apiClient.put('/expertise-management/expertises', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};

const expertiseCategoryPath = '/expertise-category-management/expertise-categories';
// Expertise Category
export const getAllExpertiseCategory = async (params) => {
    try {
        const response = await apiClient.get(expertiseCategoryPath, { params });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getExpertiseCategoryById = async (id) => {
    try {
        const response = await apiClient.get(`${expertiseCategoryPath}/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const deleteExpertiseCategory = async (id) => {
    try {
        const response = await apiClient.delete(`${expertiseCategoryPath}/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const createExpertiseCategory = async (body) => {
    try {
        const response = await apiClient.post(expertiseCategoryPath, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const updateExpertiseCategory = async (body) => {
    try {
        const response = await apiClient.put(expertiseCategoryPath, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Team
export const getAllTeam = async (params) => {
    try {
        const response = await apiClient.get('/team-management/cms-teams', { params });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getTeamById = async (id) => {
    try {
        const response = await apiClient.get(`/team-management/teams/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const deleteTeam = async (id) => {
    try {
        const response = await apiClient.delete(`/team-management/teams/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// export const createTeam = async (request, imageFile) => {
//     const json = JSON.stringify(request);
//     const blob = new Blob([json], { type: 'application/json' });
//     const formData = new FormData();
//     try {
//         formData.append('request', blob);
//         formData.append('file', imageFile);

//         const response = await apiClient.post('/team-management/teams', formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         console.error('Get error data:', error.response.data);
//         return error.response.data;
//     }
// };

export const createTeam = async (request, imageFile) => {
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

        const response = await apiClient.post('/team-management/teams', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        console.log('response api', response);

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};

export const updateTeam = async (request, imageFile) => {
    const formData = new FormData();
    try {
        const json = JSON.stringify(request);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append('request', blob);

        if (imageFile !== null) {
            formData.append('file', imageFile[0]);
        }

        const response = await apiClient.put('/team-management/teams', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};

// Testimonial
const testimonialPath = '/testimonial-management/testimonials';
export const getAllTestimonial = async (params) => {
    try {
        const response = await apiClient.get(testimonialPath, { params });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getTestimonialById = async (id) => {
    try {
        const response = await apiClient.get(`${testimonialPath}/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const createTestimonial = async (body) => {
    try {
        const response = await apiClient.post(testimonialPath, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const updateTestimonial = async (body) => {
    try {
        const response = await apiClient.put(testimonialPath, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const deleteTestimonial = async (id) => {
    try {
        const response = await apiClient.delete(`${testimonialPath}/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getLOVClient = async () => {
    try {
        const response = await apiClient.get('/lov-management/client-option-lists');
        return response.data;
    } catch (error) {
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
export const getAllExpertiseCategory1 = async (params) => {
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

export const getExpertiseCategoryById1 = async (id) => {
    try {
        const response = await apiClient.get(`/expertise-category-management/expertise-categories/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};

export const createExpertiseCategory1 = async (request, imageFile) => {
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

export const updateExpertiseCategory1 = async (request, imageFile) => {
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

export const deleteExpertiseCategory1 = async (id) => {
    try {
        const response = await apiClient.delete(`/expertise-category-management/expertise-categories/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        return error.response.data;
    }
};

//Visitor
const visitorPath =  '/visitor-management/visitors';
export const getAllVisitor = async (params) => {
    try {
        const response = await apiClient.get(`${visitorPath}`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Get error data:', error.response.data);
        // throw error;
        return error.response.data;
    }
};

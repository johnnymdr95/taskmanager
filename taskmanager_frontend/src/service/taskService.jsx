import {apiClient} from "./api";



export const retrieveAllTasksForUsernameApi = (username, token) => apiClient.get(`/api/tasks`, {
    headers: { Authorization: token},
});

export const createTaskApi = async (token, newTask) => {
    const response = await apiClient.post('/api/tasks/', newTask, {
        headers: {Authorization: token}
    });
    return response;
};


export const deleteTaskApi = (id, token) => apiClient.delete(`/api/tasks/${id}`, {
    headers: { Authorization: token},
});

export const updateTaskApi = (token,taskData) => apiClient.put(`/api/tasks/${taskData.id}`, taskData,{
    headers: { Authorization: token},
});


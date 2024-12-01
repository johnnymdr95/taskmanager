import {apiClient} from "./api";

export const getDashboardStats = async (username, token) => {
    try {
        const response = await apiClient.get("/api/dashboard/stats", {
            headers: {Authorization: token},
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw error;
    }
};
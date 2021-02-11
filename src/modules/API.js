import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://data.jsdelivr.com/v1",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export default {
    getPackages() {
        return apiClient.get(`/stats/packages`);
    },
    getTagPackage(obj) {
        return apiClient.get(`/package/${obj.type}/${obj.name}`);
    },
    getVersionsPackage(obj) {
        return apiClient.get(`/package/${obj.type}/${obj.name}/stats`);
    },
    getFilesPackage(obj, tmp) {
        return apiClient.get(`/package/${obj.type}/${obj.name}@${tmp.tag}`);
    }
};



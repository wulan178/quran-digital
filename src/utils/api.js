import axios from "axios";

export const apiUrl = process.env.API_URL;

const api = axios.create({
    baseURL: apiUrl,
});

export const getSurahList = async () => {
    return await api.get(`/api/v2/surat`);
};

export const getSurahDetail = async (id) => {
    return await api.get(`/api/v2/surat/${id}`);
};

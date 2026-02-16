import axiosInstance from "./axiosConfig";

export const getUsuarios = async () => {
    try {
        const response = await axiosInstance.get("/User/usuarios");
        return response.data;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw error;
    }
};

export const login = async (data) => {
    try {
        const response = await axiosInstance.post("/User/usuario/login", data);
        return response.data;
    } catch (error) {
        console.error("Error al comprobar usuario:", error);
        throw error;
    }
};
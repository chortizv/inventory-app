import axiosInstance from "./axiosConfig";

export const getFuncionarios = async () => {
    try {
        const response = await axiosInstance.get("/Funcionario/funcionarios");
        return response.data;
    } catch (error) {
        console.error("Error al obtener funcionarios:", error);
        throw error;
    }
};

export const getHistorialFuncionario = async (id) => {
    try {
        const response = await axiosInstance.get(`/Funcionario/historial/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener historial de funcionario:", error);
        throw error;
    }
};

export const getFuncionarioById = async (id) => {
    try {
        const response = await axiosInstance.get(`/Funcionario/funcionario/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener funcionario:", error);
        throw error;
    }
};

export const eliminarFuncionario = async (id) => {
    try {
        const response = await axiosInstance.delete(`/Funcionario/eliminarFuncionario/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar funcionario:", error);
        throw error;
    }
};

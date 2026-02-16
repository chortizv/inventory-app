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
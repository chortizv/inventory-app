import axiosInstance from "./axiosConfig";

export const getCintas = async () => {
    try {
        const response = await axiosInstance.get('/Cinta/cintas');
        return response.data;
    } catch (error) {
        console.error('Error al obtener las cintas:', error);
        throw error;
    }
}

export const getCintaById = async (id) => {
    try {
        const response = await axiosInstance.get(`/Cinta/cintas/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la cinta:', error);
        throw error;
    }
}

export const createCinta = async (cinta) => {
    try {
        const response = await axiosInstance.post('/Cinta/crear', cinta);
        return response;
    } catch (error) {
        console.error('Error al crear la cinta:', error);
        throw error;
    }
}

export const updateCinta = async (cinta) => {
    try {
        const response = await axiosInstance.put('/Cinta/modificar', cinta);
        return response;
    } catch (error) {
        console.error('Error al actualizar la cinta:', error);
        throw error;
    }
}

export const deleteCinta = async (id) => {
    try {
        const response = await axiosInstance.delete(`/Cinta/eliminar/${id}`);
        return response;
    } catch (error) {
        console.error('Error al eliminar la cinta:', error);
        throw error;
    }
}
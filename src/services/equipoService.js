import axiosInstance from "./axiosConfig";

export const getEquipos = async () => {
    try {
        const response = await axiosInstance.get("/Equipo/equipos");
        return response.data;
    } catch (error) {
        console.error("Error al obtener equipos:", error);
        throw error;
    }
};

export const getEquipoBySerie = async (serie) => {
    try {
        const response = await axiosInstance.get(`/Equipo/equipo/${serie}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener equipo:", error);
        throw error;
    }
};

export const deleteEquipo = async (serie) => {
    try {
        const response = await axiosInstance.delete(`/Equipo/eliminarEquipo/${serie}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar equipo:", error);
        throw error;
    }
};

export const createEquipo = async (equipoData) => {
    try {
        const response = await axiosInstance.post("/Equipo/crearEquipo", equipoData);
        return response.data;
    } catch (error) {
        console.error("Error al crear equipo:", error);
        throw error;
    }
};

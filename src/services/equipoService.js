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

export const getEquiposDescripcion = async () => {
    try {
        const response = await axiosInstance.get("/Equipo/equipos-descripcion");
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

export const getEstados = async () => {
    try {
        const response = await axiosInstance.get("/Equipo/estados");
        return response.data;
    } catch (error) {
        console.error("Error al obtener estados:", error);
        throw error;
    }
};

export const getModelos = async () => {
    try {
        const response = await axiosInstance.get("/Equipo/modelos");
        return response.data;
    } catch (error) {
        console.error("Error al obtener modelos:", error);
        throw error;
    }
};

export const getModelosId = async (marcaId) => {
    try {
        const response = await axiosInstance.get(`/Equipo/modelo/${marcaId}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener modelos por marca:", error);
        throw error;
    }
};

export const getContratos = async () => {
    try {
        const response = await axiosInstance.get("/Equipo/contratos");
        return response.data;
    } catch (error) {
        console.error("Error al obtener contratos:", error);
        throw error;
    }
};

export const getTipoEquipo = async () => {
    try {
        const response = await axiosInstance.get("/Equipo/tipo-modelos");
        return response.data;
    } catch (error) {
        console.error("Error al obtener tipo de modelos:", error);
        throw error;
    }
};

export const getMarcas = async () => {
    try {
        const response = await axiosInstance.get("/Equipo/marcas");
        return response.data;
    } catch (error) {
        console.error("Error al obtener marcas:", error);
        throw error;
    }
};

export const postEquipo = async (equipoData) => {
    try {

        const json = {
            serie: equipoData.serie,
            nombre: equipoData.nombre,
            observacion: equipoData?.observacion || "",
            id_marca: equipoData.id_marca,
            id_modelo: equipoData.id_modelo,
            id_estado: equipoData.id_estado,
            id_contrato: equipoData.id_contrato,
            id_tipoequipo: equipoData.id_tipomodelo,
        }

        const response = await axiosInstance.post("/Equipo/crearEquipo", json);
        return response.data;
    } catch (error) {
        console.error("Error al crear equipo:", error);
        throw error;
    }
};

export const eliminarEquipo = async (serie) => {
    try {
        const response = await axiosInstance.put(`/Equipo/eliminarEquipo/${serie}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar equipo:", error);
        throw error;
    }
};
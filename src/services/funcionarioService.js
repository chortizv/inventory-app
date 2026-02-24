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
        return response;
    } catch (error) {
        console.error("Error al eliminar funcionario:", error);
        throw error;
    }
};

export const getDepartamentos = async () => {
    try {
        const response = await axiosInstance.get("/Funcionario/departamentos");
        return response.data;
    } catch (error) {
        console.error("Error al obtener departamentos:", error);
        throw error;
    }
};

export const getSubDepartamentos = async (id_departamento) => {
    try {
        const response = await axiosInstance.get(`/Funcionario/subdepartamento/${id_departamento}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener subdepartamentos:", error);
        throw error;
    }
};

export const getSecciones = async (id_subdepartamento) => {
    try {
        const response = await axiosInstance.get(`/Funcionario/seccion/${id_subdepartamento}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener secciones:", error);
        throw error;
    }
};

export const getPrioridades = async () => {
    try {
        const response = await axiosInstance.get("/Funcionario/prioridades");
        return response.data;
    } catch (error) {
        console.error("Error al obtener prioridades:", error);
        throw error;
    }
};

export const agregarFuncionario = async (funcionario) => {
    try {

        const json = {
            "pnombre": funcionario.pnombre,
            "snombre": funcionario.snombre,
            "appaterno": funcionario.appaterno,
            "apmaterno": funcionario.apmaterno,
            "correo": funcionario.correo,
            "anexo": parseInt(funcionario.anexo),
            "cargo": funcionario.cargo,
            "teletrabajo": funcionario.teletrabajo,
            "notebook": funcionario.notebook,
            "validado": funcionario.validado,
            "id_seccion": funcionario.seccion,
            "id_prioridad": funcionario.prioridad
        }
        const response = await axiosInstance.post("/Funcionario/crearFuncionario", json);
        return response;
    } catch (error) {
        console.error("Error al crear funcionario:", error);
        throw error;
    }
};
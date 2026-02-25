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


export const agregarUsuario = async (data) => {
    try {
        const payload = {
            username: data.username,
            correo: data.correo,
            password: data.password,
            id_funcionario: data.funcionario,
        };
        const response = await axiosInstance.post("/User/crearUsuario", payload);
        return response;
    } catch (error) {
        console.error("Error al agregar usuario:", error);
        throw error;
    }
};

// export const eliminarUsuario = async (id) => {
//     try {
//         const response = await axiosInstance.delete(`/User/usuario/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error("Error al eliminar usuario:", error);
//         throw error;
//     }
// };
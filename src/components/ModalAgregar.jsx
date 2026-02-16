import { Modal, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import "../pages/equipo/Equipo.css";

const { TextArea } = Input;

const ModalAgregar = ({
    open,
    handleOk,
    confirmLoading,
    handleCancel,
}) => {

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            serie: "",
            nombre: "",
            observacion: "",
            id_modelo: "",
            id_estado: "",
            id_contrato: "",
        },
    });

    // Resetear formulario cuando se cierre el modal
    useEffect(() => {
        if (!open) {
            reset();
        }
    }, [open, reset]);

    const onSubmit = (data) => {
        console.log(data);
        handleOk?.(data); // enviamos data al padre si quieres
    };

    return (
        <Modal
            title="Agregar equipo"
            open={open}
            onOk={handleSubmit(onSubmit)}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText="Agregar"
            cancelText="Cancelar"
            okButtonProps={{
                className: "equipo-boton",
            }}
            cancelButtonProps={{
                className: "equipo-boton-eliminar",
            }}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

                {/* Serie */}
                <Controller
                    name="serie"
                    control={control}
                    rules={{ required: "La serie es obligatoria" }}
                    render={({ field }) => (
                        <>
                            <Input {...field} placeholder="Serie" />
                            {errors.serie && (
                                <span style={{ color: "red", fontSize: 12 }}>
                                    {errors.serie.message}
                                </span>
                            )}
                        </>
                    )}
                />

                {/* Nombre */}
                <Controller
                    name="nombre"
                    control={control}
                    rules={{ required: "El nombre es obligatorio" }}
                    render={({ field }) => (
                        <>
                            <Input {...field} placeholder="Nombre" />
                            {errors.nombre && (
                                <span style={{ color: "red", fontSize: 12 }}>
                                    {errors.nombre.message}
                                </span>
                            )}
                        </>
                    )}
                />

                {/* Observación */}
                <Controller
                    name="observacion"
                    control={control}
                    render={({ field }) => (
                        <TextArea {...field} placeholder="Observación" rows={3} />
                    )}
                />

                {/* Modelo */}
                <Controller
                    name="id_modelo"
                    control={control}
                    render={({ field }) => (
                        <Input {...field} placeholder="Modelo" />
                    )}
                />

                {/* Estado */}
                <Controller
                    name="id_estado"
                    control={control}
                    render={({ field }) => (
                        <Input {...field} placeholder="Estado" />
                    )}
                />

                {/* Contrato */}
                <Controller
                    name="id_contrato"
                    control={control}
                    render={({ field }) => (
                        <Input {...field} placeholder="Contrato" />
                    )}
                />

            </div>
        </Modal>
    );
};

export default ModalAgregar;

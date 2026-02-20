import { Modal, Input, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import "./Equipo.css";
import { getContratos, getEstados, getTipoEquipo, getMarcas, getModelosId } from "../../services/equipoService";

const { TextArea } = Input;

const ModalAgregar = ({
    open,
    handleOk,
    confirmLoading,
    handleCancel,
}) => {

    const [modelos, setModelos] = useState([]);
    const [estados, setEstados] = useState([]);
    const [contratos, setContratos] = useState([]);
    const [tipoEquipos, setTipoEquipos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [loadingModelos, setLoadingModelos] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        defaultValues: {
            serie: "",
            nombre: "",
            observacion: "",
            id_marca: null,
            id_modelo: null,
            id_estado: null,
            id_contrato: null,
            id_tipoequipo: null,
        },
    });

    useEffect(() => {
        if (!open) {
            reset();
            setModelos([]);
        }
    }, [open, reset]);

    const onSubmit = (data) => {
        console.log(data);
        handleOk?.(data);
    };

    useEffect(() => {
        // const fetchData = async () => {
        //     const data = await getModelos();
        //     setModelos(data);
        // };
        const fetchData2 = async () => {
            const data = await getEstados();
            setEstados(data);
        };
        const fetchData3 = async () => {
            const data = await getContratos();
            setContratos(data);
        };
        const fetchData4 = async () => {
            const data = await getTipoEquipo();
            setTipoEquipos(data);
        };
        const fetchData5 = async () => {
            const data = await getMarcas();
            setMarcas(data);
        };
        // fetchData();
        fetchData2();
        fetchData3();
        fetchData4();
        fetchData5();
    }, []);

    const handleMarcaChange = async (marcaId) => {
        setValue("id_modelo", null);
        if (marcaId) {
            setLoadingModelos(true);
            try {
                const data = await getModelosId(marcaId);
                setModelos(data);
            } catch (error) {
                console.error("Error cargando modelos", error);
            } finally {
                setLoadingModelos(false);
            }
        } else {
            setModelos([]);
        }
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

                <Controller
                    name="nombre"
                    control={control}
                    rules={{ required: "El nombre es obligatorio" }}
                    render={({ field }) => (
                        <>
                            <Input rules={{ required: "El nombre es obligatorio" }} {...field} placeholder="Nombre" />
                            {errors.nombre && (
                                <span style={{ color: "red", fontSize: 12 }}>
                                    {errors.nombre.message}
                                </span>
                            )}
                        </>
                    )}
                />

                <Controller
                    name="observacion"
                    control={control}
                    render={({ field }) => (
                        <TextArea {...field} placeholder="Observación" rows={3} style={{ resize: "none" }} />
                    )}
                />

                <Controller
                    name="id_marca"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            rules={{ required: "La marca es obligatoria" }}
                            placeholder="Seleccionar marca"
                            onChange={(value) => {
                                field.onChange(value);
                                handleMarcaChange(value)
                            }}
                            options={marcas.map((marca) => ({
                                value: marca.id_marca,
                                label: marca.descripcion,
                            }))}
                        />
                    )}
                />

                <Controller
                    name="id_modelo"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            rules={{ required: "El modelo es obligatorio" }}
                            loading={loadingModelos}
                            disabled={!modelos.length}
                            placeholder="Seleccionar modelo"
                            options={modelos.map((modelo) => ({
                                value: modelo.id_modelo,
                                label: modelo.descripcion,
                            }))}
                        />
                    )}
                />

                <Controller
                    name="id_tipomodelo"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            rules={{ required: "El tipo de equipo es obligatorio" }}
                            placeholder="Seleccionar tipo de equipo"
                            options={tipoEquipos.map((tipoEquipo) => ({
                                value: tipoEquipo.id_tipomodelo,
                                label: tipoEquipo.descripcion,
                            }))}
                        />
                    )}
                />

                <Controller
                    name="id_estado"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            rules={{ required: "El estado es obligatorio" }}
                            placeholder="Seleccionar estado"
                            options={estados.map((estado) => ({
                                value: estado.id_estado,
                                label: estado.descripcion,
                            }))}
                        />
                    )}
                />

                <Controller
                    name="id_contrato"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            rules={{ required: "El contrato es obligatorio" }}
                            placeholder="Seleccionar contrato"
                            options={contratos.map((contrato) => ({
                                value: contrato.id_contrato,
                                label: contrato.nomcontrato,
                            }))}
                        />
                    )}
                />

            </div>
        </Modal>
    );
};

export default ModalAgregar;

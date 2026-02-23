import {
    Modal,
    Input,
    Select,
    Typography,
    Divider,
    Row,
    Col
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import {
    getContratos,
    getEstados,
    getTipoEquipo,
    getMarcas,
    getModelosId
} from "../../services/equipoService";

const { TextArea } = Input;
const { Title, Text } = Typography;

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
        handleOk?.(data);
    };

    useEffect(() => {
        const fetchData = async () => {
            setEstados(await getEstados());
            setContratos(await getContratos());
            setTipoEquipos(await getTipoEquipo());
            setMarcas(await getMarcas());
        };
        fetchData();
    }, []);

    const handleMarcaChange = async (marcaId) => {
        setValue("id_modelo", null);
        if (marcaId) {
            setLoadingModelos(true);
            try {
                const data = await getModelosId(marcaId);
                setModelos(data);
            } finally {
                setLoadingModelos(false);
            }
        } else {
            setModelos([]);
        }
    };

    return (
        <Modal
            open={open}
            onOk={handleSubmit(onSubmit)}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText="Guardar equipo"
            cancelText="Cancelar"
            okButtonProps={{
                type: "primary",
                size: "middle"
            }}
            width={650}
            centered
        >
            <Title level={4} style={{ marginBottom: 0 }}>
                Nuevo equipo
            </Title>

            <Text type="secondary">
                Completa la información para registrar el equipo
            </Text>

            <Divider />

            <Row gutter={[4, 16]}>

                <Col span={12}>
                    <Controller
                        name="serie"
                        control={control}
                        rules={{ required: "La serie es obligatoria" }}
                        render={({ field }) => (
                            <>
                                <Input
                                    {...field}
                                    placeholder="Serie"
                                    status={errors.serie ? "error" : ""}
                                />
                                {errors.serie && (
                                    <Text type="danger" style={{ fontSize: 12 }}>
                                        {errors.serie.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                </Col>

                <Col span={12}>
                    <Controller
                        name="nombre"
                        control={control}
                        rules={{ required: "El nombre es obligatorio" }}
                        render={({ field }) => (
                            <>
                                <Input
                                    {...field}
                                    placeholder="Nombre del equipo"
                                    status={errors.nombre ? "error" : ""}
                                />
                                {errors.nombre && (
                                    <Text type="danger" style={{ fontSize: 12 }}>
                                        {errors.nombre.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                </Col>

                <Col span={24}>
                    <Controller
                        name="observacion"
                        control={control}
                        render={({ field }) => (
                            <TextArea
                                {...field}
                                placeholder="Observación (opcional)"
                                rows={3}
                                style={{ resize: "none" }}
                            />
                        )}
                    />
                </Col>

                <Col span={8}>
                    <Controller
                        name="id_marca"
                        control={control}
                        rules={{ required: "La marca es obligatoria" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                style={{ width: "100%" }}
                                placeholder="Seleccionar marca"
                                status={errors.id_marca ? "error" : ""}
                                onChange={(value) => {
                                    field.onChange(value);
                                    handleMarcaChange(value);
                                }}
                                options={marcas.map((marca) => ({
                                    value: marca.id_marca,
                                    label: marca.descripcion,
                                }))}
                            />
                        )}
                    />
                </Col>

                <Col span={8} >
                    <Controller
                        name="id_modelo"
                        control={control}
                        rules={{ required: "El modelo es obligatorio" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                style={{ width: "100%" }}
                                loading={loadingModelos}
                                disabled={!modelos.length}
                                placeholder="Seleccionar modelo"
                                status={errors.id_modelo ? "error" : ""}
                                options={modelos.map((modelo) => ({
                                    value: modelo.id_modelo,
                                    label: modelo.descripcion,
                                }))}
                            />
                        )}
                    />
                </Col>

                <Col span={8}>
                    <Controller
                        name="id_tipoequipo"
                        control={control}
                        rules={{ required: "El tipo es obligatorio" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                style={{ width: "100%" }}
                                placeholder="Tipo de equipo"
                                status={errors.id_tipoequipo ? "error" : ""}
                                options={tipoEquipos.map((tipo) => ({
                                    value: tipo.id_tipomodelo,
                                    label: tipo.descripcion,
                                }))}
                            />
                        )}
                    />
                </Col>

                <Col span={12}>
                    <Controller
                        name="id_estado"
                        control={control}
                        rules={{ required: "El estado es obligatorio" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                style={{ width: "100%" }}
                                placeholder="Estado"
                                status={errors.id_estado ? "error" : ""}
                                options={estados.map((estado) => ({
                                    value: estado.id_estado,
                                    label: estado.descripcion,
                                }))}
                            />
                        )}
                    />
                </Col>

                <Col span={12}>
                    <Controller
                        name="id_contrato"
                        control={control}
                        rules={{ required: "El contrato es obligatorio" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                style={{ width: "100%" }}
                                placeholder="Contrato"
                                status={errors.id_contrato ? "error" : ""}
                                options={contratos.map((contrato) => ({
                                    value: contrato.id_contrato,
                                    label: contrato.nomcontrato,
                                }))}
                            />
                        )}
                    />
                </Col>

            </Row>
        </Modal>
    );
};

export default ModalAgregar;
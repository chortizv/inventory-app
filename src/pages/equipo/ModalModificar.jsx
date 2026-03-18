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
    getModelosId,
    getEquipoBySerie,
    getMarcaModelosId
} from "../../services/equipoService";

const { TextArea } = Input;
const { Title, Text } = Typography;

const ModalModificar = ({
    open,
    handleOk,
    confirmLoading,
    handleCancel,
    serie
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

    useEffect(() => {

        const fetchCatalogos = async () => {
            try {

                const [
                    estadosData,
                    contratosData,
                    tipoEquiposData,
                    marcasData
                ] = await Promise.all([
                    getEstados(),
                    getContratos(),
                    getTipoEquipo(),
                    getMarcas()
                ]);

                setEstados(estadosData);
                setContratos(contratosData);
                setTipoEquipos(tipoEquiposData);
                setMarcas(marcasData);

            } catch (error) {
                console.error("Error cargando catálogos:", error);
            }
        };

        fetchCatalogos();

    }, []);

    const fetchEquipo = async (serie) => {

        if (!serie) return;

        try {

            const equipoResponse = await getEquipoBySerie(serie);
            const equipo = equipoResponse[0];

            let marcaId = equipo.id_marca;

            if (!marcaId && equipo.id_modelo) {

                const marcaData = await getMarcaModelosId(equipo.id_modelo);
                marcaId = marcaData[0].id_marca;

            }

            if (marcaId) {

                setLoadingModelos(true);

                const dataModelos = await getModelosId(marcaId);

                setModelos(dataModelos);

                setLoadingModelos(false);

            }

            reset({
                serie: equipo.serie,
                nombre: equipo.nombre,
                observacion: equipo.observacion,
                id_marca: marcaId,
                id_modelo: equipo.id_modelo,
                id_estado: equipo.id_estado,
                id_contrato: equipo.id_contrato,
                id_tipoequipo: equipo.id_tipoequipo,
            });

        } catch (error) {
            console.error("Error cargando equipo:", error);
        }

    };

    useEffect(() => {

        if (open) {
            fetchEquipo(serie);
        }

    }, [open, serie]);

    const handleMarcaChange = async (marcaId) => {

        setValue("id_modelo", null);

        if (!marcaId) {
            setModelos([]);
            return;
        }

        try {

            setLoadingModelos(true);

            const data = await getModelosId(marcaId);

            setModelos(data);

        } catch (error) {

            console.error("Error cargando modelos:", error);

        } finally {

            setLoadingModelos(false);

        }

    };

    const onSubmit = (data) => {
        handleOk?.(data);
    };

    return (
        <Modal
            open={open}
            onOk={handleSubmit(onSubmit)}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText="Guardar cambios"
            cancelText="Cancelar"
            width={650}
            centered
        >
            <Title level={4} style={{ marginBottom: 0 }}>
                Modificar equipo
            </Title>

            <Text type="secondary">
                Actualiza la información del equipo
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
                                <Input {...field} disabled placeholder="Serie" />
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
                                    onChange={(e) => {
                                        const value = e.target.value
                                            .replace(/[^a-zA-Z0-9-]/g, "")
                                            .toUpperCase();
                                        field.onChange(value);
                                    }}
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
                                maxLength={140}
                                showCount
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
                                placeholder="Marca"
                                style={{ width: "100%" }}
                                onChange={(value) => {
                                    field.onChange(value);
                                    handleMarcaChange(value);
                                }}
                                options={marcas.map((m) => ({
                                    value: m.id_marca,
                                    label: m.descripcion
                                }))}
                            />
                        )}
                    />
                </Col>

                <Col span={8}>
                    <Controller
                        name="id_modelo"
                        control={control}
                        rules={{ required: "El modelo es obligatorio" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                placeholder="Modelo"
                                loading={loadingModelos}
                                style={{ width: "100%" }}
                                options={modelos.map((m) => ({
                                    value: m.id_modelo,
                                    label: m.descripcion
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
                                placeholder="Tipo equipo"
                                style={{ width: "100%" }}
                                options={tipoEquipos.map((t) => ({
                                    value: t.id_tipomodelo,
                                    label: t.descripcion
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
                                placeholder="Estado"
                                style={{ width: "100%" }}
                                options={estados.map((e) => ({
                                    value: e.id_estado,
                                    label: e.descripcion
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
                                placeholder="Contrato"
                                style={{ width: "100%" }}
                                options={contratos.map((c) => ({
                                    value: c.id_contrato,
                                    label: c.nomcontrato
                                }))}
                            />
                        )}
                    />
                </Col>

            </Row>
        </Modal>
    );
};

export default ModalModificar;
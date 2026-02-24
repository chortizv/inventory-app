import {
    Modal,
    Input,
    Select,
    Checkbox,
    Typography,
    Divider,
    Row,
    Col
} from "antd";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { getDepartamentos, getPrioridades, getSecciones, getSubDepartamentos } from "../../services/funcionarioService";

const { Text, Title } = Typography;

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
        setValue,
    } = useForm({
        defaultValues: {
            pnombre: "",
            snombre: "",
            appaterno: "",
            apmaterno: "",
            correo: "",
            anexo: 0,
            teletrabajo: false,
            notebook: false,
            validado: false,
            seccion: null,
            prioridad: null,
            subdepartamento: null,
            departamento: null,
        },
    });

    const [prioridades, setPrioridades] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [subDepartamentos, setSubDepartamentos] = useState([]);
    const [secciones, setSecciones] = useState([]);

    const [loadingPrioridades, setLoadingPrioridades] = useState(false);
    const [loadingDepartamentos, setLoadingDepartamentos] = useState(false);
    const [loadingSubDepartamentos, setLoadingSubDepartamentos] = useState(false);
    const [loadingSecciones, setLoadingSecciones] = useState(false);

    const fetchPrioridades = async () => {
        try {
            setLoadingPrioridades(true);
            const data = await getPrioridades();
            setPrioridades(data);
        } catch (error) {
            console.error("Error al obtener prioridades:", error);
        } finally {
            setLoadingPrioridades(false);
        }
    };

    const fetchDepartamentos = async () => {
        try {
            setLoadingDepartamentos(true);
            const data = await getDepartamentos();
            setDepartamentos(data);
        } catch (error) {
            console.error("Error al obtener departamentos:", error);
        } finally {
            setLoadingDepartamentos(false);
        }
    };

    const fetchSubdepartamentos = async (idDepartamento) => {
        try {
            setLoadingSubDepartamentos(true);
            const data = await getSubDepartamentos(idDepartamento);
            setSubDepartamentos(data);
        } catch (error) {
            console.error("Error al obtener subdepartamentos:", error);
        } finally {
            setLoadingSubDepartamentos(false);
        }
    };

    const fetchSecciones = async (idSubdepartamento) => {
        try {
            setLoadingSecciones(true);
            const data = await getSecciones(idSubdepartamento);
            setSecciones(data);
        } catch (error) {
            console.error("Error al obtener secciones:", error);
        } finally {
            setLoadingSecciones(false);
        }
    };

    const onSubmit = (data) => {
        handleOk?.(data);
    };

    const handleDepartamentoChange = async (idDepartamento) => {
        setSubDepartamentos([]);
        setSecciones([]);
        setValue("subdepartamento", null);
        setValue("seccion", null);
        if (idDepartamento) {
            setLoadingSubDepartamentos(true);
            try {
                fetchSubdepartamentos(idDepartamento);
            } finally {
                setLoadingSubDepartamentos(false);
            }
        } else {
            setSubDepartamentos([]);
        }
    };

    const handleSubdepartamentoChange = async (idSubdepartamento) => {
        setSecciones([]);
        setValue("seccion", null);
        if (idSubdepartamento) {
            setLoadingSecciones(true);
            try {
                fetchSecciones(idSubdepartamento);
            } finally {
                setLoadingSecciones(false);
            }
        } else {
            setSecciones([]);
        }
    };

    useEffect(() => {
        if (open) {
            fetchPrioridades();
            fetchDepartamentos();
        } else {
            reset();
            setSubDepartamentos([]);
            setSecciones([]);
        }
    }, [open]);

    return (
        <Modal
            open={open}
            onOk={handleSubmit(onSubmit)}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText="Guardar funcionario"
            cancelText="Cancelar"
            okButtonProps={{
                type: "primary",
                size: "middle"
            }}
            width={800}
            centered
        >
            <Title level={4} style={{ marginBottom: 0 }}>
                Nuevo funcionario
            </Title>

            <Text type="secondary">
                Completa la información para registrar el funcionario
            </Text>

            <Divider />

            <Row gutter={[4, 16]}>
                <Col span={12}>
                    <Controller
                        name="pnombre"
                        control={control}
                        rules={{ required: "El primer nombre es obligatorio" }}
                        render={({ field }) => (
                            <>
                                <Input
                                    {...field}
                                    placeholder="Primer nombre"
                                    status={errors.pnombre ? "error" : ""}
                                />
                                {errors.pnombre && (
                                    <Text type="danger" style={{ fontSize: 12 }}>
                                        {errors.pnombre.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                </Col>

                <Col span={12}>
                    <Controller
                        name="snombre"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Input
                                    {...field}
                                    placeholder="Segundo nombre (opcional)"
                                    status={errors.snombre ? "error" : ""}
                                />
                                {errors.snombre && (
                                    <Text type="danger" style={{ fontSize: 12 }}>
                                        {errors.snombre.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                </Col>
                <Col span={12}>
                    <Controller
                        name="appaterno"
                        control={control}
                        rules={{ required: "El apellido paterno es obligatorio" }}
                        render={({ field }) => (
                            <>
                                <Input
                                    {...field}
                                    placeholder="Apellido paterno"
                                    status={errors.appaterno ? "error" : ""}
                                />
                                {errors.appaterno && (
                                    <Text type="danger" style={{ fontSize: 12 }}>
                                        {errors.appaterno.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                </Col>
                <Col span={12}>
                    <Controller
                        name="apmaterno"
                        control={control}
                        rules={{ required: "El apellido materno es obligatorio" }}
                        render={({ field }) => (
                            <>
                                <Input
                                    {...field}
                                    placeholder="Apellido materno"
                                    status={errors.apmaterno ? "error" : ""}
                                />
                                {errors.apmaterno && (
                                    <Text type="danger" style={{ fontSize: 12 }}>
                                        {errors.apmaterno.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                </Col>
                <Col span={16}>
                    <Controller
                        name="correo"
                        control={control}
                        rules={{ required: "El correo es obligatorio" }}
                        render={({ field }) => (
                            <>
                                <Input
                                    {...field}
                                    placeholder="Correo"
                                    type="email"
                                    status={errors.correo ? "error" : ""}
                                />
                                {errors.correo && (
                                    <Text type="danger" style={{ fontSize: 12 }}>
                                        {errors.correo.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                </Col>
                <Col span={8} >
                    <Controller
                        name="prioridad"
                        control={control}
                        rules={{ required: "La prioridad es obligatoria" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                style={{ width: "100%" }}
                                loading={loadingPrioridades}
                                disabled={!prioridades.length}
                                placeholder="Seleccionar prioridad"
                                status={errors.prioridad ? "error" : ""}
                                onChange={(value) => {
                                    field.onChange(value);
                                }}
                                options={prioridades.map((prioridad) => ({
                                    value: prioridad.id_prioridad,
                                    label: prioridad.descripcion,
                                }))}
                            />
                        )}
                    />
                </Col>
                <Col span={6}>
                    <Controller
                        name="anexo"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Input
                                    {...field}
                                    placeholder="Anexo"
                                    status={errors.anexo ? "error" : ""}
                                />
                                {errors.anexo && (
                                    <Text type="danger" style={{ fontSize: 12 }}>
                                        {errors.anexo.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                </Col>
                <Col span={18}>
                    <Controller
                        name="cargo"
                        control={control}
                        rules={{ required: "El cargo es obligatorio" }}
                        render={({ field }) => (
                            <>
                                <Input
                                    {...field}
                                    placeholder="Cargo"
                                    status={errors.cargo ? "error" : ""}
                                />
                                {errors.cargo && (
                                    <Text type="danger" style={{ fontSize: 12 }}>
                                        {errors.cargo.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                </Col>
                <Col span={8}>
                    <Controller
                        name="teletrabajo"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Checkbox
                                    {...field}
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                >
                                    Realiza teletrabajo
                                </Checkbox>

                                {errors.teletrabajo && (
                                    <Text type="danger" style={{ fontSize: 12 }}>
                                        {errors.teletrabajo.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                </Col>
                <Col span={8}>
                    <Controller
                        name="notebook"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Checkbox
                                    {...field}
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                >
                                    Posee notebook
                                </Checkbox>

                                {errors.notebook && (
                                    <Text type="danger" style={{ fontSize: 12 }}>
                                        {errors.notebook.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                </Col>
                <Col span={8}>
                    <Controller
                        name="validado"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Checkbox
                                    {...field}
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                >
                                    Validado
                                </Checkbox>

                                {errors.validado && (
                                    <Text type="danger" style={{ fontSize: 12 }}>
                                        {errors.validado.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                </Col>
                <Col span={8} >
                    <Controller
                        name="departamento"
                        control={control}
                        rules={{ required: "El departamento es obligatorio" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                style={{ width: "100%" }}
                                loading={loadingDepartamentos}
                                disabled={!departamentos.length}
                                placeholder="Seleccionar departamento"
                                status={errors.departamento ? "error" : ""}
                                onChange={(value) => {
                                    field.onChange(value);
                                    handleDepartamentoChange(value);
                                }}
                                options={departamentos.map((departamento) => ({
                                    value: departamento.id_dep,
                                    label: departamento.descripcion,
                                }))}
                            />
                        )}
                    />
                </Col>
                <Col span={8} >
                    <Controller
                        name="subdepartamento"
                        control={control}
                        rules={{ required: "El subdepartamento es obligatorio" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                style={{ width: "100%" }}
                                loading={loadingSubDepartamentos}
                                disabled={!subDepartamentos.length}
                                placeholder="Seleccionar subdepartamento"
                                status={errors.subdepartamento ? "error" : ""}
                                onChange={(value) => {
                                    field.onChange(value);
                                    handleSubdepartamentoChange(value);
                                }}
                                options={subDepartamentos.map((subdepartamento) => ({
                                    value: subdepartamento.id_subdep,
                                    label: subdepartamento.descripcion,
                                }))}
                            />
                        )}
                    />
                </Col>
                <Col span={8} >
                    <Controller
                        name="seccion"
                        control={control}
                        rules={{ required: "La seccion es obligatoria" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                style={{ width: "100%" }}
                                loading={loadingSecciones}
                                disabled={!secciones.length}
                                placeholder="Seleccionar seccion"
                                status={errors.seccion ? "error" : ""}
                                options={secciones.map((seccion) => ({
                                    value: seccion.id_seccion,
                                    label: seccion.descripcion,
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
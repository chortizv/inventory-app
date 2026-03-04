import {
    Modal,
    Typography,
    Divider,
    Select,
    Col,
    Row,
    Input,
    DatePicker,
    Upload,
    Button
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getFuncionarios } from "../../services/funcionarioService";
import { getEquiposSA } from "../../services/equipoService";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const { Title, Text } = Typography;
const { TextArea } = Input;

const ModalAgregar = ({ open, handleOk, confirmLoading, handleCancel }) => {

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        defaultValues: {
            funcionario: null,
            equipo: null,
            fechaInicio: null,
            fechaTermino: null,
            observaciones: "",
            archivo: null
        }
    });

    const [funcionarios, setFuncionarios] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [loadingFuncionarios, setLoadingFuncionarios] = useState(false);
    const [loadingEquipos, setLoadingEquipos] = useState(false);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (open) {
            fetchFuncionarios();
            fetchEquipos();
        } else {
            reset();
            setFileList([]);
        }
    }, [open]);

    const fetchFuncionarios = async () => {
        setLoadingFuncionarios(true);
        try {
            const response = await getFuncionarios();
            setFuncionarios(response);
        } catch (error) {
            console.error("Error al obtener funcionarios:", error);
        } finally {
            setLoadingFuncionarios(false);
        }
    };

    const fetchEquipos = async () => {
        setLoadingEquipos(true);
        try {
            const response = await getEquiposSA();
            setEquipos(response);
        } catch (error) {
            console.error("Error al obtener equipos:", error);
        } finally {
            setLoadingEquipos(false);
        }
    };

    const onSubmit = (data) => {
        handleOk(data);
    };

    return (
        <Modal
            open={open}
            onOk={handleSubmit(onSubmit)}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText="Guardar asignación"
            cancelText="Cancelar"
            okButtonProps={{
                type: "primary",
                size: "middle"
            }}
            width={700}
        >
            <Title level={4} style={{ marginBottom: 0 }}>
                Nueva asignación
            </Title>

            <Text type="secondary">
                Completa la información para registrar la asignación del equipo
            </Text>

            <Divider />

            <Row gutter={[12, 16]}>

                <Col span={12}>
                    <Controller
                        name="funcionario"
                        control={control}
                        rules={{ required: "El funcionario es obligatorio" }}
                        render={({ field }) => (
                            <>
                                <Select
                                    {...field}
                                    showSearch
                                    optionFilterProp="label"
                                    style={{ width: "100%" }}
                                    loading={loadingFuncionarios}
                                    placeholder="Seleccionar funcionario"
                                    status={errors.funcionario ? "error" : ""}
                                    onChange={(value) => field.onChange(value)}
                                    options={funcionarios.map((f) => ({
                                        value: f.id_funcionario,
                                        label: `${f.pnombre} ${f.appaterno} ${f.apmaterno}`
                                    }))}
                                />
                                {errors.funcionario && (
                                    <Text type="danger" style={{ fontSize: 12 }}>
                                        {errors.funcionario.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                </Col>

                <Col span={12}>
                    <Controller
                        name="equipo"
                        control={control}
                        rules={{ required: "El equipo es obligatorio" }}
                        render={({ field }) => (
                            <>
                                <Select
                                    {...field}
                                    showSearch
                                    optionFilterProp="label"
                                    style={{ width: "100%" }}
                                    loading={loadingEquipos}
                                    placeholder="Seleccionar equipo"
                                    status={errors.equipo ? "error" : ""}
                                    onChange={(value) => field.onChange(value)}
                                    options={equipos.map((e) => ({
                                        value: e.serie,
                                        label: `${e.nombre} - ${e.serie}`
                                    }))}
                                />
                                {errors.equipo && (
                                    <Text type="danger" style={{ fontSize: 12 }}>
                                        {errors.equipo.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                </Col>

                <Col span={12}>
                    <Controller
                        name="fechaInicio"
                        control={control}
                        rules={{ required: "La fecha de inicio es obligatoria" }}
                        render={({ field }) => (
                            <>
                                <DatePicker
                                    {...field}
                                    style={{ width: "100%" }}
                                    placeholder="Fecha inicio"
                                    format="DD-MM-YYYY"
                                    status={errors.fechaInicio ? "error" : ""}
                                    onChange={(date) => field.onChange(date)}
                                />
                                {errors.fechaInicio && (
                                    <Text type="danger" style={{ fontSize: 12 }}>
                                        {errors.fechaInicio.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                </Col>

                <Col span={12}>
                    <Controller
                        name="fechaTermino"
                        control={control}
                        render={({ field }) => (
                            <>
                                <DatePicker
                                    {...field}
                                    style={{ width: "100%" }}
                                    placeholder="Fecha término (Opcional)"
                                    format="DD-MM-YYYY"
                                    status={errors.fechaTermino ? "error" : ""}
                                    onChange={(date) => field.onChange(date)}
                                />
                                {errors.fechaTermino && (
                                    <Text type="danger" style={{ fontSize: 12 }}>
                                        {errors.fechaTermino.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                </Col>

                <Col span={24}>
                    <Controller
                        name="observaciones"
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

                <Col span={24}>
                    <Controller
                        name="archivo"
                        control={control}
                        rules={{ required: "Debe adjuntar un archivo PDF" }}
                        render={({ field }) => (
                            <>
                                <Upload
                                    fileList={fileList}
                                    beforeUpload={(file) => {
                                        const isPdf = file.type === "application/pdf";
                                        if (!isPdf) {
                                            return Upload.LIST_IGNORE;
                                        }
                                        const newFileList = [file];

                                        setFileList(newFileList);
                                        field.onChange(file);

                                        return false;
                                    }}
                                    maxCount={1}
                                    accept="application/pdf"
                                >
                                    <Button icon={<UploadOutlined />}>
                                        Subir archivo (PDF)
                                    </Button>
                                </Upload>
                                {errors.archivo && (
                                    <Text type="danger" style={{ fontSize: 12 }}>
                                        {errors.archivo.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                </Col>

            </Row>
        </Modal>
    );
};

export default ModalAgregar;
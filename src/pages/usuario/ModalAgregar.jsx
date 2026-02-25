import { Button, Modal, Typography, Divider, Select, Col, Row, Input } from "antd";
import { getFuncionarios } from "../../services/funcionarioService";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const { Title, Text } = Typography;

const ModalAgregar = ({ open, handleOk, confirmLoading, handleCancel }) => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            username: "",
            correo: "",
            password: "",
            funcionario: null,
        },
    });
    const [loadingFuncionarios, setLoadingFuncionarios] = useState(false);
    const [funcionarios, setFuncionarios] = useState([]);

    useEffect(() => {
        if (open) {
            fetchFuncionarios();
        } else {
            reset();
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

    const onSubmit = (data) => {
        console.log(data);
        handleOk(data);
    };

    return (
        <Modal
            open={open}
            onOk={handleSubmit(onSubmit)}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText="Guardar usuario"
            cancelText="Cancelar"
            okButtonProps={{
                type: "primary",
                size: "middle"
            }}
        >
            <Title level={4} style={{ marginBottom: 0 }}>
                Nuevo usuario
            </Title>

            <Text type="secondary">
                Completa la información para registrar el usuario
            </Text>

            <Divider />

            <Row gutter={[4, 16]}>
                <Col span={12}>
                    <Controller
                        name="username"
                        control={control}
                        rules={{ required: "El nombre de usuario es obligatorio" }}
                        render={({ field }) => (
                            <>
                                <Input
                                    {...field}
                                    placeholder="Nombre de usuario"
                                    status={errors.username ? "error" : ""}
                                />
                                {errors.username && (
                                    <Text type="danger" style={{ fontSize: 12 }}>
                                        {errors.username.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                </Col>
                <Col span={12} >
                    <Controller
                        name="funcionario"
                        control={control}
                        rules={{ required: "El funcionario es obligatorio" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                showSearch
                                optionFilterProp="label"
                                style={{ width: "100%" }}
                                loading={loadingFuncionarios}
                                disabled={!funcionarios.length}
                                placeholder="Seleccionar funcionario"
                                status={errors.funcionario ? "error" : ""}
                                onChange={(value) => {
                                    field.onChange(value);
                                }}
                                options={funcionarios.map((funcionario) => ({
                                    value: funcionario.id_funcionario,
                                    label: funcionario.pnombre + " " + funcionario.appaterno + " " + funcionario.apmaterno,
                                }))}
                            />
                        )}
                    />
                </Col>
                <Col span={24}>
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
                <Col span={24}>
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: "La contraseña es obligatoria" }}
                        render={({ field }) => (
                            <>
                                <Input
                                    {...field}
                                    placeholder="Contraseña"
                                    type="password"
                                    status={errors.password ? "error" : ""}
                                />
                                {errors.password && (
                                    <Text type="danger" style={{ fontSize: 12 }}>
                                        {errors.password.message}
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
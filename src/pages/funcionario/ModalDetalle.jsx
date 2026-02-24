import {
    Modal,
    Spin,
    Typography,
    Descriptions,
    Alert,
    Tag,
    Divider,
    Button
} from "antd";
import { useState } from "react";

const { Title, Text } = Typography;

const ModalDetalle = ({ open, handleCancel, funcionarioSeleccionado }) => {
    const [loadingDetalle] = useState(false);

    const funcionario = funcionarioSeleccionado?.[0];

    const getColorPrioridad = (id) => {
        switch (id) {
            case 1: return "red";
            case 2: return "orange";
            case 3: return "green";
            default: return "default";
        }
    };

    return (
        <Modal
            open={open}
            onCancel={handleCancel}
            footer={[
                <Button key="close" type="primary" onClick={handleCancel}>
                    Cerrar
                </Button>
            ]}
            centered
            width={550}
        >
            {loadingDetalle ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <Spin size="large" />
                </div>
            ) : funcionario ? (
                <>
                    {/* HEADER */}
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div
                            style={{
                                width: 56,
                                height: 56,
                                borderRadius: "50%",
                                background: "#1677ff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                fontWeight: 600,
                                fontSize: 20
                            }}
                        >
                            {funcionario.pnombre?.charAt(0)}
                            {funcionario.appaterno?.charAt(0)}
                        </div>

                        <div>
                            <Title level={5} style={{ margin: 0 }}>
                                {funcionario.pnombre} {funcionario.snombre}{" "}
                                {funcionario.appaterno} {funcionario.apmaterno}
                            </Title>
                            <Text type="secondary">
                                {funcionario.cargo}
                            </Text>
                        </div>
                    </div>

                    <Divider />

                    {/* INFORMACIÓN GENERAL */}
                    <Divider orientation="left">Información General</Divider>

                    <Descriptions
                        column={1}
                        size="small"
                        labelStyle={{
                            fontWeight: 600,
                            width: 150,
                            color: "#595959"
                        }}
                        contentStyle={{
                            color: "#262626"
                        }}
                    >
                        <Descriptions.Item label="Correo">
                            {funcionario.correo}
                        </Descriptions.Item>

                        <Descriptions.Item label="Anexo">
                            {funcionario.anexo ? funcionario.anexo : "Sin anexo"}
                        </Descriptions.Item>

                        <Descriptions.Item label="Prioridad">
                            <Tag color={getColorPrioridad(funcionario.id_prioridad)}>
                                {funcionario.descripcionPrioridad}
                            </Tag>
                        </Descriptions.Item>
                    </Descriptions>

                    {/* UBICACIÓN ORGANIZACIONAL */}
                    <Divider orientation="left">
                        Ubicación Organizacional
                    </Divider>

                    <Descriptions
                        column={1}
                        size="small"
                        labelStyle={{
                            fontWeight: 600,
                            width: 150,
                            color: "#595959"
                        }}
                        contentStyle={{
                            color: "#262626"
                        }}
                    >
                        <Descriptions.Item label="Departamento">
                            {funcionario.descripcionDepto}
                        </Descriptions.Item>

                        <Descriptions.Item label="Subdepartamento">
                            {funcionario.descripcionSubDepto}
                        </Descriptions.Item>

                        <Descriptions.Item label="Sección">
                            {funcionario.descripcionSeccion}
                        </Descriptions.Item>
                    </Descriptions>
                </>
            ) : (
                <Alert
                    message="Error"
                    description="No se pudo obtener la información del funcionario"
                    type="error"
                    showIcon
                />
            )}
        </Modal>
    );
};

export default ModalDetalle;
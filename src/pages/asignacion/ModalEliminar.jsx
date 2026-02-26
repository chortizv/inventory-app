import { Modal, Spin, Alert, Divider, Descriptions, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const { Text, Title } = Typography;

const ModalEliminar = ({ open, handleOk, confirmLoading, handleCancel, AsignacionSeleccionada }) => {

    const onSubmit = () => {
        handleOk?.(AsignacionSeleccionada);
    };

    useEffect(() => {
        console.log("AsignacionSeleccionada", AsignacionSeleccionada);
    }, [AsignacionSeleccionada]);

    return (
        <Modal
            open={open}
            onOk={onSubmit}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText="Sí, eliminar"
            cancelText="Cancelar"
            okButtonProps={{
                danger: true,
                size: "middle"
            }}
            width={500}
            centered
        >
            {confirmLoading ? (
                <div style={{ textAlign: "center", padding: "30px 0" }}>
                    <Spin size="large" />
                </div>
            ) : AsignacionSeleccionada ? (
                <>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <ExclamationCircleOutlined style={{ color: "#ff4d4f", fontSize: 22 }} />
                        <Title level={4} style={{ margin: 0 }}>
                            Confirmar eliminación
                        </Title>
                    </div>

                    <Divider />
                    <Descriptions column={1} size="small" bordered>
                        <Descriptions.Item label="Serie">
                            <Text strong>{AsignacionSeleccionada.serie}</Text>
                        </Descriptions.Item>

                        <Descriptions.Item label="ID funcionario">
                            {AsignacionSeleccionada.id_funcionario}
                        </Descriptions.Item>

                        <Descriptions.Item label="Fecha inicio">
                            {AsignacionSeleccionada.fecha_inicio}
                        </Descriptions.Item>

                        <Descriptions.Item label="Fecha fin">
                            {AsignacionSeleccionada.fecha_fin}
                        </Descriptions.Item>
                        <Descriptions.Item label="Observacion">
                            {AsignacionSeleccionada.observacion}
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider />

                    <Alert
                        title="Esta acción no se puede deshacer"
                        description="Si eliminas esta asignación, la información asociada podría perderse permanentemente."
                        type="error"
                        showIcon
                    />
                </>
            ) : (
                <Alert
                    title="Error"
                    description="No se pudo obtener la información de la asignación"
                    type="error"
                    showIcon
                />
            )}
        </Modal>
    );
};

export default ModalEliminar;

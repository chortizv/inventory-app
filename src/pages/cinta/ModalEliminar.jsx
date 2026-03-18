import { Modal, Spin, Alert, Divider, Descriptions, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const { Text, Title } = Typography;

const ModalEliminar = ({ open, handleOk, confirmLoading, handleCancel, cintaSeleccionada }) => {

    const onSubmit = () => {
        handleOk?.(cintaSeleccionada);
    };

    useEffect(() => {
        console.log("CintaSeleccionada", cintaSeleccionada);
    }, [cintaSeleccionada]);

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
            ) : cintaSeleccionada ? (
                <>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <ExclamationCircleOutlined style={{ color: "#ff4d4f", fontSize: 22 }} />
                        <Title level={4} style={{ margin: 0 }}>
                            Confirmar eliminación
                        </Title>
                    </div>

                    <Divider />
                    <Descriptions column={1} size="small" bordered>
                        <Descriptions.Item label="Codigo">
                            <Text strong>{cintaSeleccionada.codigo}</Text>
                        </Descriptions.Item>

                        <Descriptions.Item label="Descripcion">
                            {cintaSeleccionada.descripcion}
                        </Descriptions.Item>

                        <Descriptions.Item label="Estado">
                            {cintaSeleccionada.estado}
                        </Descriptions.Item>
                        <Descriptions.Item label="descripcion">
                            {cintaSeleccionada.descripcion}
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider />

                    <Alert
                        title="Esta acción no se puede deshacer"
                        description="Si eliminas esta cinta, la información asociada podría perderse permanentemente."
                        type="error"
                        showIcon
                    />
                </>
            ) : (
                <Alert
                    title="Error"
                    description="No se pudo obtener la información de la cinta"
                    type="error"
                    showIcon
                />
            )}
        </Modal>
    );
};

export default ModalEliminar;

import {
    Modal,
    Spin,
    Typography,
    Descriptions,
    Alert,
    Tag,
    Divider
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Text, Title } = Typography;

const ModalEliminar = ({
    open,
    handleOk,
    confirmLoading,
    handleCancel,
    usuarioSeleccionado
}) => {
    const [loadingDetalle, setLoadingDetalle] = useState(false);

    const onSubmit = () => {
        handleOk?.(usuarioSeleccionado[0].id_usuario);
    };
    return (
        <Modal
            title="Eliminar usuario"
            open={open}
            onOk={onSubmit}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            {loadingDetalle ? (
                <div style={{ textAlign: "center", padding: "30px 0" }}>
                    <Spin size="large" />
                </div>
            ) : usuarioSeleccionado ? (
                <>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <ExclamationCircleOutlined style={{ color: "#ff4d4f", fontSize: 22 }} />
                        <Title level={4} style={{ margin: 0 }}>
                            Confirmar eliminación
                        </Title>
                    </div>

                    <Divider />
                    <Descriptions column={1} size="small" bordered>

                        <Descriptions.Item label="Username">
                            {usuarioSeleccionado[0].username}
                        </Descriptions.Item>

                        <Descriptions.Item label="Correo">
                            {usuarioSeleccionado[0].correo}
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider />

                    <Alert
                        title="Esta acción no se puede deshacer"
                        description="Si eliminas este usuario, la información asociada podría perderse permanentemente."
                        type="error"
                        showIcon
                    />
                </>
            ) : (
                <Alert
                    title="Error"
                    description="No se pudo obtener la información del usuario"
                    type="error"
                    showIcon
                />
            )}
        </Modal>
    );
};

export default ModalEliminar;
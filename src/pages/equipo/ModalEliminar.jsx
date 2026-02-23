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

const { Text, Title } = Typography;

const ModalEliminar = ({
    open,
    handleOk,
    confirmLoading,
    handleCancel,
    equipoDetalle,
    loadingDetalle
}) => {

    const onSubmit = () => {
        handleOk?.(equipoDetalle);
    };

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
            {loadingDetalle ? (
                <div style={{ textAlign: "center", padding: "30px 0" }}>
                    <Spin size="large" />
                </div>
            ) : equipoDetalle ? (
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
                            <Text strong>{equipoDetalle[0].serie}</Text>
                        </Descriptions.Item>

                        <Descriptions.Item label="Nombre">
                            {equipoDetalle[0].nombre}
                        </Descriptions.Item>

                        <Descriptions.Item label="Modelo">
                            {equipoDetalle[0].descripcionModelo}
                        </Descriptions.Item>

                        <Descriptions.Item label="Tipo">
                            {equipoDetalle[0].descripcionTipo}
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider />

                    <Alert
                        title="Esta acción no se puede deshacer"
                        description="Si eliminas este equipo, la información asociada podría perderse permanentemente."
                        type="error"
                        showIcon
                    />
                </>
            ) : (
                <Alert
                    title="Error"
                    description="No se pudo obtener la información del equipo"
                    type="error"
                    showIcon
                />
            )}
        </Modal>
    );
};

export default ModalEliminar;
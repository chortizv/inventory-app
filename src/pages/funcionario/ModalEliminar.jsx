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
    funcionarioSeleccionado,
}) => {

    const [loadingDetalle, setLoadingDetalle] = useState(false);

    const onSubmit = () => {
        handleOk?.(funcionarioSeleccionado);
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
            ) : funcionarioSeleccionado ? (
                <>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <ExclamationCircleOutlined style={{ color: "#ff4d4f", fontSize: 22 }} />
                        <Title level={4} style={{ margin: 0 }}>
                            Confirmar eliminación
                        </Title>
                    </div>

                    <Divider />
                    <Descriptions column={1} size="small" bordered>
                        <Descriptions.Item label="ID">
                            <Text strong>{funcionarioSeleccionado[0].id_funcionario}</Text>
                        </Descriptions.Item>

                        <Descriptions.Item label="Nombre">
                            {funcionarioSeleccionado[0].pnombre}
                        </Descriptions.Item>

                        <Descriptions.Item label="Apellido">
                            {funcionarioSeleccionado[0].appaterno}
                        </Descriptions.Item>

                        <Descriptions.Item label="Apellido Materno">
                            {funcionarioSeleccionado[0].apmaterno}
                        </Descriptions.Item>

                        <Descriptions.Item label="Cargo">
                            {funcionarioSeleccionado[0].cargo}
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider />

                    <Alert
                        title="Esta acción no se puede deshacer"
                        description="Si eliminas este funcionario, la información asociada podría perderse permanentemente."
                        type="error"
                        showIcon
                    />
                </>
            ) : (
                <Alert
                    title="Error"
                    description="No se pudo obtener la información del funcionario"
                    type="error"
                    showIcon
                />
            )}
        </Modal>
    );
};

export default ModalEliminar;
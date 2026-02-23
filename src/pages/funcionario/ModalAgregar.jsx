import { Modal } from "antd";

const ModalAgregar = ({
    open,
    handleOk,
    confirmLoading,
    handleCancel,
}) => {
    return (
        <Modal
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText="Guardar funcionario"
            cancelText="Cancelar"
            okButtonProps={{
                type: "primary",
                size: "middle"
            }}
            width={500}
            centered
        >
            <h1>Modal Agregar Funcionario</h1>
        </Modal>
    );
};

export default ModalAgregar;
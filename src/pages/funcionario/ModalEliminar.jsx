import { Modal } from "antd";

const ModalEliminar = ({
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
            okText="Sí, eliminar"
            cancelText="Cancelar"
            okButtonProps={{
                danger: true,
                size: "middle"
            }}
            width={500}
            centered
        >
            <h1>Modal Eliminar Funcionario</h1>
        </Modal>
    );
};

export default ModalEliminar;
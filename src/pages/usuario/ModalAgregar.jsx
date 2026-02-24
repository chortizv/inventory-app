import { Button, Modal } from "antd";

const ModalAgregar = ({ open, handleOk, confirmLoading, handleCancel }) => {
    return (
        <Modal
            title="Agregar usuario"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancelar
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    Agregar
                </Button>,
            ]}
        >
            <p>Modal Agregar</p>
        </Modal>
    );
};

export default ModalAgregar;
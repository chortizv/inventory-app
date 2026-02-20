import { Modal, Spin } from "antd";
import "./Equipo.css";

const ModalEliminar = ({
    open,
    handleOk,
    confirmLoading,
    handleCancel,
    equipoDetalle,
    loadingDetalle
}) => {

    const onSubmit = (equipoDetalle) => {
        console.log(equipoDetalle);
        handleOk?.(equipoDetalle);
    };

    return (
        <Modal
            title="Eliminar equipo"
            open={open}
            onOk={onSubmit}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText="Eliminar"
            cancelText="Cancelar"
            okButtonProps={{
                className: "equipo-boton",
            }}
            cancelButtonProps={{
                className: "equipo-boton-eliminar",
            }}
        >
            {loadingDetalle ? (
                <Spin />
            ) : equipoDetalle ? (
                <>
                    <p><strong>Serie:</strong> {equipoDetalle.serie}</p>
                    <p><strong>Nombre:</strong> {equipoDetalle.nombre}</p>
                    <p><strong>Modelo:</strong> {equipoDetalle.id_modelo}</p>
                    <p style={{ color: "red" }}>
                        ¿Estás seguro que deseas eliminar este equipo?
                    </p>
                </>
            ) : (
                <p>No se encontró información</p>
            )}
        </Modal>
    );
};

export default ModalEliminar;
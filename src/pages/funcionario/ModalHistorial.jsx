import { Button, Modal, Space, Table } from "antd";
import "./Funcionario.css";
import config from "../../../config.js";
import {
    DownloadOutlined
} from '@ant-design/icons';

const ModalHistorial = ({
    open,
    handleOk,
    confirmLoading,
    historial,
    mensajeError,
}) => {

    const columns = [
        {
            title: "ID",
            dataIndex: "id_asignacion",
            key: "id_asignacion",
        },
        {
            title: "Equipo",
            dataIndex: "serie",
            key: "serie",
        },
        {
            title: "Fecha Inicio",
            dataIndex: "fecha_inicio",
            key: "fecha_inicio",
        },
        {
            title: "Fecha Fin",
            dataIndex: "fecha_fin",
            key: "fecha_fin",
        },
        {
            title: "Observación",
            dataIndex: "observacion",
            key: "observacion",
        },
        {
            title: "",
            key: "action",
            render: (_, record) => (
                <Space>
                    {record.url_archivo && (
                        <a
                            href={`${config.BASE_URL}${record.url_archivo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                        >
                            <Button color="primary" variant="outlined">
                                <DownloadOutlined />
                            </Button>
                        </a>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <Modal
            title="Historial"
            open={open}
            width="50%"
            style={{ top: 20 }}
            confirmLoading={confirmLoading}
            footer={[
                <Button
                    key="ok"
                    type="btn"
                    onClick={handleOk}
                    className="funcionario-boton"
                >
                    Aceptar
                </Button>,
            ]}
        >
            {mensajeError ? (
                <h3 style={{ textAlign: "center", color: "#09153E" }}>
                    {mensajeError}
                </h3>
            ) : (
                <Table
                    columns={columns}
                    dataSource={historial}
                    rowKey="id_asignacion"
                    scroll={{ x: "max-content" }}
                    pagination={{
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} de ${total}`,
                        size: "small",
                    }}
                />
            )}

        </Modal>
    );
};

export default ModalHistorial;

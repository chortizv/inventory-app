import { useEffect, useState } from 'react';
import { Breadcrumb, Table, theme, Input, Button, Tag, Space, message, Tooltip } from 'antd';
import {
    DeleteOutlined,
    DownloadOutlined,
    MessageOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { agregarAsignacion, eliminarAsignacion, getAsignacionById, getAsignaciones } from '../../services/funcionarioService';
import ModalAgregar from './ModalAgregar';
import config from '../../../config';
import ModalEliminar from './ModalEliminar';

const Asignacion = () => {
    const [asignaciones, setAsignaciones] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [openAgregar, setOpenAgregar] = useState(false);
    const [openEliminar, setOpenEliminar] = useState(false);
    const [confirmLoadingAgregar, setConfirmLoadingAgregar] = useState(false);
    const [confirmLoadingEliminar, setConfirmLoadingEliminar] = useState(false);
    const [AsignacionSeleccionada, setAsignacionSeleccionada] = useState(null);
    const [mensajeError, setMensajeError] = useState('');

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const tieneObservacion = (obs) => {
        return obs && obs.trim() !== "";
    };

    const fetchAsignaciones = async () => {
        try {
            const response = await getAsignaciones();
            setAsignaciones(response);
        } catch (error) {
            console.error("Error al obtener funcionarios:", error);
        }
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id_asignacion",
            key: "id_asignacion",
        },
        {
            title: "ID Funcionario",
            dataIndex: "id_funcionario",
            key: "id_funcionario",
        },
        {
            title: "Serie",
            dataIndex: "serie",
            key: "serie",
        },
        {
            title: "Fecha de inicio",
            dataIndex: "fecha_inicio",
            key: "fecha_inicio",
        },
        {
            title: "Fecha de fin",
            dataIndex: "fecha_fin",
            key: "fecha_fin",
        },
        {
            title: "Estado",
            dataIndex: "estado",
            key: "estado",
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (_, record) => (
                <Space>
                    {record.url_archivo && (
                        <Tag
                            color="default"
                            variant="outlined"
                            style={{ cursor: "pointer" }}
                        >
                            <a
                                href={`${config.BASE_URL}${record.url_archivo}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                            >
                                <DownloadOutlined />
                            </a>
                        </Tag>
                    )}

                    <Tag
                        color="red"
                        variant="outlined"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEliminar(record.id_asignacion)}>
                        <DeleteOutlined />
                    </Tag>

                    {tieneObservacion(record.observacion) && (
                        <Tooltip
                            title={record.observacion}
                            placement="top"
                        >
                            <Tag
                                color='blue'
                                size="small"
                                variant='outlined'
                            >
                                <MessageOutlined />
                            </Tag>
                        </Tooltip>
                    )}
                    {/* <Tag
                        color="blue"
                        variant='outlined'
                        style={{ cursor: "pointer" }}
                        onClick={() => handleVer(record.id_funcionario)}
                    >
                        <EyeOutlined />
                    </Tag>
                    <Tag
                        color="default"
                        variant='outlined'
                        style={{ cursor: "pointer" }}
                        onClick={() => handleHistorial(record.id_funcionario)}
                    >
                        <HistoryOutlined />
                    </Tag>
                    <Tag
                        color="red"
                        variant='outlined'
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEliminar(record.id_funcionario)}
                    >
                        <DeleteOutlined />
                    </Tag> */}
                </Space>
            ),
        },
    ]

    const filteredAsignaciones = asignaciones.filter((item) => {
        const value = searchText.toLowerCase();
        return (
            item.serie?.toLowerCase().includes(value)
        );
    });

    const handleAgregar = () => {
        setOpenAgregar(true);
    };

    const handleOkAgregar = async (data) => {
        setConfirmLoadingAgregar(true);
        try {
            const response = await agregarAsignacion(data);
            if (response.status === 200) {
                fetchAsignaciones();
                message.success("Asignacion agregada correctamente");
                setOpenAgregar(false);
                setConfirmLoadingAgregar(false);
            } else {
                message.error("Error al agregar asignacion");
                setOpenAgregar(false);
                setConfirmLoadingAgregar(false);
            }
        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
            message.error("Error al conectar con el servidor");
            setOpenAgregar(false);
            setConfirmLoadingAgregar(false);
        }
    };

    const handleCancelAgregar = () => {
        setOpenAgregar(false);
    };

    const handleEliminar = async (id) => {
        try {
            setOpenEliminar(true);
            setConfirmLoadingEliminar(true);

            const data = await getAsignacionById(id);
            setAsignacionSeleccionada(data);

        } catch (error) {
            console.error("Error al obtener equipo:", error);
        } finally {
            setConfirmLoadingEliminar(false);
        }
    };

    const handleOkEliminar = async () => {
        setConfirmLoadingEliminar(true);
        try {
            const response = await eliminarAsignacion(AsignacionSeleccionada.id_asignacion);
            if (response.status === 200) {
                fetchAsignaciones();
                message.success("Asignacion eliminada correctamente");
                setOpenEliminar(false);
                setConfirmLoadingEliminar(false);
            } else {
                message.error("Error al eliminar asignacion");
                setOpenEliminar(false);
                setConfirmLoadingEliminar(false);
            }
        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
            message.error("Error al conectar con el servidor");
            setOpenEliminar(false);
            setConfirmLoadingEliminar(false);
        }
    };

    const handleCancelEliminar = () => {
        setOpenEliminar(false);
    };

    useEffect(() => {
        fetchAsignaciones();
    }, []);

    return (
        <>
            <Breadcrumb
                style={{ margin: '16px 0' }}
                items={[{ title: 'Asignacion' }, { title: 'Asignaciones' }]}
            />
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <div style={{ display: "flex", gap: 16 }}>
                    <Button
                        className='funcionario-boton'
                        type="btn"
                        onClick={() => {
                            console.log('Agregar asignacion');
                            handleAgregar();
                        }}
                        style={{ marginBottom: 16 }}
                    >
                        <PlusOutlined /> Agregar Asignacion
                    </Button>
                    <Input.Search
                        placeholder="Buscar por serie"
                        allowClear
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ height: "100%" }}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredAsignaciones}
                    rowKey="id_asignacion"
                    pagination={{
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} de ${total}`,
                        size: "small",
                    }}
                    style={{ height: "calc(100vh - 350px)" }}
                />
                <ModalAgregar
                    open={openAgregar}
                    handleOk={handleOkAgregar}
                    confirmLoading={confirmLoadingAgregar}
                    handleCancel={handleCancelAgregar}
                />
                <ModalEliminar
                    open={openEliminar}
                    handleOk={handleOkEliminar}
                    confirmLoading={confirmLoadingEliminar}
                    handleCancel={handleCancelEliminar}
                    AsignacionSeleccionada={AsignacionSeleccionada}
                />
            </div>
        </>
    );
};

export default Asignacion;

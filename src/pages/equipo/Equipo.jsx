import { Breadcrumb, theme, Table, Input, Button, Tag, message, Space, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import {
    getEquiposDescripcion,
    getEquipoBySerie,
    postEquipo,
    eliminarEquipo,
    modificarEquipo
} from '../../services/equipoService';

import "./Equipo.css";

import ModalAgregar from './ModalAgregar';
import ModalEliminar from './ModalEliminar';
import ModalModificar from './ModalModificar';

import {
    DeleteOutlined,
    MessageOutlined,
    PlusOutlined,
    EditOutlined
} from '@ant-design/icons';

const Equipo = () => {

    const [equipos, setEquipos] = useState([]);
    const [searchText, setSearchText] = useState('');

    const [openEliminar, setOpenEliminar] = useState(false);
    const [openAgregar, setOpenAgregar] = useState(false);
    const [openModificar, setOpenModificar] = useState(false);

    const [confirmLoadingEliminar, setConfirmLoadingEliminar] = useState(false);
    const [confirmLoadingAgregar, setConfirmLoadingAgregar] = useState(false);
    const [confirmLoadingModificar, setConfirmLoadingModificar] = useState(false);

    const [serieSeleccionada, setSerieSeleccionada] = useState(null);
    const [equipoDetalle, setEquipoDetalle] = useState(null);
    const [loadingDetalle, setLoadingDetalle] = useState(false);

    const fetchEquipos = async () => {
        try {
            const response = await getEquiposDescripcion();
            setEquipos(response);
        } catch (error) {
            console.error("Error al obtener equipos:", error);
        }
    };

    const showModalAgregar = () => {
        setOpenAgregar(true);
    };

    const handleOkAgregar = async (data) => {

        try {

            const response = await postEquipo(data);

            if (response.status === 200) {

                fetchEquipos();
                message.success("Equipo agregado correctamente");

                setOpenAgregar(false);
                setConfirmLoadingAgregar(false);

            } else {

                message.error("Error al agregar equipo");
                setOpenAgregar(false);
                setConfirmLoadingAgregar(false);

            }

        } catch (error) {

            console.error("Error al agregar equipo:", error);
            message.error("Error al conectar con el servidor");

            setOpenAgregar(false);
            setConfirmLoadingAgregar(false);

        }
    };

    const handleCancelAgregar = () => {
        setOpenAgregar(false);
    };

    const handleModificar = (serie) => {
        setSerieSeleccionada(serie);
        setOpenModificar(true);
    };

    const handleOkModificar = async (data) => {

        try {

            setConfirmLoadingModificar(true);

            const response = await modificarEquipo(data);

            if (response.status === 200) {

                message.success("Equipo modificado correctamente");

                fetchEquipos();

                setOpenModificar(false);
                setSerieSeleccionada(null);

            } else {

                message.error("Error al modificar equipo");

            }

        } catch (error) {

            console.error("Error al modificar equipo:", error);
            message.error("Error al conectar con el servidor");

        } finally {

            setConfirmLoadingModificar(false);

        }
    };

    const handleCancelModificar = () => {

        setOpenModificar(false);
        setSerieSeleccionada(null);

    };

    const handleEliminar = async (serie) => {

        try {

            setSerieSeleccionada(serie);
            setOpenEliminar(true);
            setLoadingDetalle(true);

            const data = await getEquipoBySerie(serie);

            setEquipoDetalle(data);

        } catch (error) {

            console.error("Error al obtener equipo:", error);

        } finally {

            setLoadingDetalle(false);

        }

    };

    const handleOkEliminar = async (equipoDetalle) => {

        try {

            setConfirmLoadingEliminar(true);

            const response = await eliminarEquipo(equipoDetalle[0].serie);

            if (response.status === 200) {

                fetchEquipos();

                message.success("Equipo eliminado correctamente");

                setOpenEliminar(false);
                setConfirmLoadingEliminar(false);
                setEquipoDetalle(null);
                setSerieSeleccionada(null);

            } else {

                message.error("Error al eliminar equipo");

                setOpenEliminar(false);
                setConfirmLoadingEliminar(false);
                setEquipoDetalle(null);
                setSerieSeleccionada(null);

            }

        } catch (error) {

            message.error("Error al conectar con el servidor");

            setOpenEliminar(false);
            setConfirmLoadingEliminar(false);
            setEquipoDetalle(null);
            setSerieSeleccionada(null);

        }

    };

    const handleCancelEliminar = () => {

        setOpenEliminar(false);
        setEquipoDetalle(null);
        setSerieSeleccionada(null);

    };

    const getEstadoColor = (descripcion) => {

        switch (descripcion) {

            case "Asignado":
                return "#0fac1aff";

            case "Mantencion":
                return "#ac009dff";

            case "Disponible":
                return "#0f41acff";

            case "Backup":
                return "#f18406ff";

            case "Desvinculado":
                return "default";

            default:
                return "default";
        }

    };

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const tieneObservacion = (obs) => {
        return obs && obs.trim() !== "";
    };

    const columns = [

        {
            title: "Serie",
            dataIndex: "serie",
            key: "serie"
        },

        {
            title: "Nombre",
            dataIndex: "nombre",
            key: "nombre"
        },

        {
            title: "Modelo",
            dataIndex: "descripcionModelo",
            key: "id_modelo"
        },

        {
            title: "Estado",
            dataIndex: "descripcionEstado",
            key: "id_estado",
            render: (text) => (

                <Tag variant='outlined' color={getEstadoColor(text)}>
                    {text}
                </Tag>

            )
        },

        {
            title: "Contrato",
            dataIndex: "descripcionContrato",
            key: "id_contrato"
        },

        {
            title: 'Acciones',
            key: 'action',
            render: (_, record) => (

                <Space>

                    <Tag
                        color="blue"
                        variant="outlined"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleModificar(record.serie)}
                    >
                        <EditOutlined />
                    </Tag>

                    <Tag
                        color="red"
                        variant="outlined"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEliminar(record.serie)}
                    >
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

                </Space>

            ),
        },
    ];

    useEffect(() => {

        fetchEquipos();

    }, []);

    const filteredEquipos = equipos.filter((item) => {

        const value = searchText.toLowerCase();

        return (

            item.serie?.toLowerCase().includes(value) ||
            item.nombre?.toLowerCase().includes(value) ||
            item.observacion?.toLowerCase().includes(value) ||
            item.descripcionModelo?.toLowerCase().includes(value) ||
            item.descripcionEstado?.toLowerCase().includes(value) ||
            item.descripcionContrato?.toLowerCase().includes(value)

        );

    });

    return (
        <>

            <Breadcrumb
                style={{ margin: '16px 0' }}
                items={[{ title: 'Equipo' }, { title: 'Equipos' }]}
            />

            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 16,
                    }}
                >
                    <Input.Search
                        placeholder="Buscar"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 300 }}
                    />

                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => showModalAgregar()}
                    >
                        Agregar equipo
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredEquipos}
                    rowKey="serie"
                    pagination={{
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} de ${total}`,
                        size: "small",
                    }}
                    style={{ height: "calc(100vh - 350px)" }}
                />

                <ModalEliminar
                    open={openEliminar}
                    handleOk={handleOkEliminar}
                    confirmLoading={confirmLoadingEliminar}
                    handleCancel={handleCancelEliminar}
                    equipoDetalle={equipoDetalle}
                    loadingDetalle={loadingDetalle}
                />

                <ModalAgregar
                    open={openAgregar}
                    handleOk={handleOkAgregar}
                    confirmLoading={confirmLoadingAgregar}
                    handleCancel={handleCancelAgregar}
                />

                <ModalModificar
                    open={openModificar}
                    handleOk={handleOkModificar}
                    confirmLoading={confirmLoadingModificar}
                    handleCancel={handleCancelModificar}
                    serie={serieSeleccionada}
                />

            </div>
        </>
    );
};

export default Equipo;
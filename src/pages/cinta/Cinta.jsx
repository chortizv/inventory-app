import { Breadcrumb, theme, Table, Input, Button, Tag, message, Space, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import {
    DeleteOutlined,
    MessageOutlined,
    PlusOutlined,
    EditOutlined,
    EyeOutlined
} from '@ant-design/icons';
import { createCinta, deleteCinta, getCintaById, getCintas, updateCinta } from '../../services/cintasService';
import ModalDetalleCinta from './ModalDetalleCinta';
import ModalAgregar from './ModalAgregar';
import ModalEliminar from './ModalEliminar';
import ModalModificar from './ModalModificar';


const Cinta = () => {
    const [cintas, setCintas] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAgregarOpen, setModalAgregarOpen] = useState(false);
    const [openEliminar, setOpenEliminar] = useState(false);
    const [modalModificarOpen, setModalModificarOpen] = useState(false);
    const [confirmLoadingModificar, setConfirmLoadingModificar] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [confirmLoadingEliminar, setConfirmLoadingEliminar] = useState(false);
    const [cintaSeleccionada, setCintaSeleccionada] = useState(null);
    const [cintaId, setCintaId] = useState(null);

    const fetchCintas = async () => {
        try {
            const response = await getCintas();
            setCintas(response);
        } catch (error) {
            console.error('Error al obtener las cintas:', error);
        }
    }

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const getEstadoColor = (estado) => {

        switch (estado) {

            case "Disponible":
                return "#0fac1aff";

            case "En uso":
                return "#0f41acff";

            case "Llena":
                return "#f11606ff";

            default:
                return "default";
        }

    };

    const handleAgregar = () => {
        setModalAgregarOpen(true);
    };

    const handleDetalle = (id) => {
        setCintaId(id);
        setModalOpen(true);
    };

    const handleOkAgregar = async (data) => {
        console.log("Agregar:", data);
        try {

            const response = await createCinta(data);

            if (response.status === 200) {

                fetchCintas();
                message.success("Cinta agregada correctamente");

                setModalAgregarOpen(false);
                setConfirmLoading(false);

            } else {

                message.error("Error al agregar cinta");
                setModalAgregarOpen(false);
                setConfirmLoading(false);

            }

        } catch (error) {

            console.error("Error al agregar cinta:", error);
            message.error("Error al conectar con el servidor");

            setModalAgregarOpen(false);
            setConfirmLoading(false);

        }
    };

    const handleCancelAgregar = () => {
        setModalAgregarOpen(false);
    };


    const handleEliminar = async (id) => {
        console.log("Eliminar:", id);

        try {

            const response = await getCintaById(id);
            setCintaSeleccionada(response);

        } catch (error) {

            console.error("Error al obtener cinta:", error);
            message.error("Error al conectar con el servidor");

        }

        setOpenEliminar(true);
    };

    const handleOkEliminar = async (data) => {
        console.log("Eliminar:", data);
        try {

            const response = await deleteCinta(data.id);

            if (response.status === 200) {

                fetchCintas();
                message.success("Cinta eliminada correctamente");

                setOpenEliminar(false);
                setConfirmLoadingEliminar(false);

            } else {

                message.error("Error al eliminar cinta");
                setOpenEliminar(false);
                setConfirmLoadingEliminar(false);

            }

        } catch (error) {

            console.error("Error al eliminar cinta:", error);
            message.error("Error al conectar con el servidor");

            setOpenEliminar(false);
            setConfirmLoadingEliminar(false);

        }
    };

    const handleCancelEliminar = () => {
        setOpenEliminar(false);
    };

    const handleModificar = async (id) => {
        console.log("Modificar:", id);

        try {

            const response = await getCintaById(id);
            setCintaSeleccionada(response);

        } catch (error) {

            console.error("Error al obtener cinta:", error);
            message.error("Error al conectar con el servidor");

        }

        setModalModificarOpen(true);
    };

    const handleOkModificar = async (data) => {
        console.log("Modificar:", data);
        try {

            const response = await updateCinta(data);

            if (response.status === 200) {

                fetchCintas();
                message.success("Cinta modificada correctamente");

                setModalModificarOpen(false);
                setConfirmLoadingModificar(false);

            } else {

                message.error("Error al modificar cinta");
                setModalModificarOpen(false);
                setConfirmLoadingModificar(false);

            }

        } catch (error) {

            console.error("Error al modificar cinta:", error);
            message.error("Error al conectar con el servidor");

            setModalModificarOpen(false);
            setConfirmLoadingModificar(false);

        }
    };

    const handleCancelModificar = () => {
        setModalModificarOpen(false);
    };


    const columns = [

        {
            title: "Id",
            dataIndex: "id",
            key: "id"
        },

        {
            title: "Codigo",
            dataIndex: "codigo",
            key: "codigo"
        },

        {
            title: "Descripcion",
            dataIndex: "descripcion",
            key: "descripcion"
        },

        {
            title: "Estado",
            dataIndex: "estado",
            key: "estado",
            render: (text) => (

                <Tag variant='outlined' color={getEstadoColor(text)}>
                    {text}
                </Tag>

            )
        },

        {
            title: "Capacidad",
            dataIndex: "capacidad",
            key: "capacidad",
            render: (text) => (
                <>{text} TB</>
            )
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
                        onClick={() => handleDetalle(record.id)}
                    >
                        <EyeOutlined />
                    </Tag>

                    <Tag
                        color="gold"
                        variant="outlined"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleModificar(record.id)}
                    >
                        <EditOutlined />
                    </Tag>

                    <Tag
                        color="red"
                        variant="outlined"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEliminar(record.id)}
                    >
                        <DeleteOutlined />
                    </Tag>

                </Space>

            ),
        },
    ];



    useEffect(() => {
        fetchCintas();
    }, []);

    const filteredCintas = cintas.filter((item) => {

        const value = searchText.toLowerCase();

        return (

            item.codigo?.toLowerCase().includes(value) ||
            item.descripcion?.toLowerCase().includes(value) ||
            item.estado?.toLowerCase().includes(value)

        );

    });

    return (
        <>
            <Breadcrumb
                style={{ margin: '16px 0' }}
                items={[{ title: 'Cinta' }, { title: 'Cintas' }]}
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
                        onClick={() => handleAgregar()}
                    >
                        Agregar cinta
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredCintas}
                    rowKey="id"
                />

                <ModalDetalleCinta
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    cintaId={cintaId}
                />

                <ModalAgregar
                    open={modalAgregarOpen}
                    handleOk={handleOkAgregar}
                    confirmLoading={confirmLoading}
                    handleCancel={handleCancelAgregar}
                />
                <ModalEliminar
                    open={openEliminar}
                    handleOk={handleOkEliminar}
                    confirmLoading={confirmLoadingEliminar}
                    handleCancel={handleCancelEliminar}
                    cintaSeleccionada={cintaSeleccionada}
                />
                <ModalModificar
                    open={modalModificarOpen}
                    handleOk={handleOkModificar}
                    confirmLoading={confirmLoadingModificar}
                    handleCancel={handleCancelModificar}
                    cintaSeleccionada={cintaSeleccionada}
                />
            </div>
        </>
    );
};

export default Cinta;
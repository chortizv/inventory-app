import { Breadcrumb, theme, Table, Input, Button, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { getEquiposDescripcion, getEquipoBySerie } from '../../services/equipoService';
import "./Equipo.css";
import ModalEliminar from '../../components/ModalEliminar';
import ModalAgregar from '../../components/ModalAgregar';
import {
    DeleteOutlined,
    PlusOutlined
} from '@ant-design/icons';

const Equipo = () => {

    const [equipos, setEquipos] = useState([]);
    const [searchText, setSearchText] = useState('');

    // Estados separados y claros
    const [openEliminar, setOpenEliminar] = useState(false);
    const [openAgregar, setOpenAgregar] = useState(false);

    const [confirmLoadingEliminar, setConfirmLoadingEliminar] = useState(false);
    const [confirmLoadingAgregar, setConfirmLoadingAgregar] = useState(false);

    const [serieSeleccionada, setSerieSeleccionada] = useState(null);
    const [equipoDetalle, setEquipoDetalle] = useState(null);
    const [loadingDetalle, setLoadingDetalle] = useState(false);

    // ===============================
    // MODAL AGREGAR
    // ===============================

    const showModalAgregar = () => {
        setOpenAgregar(true);
    };

    const handleOkAgregar = () => {
        setConfirmLoadingAgregar(true);

        setTimeout(() => {
            setOpenAgregar(false);
            setConfirmLoadingAgregar(false);
        }, 1000);
    };

    const handleCancelAgregar = () => {
        setOpenAgregar(false);
    };

    // ===============================
    // MODAL ELIMINAR
    // ===============================

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

    const handleOkEliminar = () => {
        setConfirmLoadingEliminar(true);

        setTimeout(() => {
            setOpenEliminar(false);
            setConfirmLoadingEliminar(false);
            setEquipoDetalle(null);
            setSerieSeleccionada(null);
        }, 1000);
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
            title: "Observación",
            dataIndex: "observacion",
            key: "observacion"
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
                // outlined, solid, filled
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
            title: 'Accion',
            key: 'action',
            render: (_, record) => (
                <Tag
                    color="red"
                    variant='outlined'
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEliminar(record.serie)}
                >
                    <DeleteOutlined /> Eliminar
                </Tag>
            ),
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            const data = await getEquiposDescripcion();
            setEquipos(data);
        };
        fetchData();
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

                <Input.Search
                    placeholder="Buscar por serie, nombre u observación"
                    allowClear
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ marginBottom: 16 }}
                />

                {/* BOTÓN CORREGIDO */}
                <Button
                    className='equipo-boton'
                    type="btn"
                    onClick={showModalAgregar}
                    style={{ marginBottom: 16 }}
                >
                    <PlusOutlined /> Agregar equipo
                </Button>

                <Table
                    columns={columns}
                    dataSource={filteredEquipos}
                    rowKey="serie"
                    pagination={{
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} de ${total}`,
                        size: "small",
                    }}
                />

                {/* MODAL ELIMINAR */}
                <ModalEliminar
                    open={openEliminar}
                    handleOk={handleOkEliminar}
                    confirmLoading={confirmLoadingEliminar}
                    handleCancel={handleCancelEliminar}
                    equipoDetalle={equipoDetalle}
                    loadingDetalle={loadingDetalle}
                />

                {/* MODAL AGREGAR */}
                <ModalAgregar
                    open={openAgregar}
                    handleOk={handleOkAgregar}
                    confirmLoading={confirmLoadingAgregar}
                    handleCancel={handleCancelAgregar}
                />
            </div>
        </>
    );
};

export default Equipo;

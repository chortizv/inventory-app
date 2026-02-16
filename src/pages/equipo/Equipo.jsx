import { Breadcrumb, theme, Table, Input, Button, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { getEquipos, getEquipoBySerie } from '../../services/equipoService';
import "./Equipo.css";
import ModalEliminar from '../../components/ModalEliminar';
import ModalAgregar from '../../components/ModalAgregar';

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

    // ===============================
    // TABLA
    // ===============================

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
            dataIndex: "id_modelo",
            key: "id_modelo"
        },
        {
            title: "Estado",
            dataIndex: "id_estado",
            key: "id_estado"
        },
        {
            title: "Contrato",
            dataIndex: "id_contrato",
            key: "id_contrato"
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Tag
                    color="red"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEliminar(record.serie)}
                >
                    Eliminar
                </Tag>
            ),
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            const data = await getEquipos();
            setEquipos(data);
        };
        fetchData();
    }, []);

    const filteredEquipos = equipos.filter((item) => {
        const value = searchText.toLowerCase();
        return (
            item.serie?.toLowerCase().includes(value) ||
            item.nombre?.toLowerCase().includes(value) ||
            item.observacion?.toLowerCase().includes(value)
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
                    Agregar equipo
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

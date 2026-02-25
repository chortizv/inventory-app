import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Input, message, Space, Table, Tag, theme } from 'antd';
import { agregarUsuario, eliminarUsuario, getUsuarioById, getUsuarios } from '../../services/usuarioService';
import {
    DeleteOutlined,
    EyeOutlined,
    HistoryOutlined,
    PlusOutlined
} from '@ant-design/icons';
import ModalAgregar from './ModalAgregar';
import ModalEliminar from './ModalEliminar';

const Usuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [openAgregar, setOpenAgregar] = useState(false);
    const [openEliminar, setOpenEliminar] = useState(false);
    const [confirmLoadingAgregar, setConfirmLoadingAgregar] = useState(false);
    const [confirmLoadingEliminar, setConfirmLoadingEliminar] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const columns = [
        {
            title: "ID",
            dataIndex: "id_usuario",
            key: "id_usuario",
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Correo",
            dataIndex: "correo",
            key: "correo",
        },
        {
            title: "Fecha creacion",
            dataIndex: "fecha_creacion",
            key: "fecha_creacion",
        },
        {
            title: "ID Funcionario",
            dataIndex: "id_funcionario",
            key: "id_funcionario",
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (text, record) => (
                <>
                    <Tag
                        color="red"
                        variant='outlined'
                        onClick={() => handleEliminar(record.id_usuario)}>
                        <DeleteOutlined />
                    </Tag>
                </>
            ),
        },
    ];

    const filteredUsuarios = usuarios.filter((item) => {
        const value = searchText.toLowerCase();
        return (
            item.username?.toLowerCase().includes(value) ||
            item.correo?.toLowerCase().includes(value)
        );
    });

    const handleAgregar = () => {
        console.log('Agregar usuario');
        setOpenAgregar(true);
    };

    const handleEliminar = async (id) => {

        const data = await getUsuarioById(id);
        setUsuarioSeleccionado(data);
        setOpenEliminar(true);
    };

    const handleOkAgregar = async (data) => {
        setConfirmLoadingAgregar(true);
        try {
            const response = await agregarUsuario(data);
            if (response.status === 200) {
                fetchUsuarios();
                message.success("Usuario agregado correctamente");
                setOpenAgregar(false);
                setConfirmLoadingAgregar(false);
            } else {
                message.error("Error al agregar usuario");
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

    const handleOkEliminar = async (id) => {
        setConfirmLoadingEliminar(true);
        try {
            const response = await eliminarUsuario(id);
            if (response.status === 200) {
                fetchUsuarios();
                message.success("Usuario eliminado correctamente");
                setOpenEliminar(false);
                setConfirmLoadingEliminar(false);
            } else {
                message.error("Error al eliminar usuario");
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

    const fetchUsuarios = async () => {
        const data = await getUsuarios();
        setUsuarios(data);
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);



    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Usuario' }, { title: 'Usuarios' }]} />
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
                            console.log('Agregar usuario');
                            handleAgregar();
                        }}
                        style={{ marginBottom: 16 }}
                    >
                        <PlusOutlined /> Agregar usuario
                    </Button>
                    <Input.Search
                        placeholder="Buscar por nombre"
                        allowClear
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ height: "100%" }}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredUsuarios}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
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
                    usuarioSeleccionado={usuarioSeleccionado}
                />
            </div>
        </>
    )
};

export default Usuario;
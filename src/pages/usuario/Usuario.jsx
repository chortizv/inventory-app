import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Input, Space, Table, Tag, theme } from 'antd';
import { getUsuarios } from '../../services/usuarioService';
import {
    DeleteOutlined,
    EyeOutlined,
    HistoryOutlined,
    PlusOutlined
} from '@ant-design/icons';
import ModalAgregar from './ModalAgregar';

const Usuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [searchText, setSearchText] = useState('');

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
                        onClick={() => handleEliminar(record.id_funcionario)}>
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

    const handleEliminar = (id) => {
        console.log('Eliminar usuario', id);
    };

    const [openAgregar, setOpenAgregar] = useState(false);
    const [confirmLoadingAgregar, setConfirmLoadingAgregar] = useState(false);

    const showModalAgregar = () => {
        setOpenAgregar(true);
    };

    const handleOkAgregar = () => {
        setConfirmLoadingAgregar(true);
        setTimeout(() => {
            setOpenAgregar(false);
            setConfirmLoadingAgregar(false);
        }, 2000);
    };

    const handleCancelAgregar = () => {
        setOpenAgregar(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUsuarios();
            setUsuarios(data);
        };

        fetchData();
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
            </div>
        </>
    )
};

export default Usuario;
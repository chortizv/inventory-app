import React, { useEffect, useState } from 'react';
import { Breadcrumb, Table, theme } from 'antd';
import { getUsuarios } from '../../services/usuarioService';

const Usuario = () => {
    const [usuarios, setUsuarios] = useState([]);

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
    ];

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUsuarios();
            console.log(data);
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
                <Table
                    columns={columns}
                    dataSource={usuarios}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </div>
        </>
    )
};

export default Usuario;
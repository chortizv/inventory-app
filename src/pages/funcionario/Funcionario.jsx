import React, { useEffect, useState } from 'react';
import { Breadcrumb, Table, theme, Input, Button } from 'antd';
import { getFuncionarios } from '../../services/funcionarioService';
import "./Funcionario.css";

const Funcionario = () => {
    const [funcionarios, setFuncionarios] = useState([]);
    const [searchText, setSearchText] = useState('');

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const columns = [
        {
            title: "ID",
            dataIndex: "id_funcionario",
            key: "id_funcionario",
        },
        {
            title: "Nombre",
            dataIndex: "pnombre",
            key: "pnombre",
        },
        {
            title: "Segundo Nombre",
            dataIndex: "snombre",
            key: "snombre",
        },
        {
            title: "Apellido",
            dataIndex: "appaterno",
            key: "appaterno",
        },
        {
            title: "Apellido Materno",
            dataIndex: "apmaterno",
            key: "apmaterno",
        },
        {
            title: "Correo",
            dataIndex: "correo",
            key: "correo",
        },
        {
            title: "Anexo",
            dataIndex: "anexo",
            key: "anexo",
        },
        {
            title: "Cargo",
            dataIndex: "cargo",
            key: "cargo",
        },
    ];

    const filteredFuncionarios = funcionarios.filter((item) => {
        const value = searchText.toLowerCase();
        return (
            item.pnombre?.toLowerCase().includes(value) ||
            item.snombre?.toLowerCase().includes(value) ||
            item.appaterno?.toLowerCase().includes(value) ||
            item.apmaterno?.toLowerCase().includes(value)
        );
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getFuncionarios();
            console.log(data);
            setFuncionarios(data);
        };

        fetchData();
    }, []);

    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Funcionario' }, { title: 'Funcionarios' }]} />
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <Input.Search
                    placeholder="Buscar por nombre"
                    allowClear
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ marginBottom: 16 }}
                />
                <Button
                    className='funcionario-boton'
                    type="btn"
                    onClick={() => {
                        console.log('Agregar funcionario');
                    }}
                    style={{ marginBottom: 16 }}
                >
                    Agregar funcionario
                </Button>
                <Table
                    columns={columns}
                    dataSource={filteredFuncionarios}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </div>
        </>
    )
};

export default Funcionario;
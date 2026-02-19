import { useEffect, useState } from 'react';
import { Breadcrumb, Table, theme, Input, Button, Tag } from 'antd';
import { getFuncionarios, getHistorialFuncionario } from '../../services/funcionarioService';
import {
    PlusOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';
import "./Funcionario.css";
import ModalHistorial from './ModalHistorial';

const Funcionario = () => {
    const [funcionarios, setFuncionarios] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [openHistorial, setOpenHistorial] = useState(false);
    const [historial, setHistorial] = useState([]);
    const [confirmLoadingHistorial, setConfirmLoadingHistorial] = useState(false);
    const [mensajeError, setMensajeError] = useState('');

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleHistorial = async (id) => {
        try {
            const data = await getHistorialFuncionario(id);

            setHistorial(data);
            setMensajeError(null);
            setOpenHistorial(true);

        } catch (error) {

            if (error.response && error.response.status === 404) {

                setHistorial([]);
                setMensajeError(error.response.data);
                setOpenHistorial(true);
            } else {
                console.error("Error real:", error);
                setMensajeError("Error al obtener historial");
                setHistorial([]);
                setOpenHistorial(true);
            }
        }
    };


    const handleOkHistorial = () => {
        setOpenHistorial(false);
    };

    const handleCancelHistorial = () => {
        setOpenHistorial(false);
    };

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
        {
            title: 'Asignaciones',
            key: 'action',
            render: (_, record) => (
                <Tag
                    color="blue"
                    variant='outlined'
                    style={{ cursor: "pointer" }}
                    onClick={() => handleHistorial(record.id_funcionario)}
                >
                    <UnorderedListOutlined /> Asignaciones
                </Tag>
            ),
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
                    <PlusOutlined /> Agregar funcionario
                </Button>
                <Table
                    columns={columns}
                    dataSource={filteredFuncionarios}
                    rowKey="id_funcionario"
                    pagination={{ pageSize: 10 }}
                />
                <ModalHistorial
                    open={openHistorial}
                    handleOk={handleOkHistorial}
                    confirmLoading={confirmLoadingHistorial}
                    handleCancel={handleCancelHistorial}
                    historial={historial}
                    mensajeError={mensajeError}
                />
            </div>
        </>
    )
};

export default Funcionario;
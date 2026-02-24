import { useEffect, useState } from 'react';
import { Breadcrumb, Table, theme, Input, Button, Tag, Space, message } from 'antd';
import { agregarFuncionario, eliminarFuncionario, getFuncionarioById, getFuncionarios, getHistorialFuncionario } from '../../services/funcionarioService';
import {
    DeleteOutlined,
    EyeOutlined,
    HistoryOutlined,
    PlusOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';
import "./Funcionario.css";
import ModalHistorial from './ModalHistorial';
import ModalAgregar from './ModalAgregar';
import ModalEliminar from './ModalEliminar';
import ModalDetalle from './ModalDetalle';

const Funcionario = () => {
    const [funcionarios, setFuncionarios] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [openHistorial, setOpenHistorial] = useState(false);
    const [openAgregar, setOpenAgregar] = useState(false);
    const [openEliminar, setOpenEliminar] = useState(false);
    const [openDetalle, setOpenDetalle] = useState(false);
    const [historial, setHistorial] = useState([]);
    const [confirmLoadingHistorial, setConfirmLoadingHistorial] = useState(false);
    const [confirmLoadingAgregar, setConfirmLoadingAgregar] = useState(false);
    const [confirmLoadingEliminar, setConfirmLoadingEliminar] = useState(false);
    const [confirmLoadingDetalle, setConfirmLoadingDetalle] = useState(false);
    const [funcionarioSeleccionado, setFuncionarioSeleccionado] = useState(null);
    const [mensajeError, setMensajeError] = useState('');

    const fetchFuncionarios = async () => {
        try {
            const response = await getFuncionarios();
            setFuncionarios(response);
        } catch (error) {
            console.error("Error al obtener funcionarios:", error);
        }
    };

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

    const handleAgregar = () => {
        setOpenAgregar(true);
    };

    const handleOkAgregar = async (data) => {
        setOpenAgregar(false);
        console.log(data);
        try {
            const response = await agregarFuncionario(data);
            console.log(response);
            if (response.status === 200) {
                fetchFuncionarios();
                message.success("Funcionario agregado correctamente");
                setOpenAgregar(false);
                setConfirmLoadingAgregar(false);
                setFuncionarioSeleccionado(null);
            } else {
                message.error("Error al agregar funcionario");
                setOpenAgregar(false);
                setConfirmLoadingAgregar(false);
                setFuncionarioSeleccionado(null);
            }
        } catch (error) {
            message.error("Error al conectar con el servidor");
            setOpenAgregar(false);
            setConfirmLoadingAgregar(false);
            setFuncionarioSeleccionado(null);
        }
    };

    const handleCancelAgregar = () => {
        setOpenAgregar(false);
    };

    const handleEliminar = async (id) => {

        const data = await getFuncionarioById(id);
        setFuncionarioSeleccionado(data);
        setOpenEliminar(true);
    };

    const handleOkEliminar = async () => {
        try {
            setConfirmLoadingEliminar(true);
            const response = await eliminarFuncionario(funcionarioSeleccionado[0].id_funcionario);
            console.log(response);

            if (response.status === 200) {
                fetchFuncionarios();
                message.success("Funcionario eliminado correctamente");
                setOpenEliminar(false);
                setConfirmLoadingEliminar(false);
                setFuncionarioSeleccionado(null);
            } else {
                message.error("Error al eliminar funcionario");
                setOpenEliminar(false);
                setConfirmLoadingEliminar(false);
                setFuncionarioSeleccionado(null);
            }
        } catch (error) {
            message.error("Error al conectar con el servidor");
            setOpenEliminar(false);
            setConfirmLoadingEliminar(false);
            setFuncionarioSeleccionado(null);
        }
    };

    const handleCancelEliminar = () => {
        setOpenEliminar(false);
    };

    const handleVer = async (id) => {
        const data = await getFuncionarioById(id);
        setFuncionarioSeleccionado(data);
        setOpenDetalle(true);
    };

    const handleOkDetalle = () => {
        setOpenDetalle(false);
    };

    const handleCancelDetalle = () => {
        setOpenDetalle(false);
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
            title: 'Acciones',
            key: 'action',
            render: (_, record) => (
                <Space>

                    <Tag
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
                    </Tag>
                </Space>
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
        fetchFuncionarios();
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
                <div style={{ display: "flex", gap: 16 }}>
                    <Button
                        className='funcionario-boton'
                        type="btn"
                        onClick={() => {
                            console.log('Agregar funcionario');
                            handleAgregar();
                        }}
                        style={{ marginBottom: 16 }}
                    >
                        <PlusOutlined /> Agregar funcionario
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
                    dataSource={filteredFuncionarios}
                    rowKey="id_funcionario"
                    pagination={{
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} de ${total}`,
                        size: "small",
                    }}
                    style={{ height: "calc(100vh - 250px)" }}
                />
                <ModalHistorial
                    open={openHistorial}
                    handleOk={handleOkHistorial}
                    confirmLoading={confirmLoadingHistorial}
                    handleCancel={handleCancelHistorial}
                    historial={historial}
                    mensajeError={mensajeError}
                />
                <ModalAgregar
                    open={openAgregar}
                    handleOk={handleOkAgregar}
                    confirmLoading={confirmLoadingAgregar}
                    handleCancel={handleCancelAgregar}
                    funcionarioSeleccionado={funcionarioSeleccionado}
                />
                <ModalEliminar
                    open={openEliminar}
                    handleOk={handleOkEliminar}
                    confirmLoading={confirmLoadingEliminar}
                    handleCancel={handleCancelEliminar}
                    funcionarioSeleccionado={funcionarioSeleccionado}
                />
                <ModalDetalle
                    open={openDetalle}
                    handleOk={handleOkDetalle}
                    confirmLoading={confirmLoadingDetalle}
                    handleCancel={handleCancelDetalle}
                    funcionarioSeleccionado={funcionarioSeleccionado}
                />
            </div>
        </>
    )
};

export default Funcionario;
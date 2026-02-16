import React, { useState } from 'react';
import {
    DesktopOutlined,
    TeamOutlined,
    UserOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { getItem } from './components/GetItem'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Equipo from './pages/equipo/Equipo';
import Funcionario from './pages/funcionario/Funcionario';
import Usuario from './pages/usuario/Usuario';
import { useNavigate } from "react-router-dom";
import './LayoutPage.css';

const { Header, Content, Footer, Sider } = Layout;

const items = [
    getItem('Equipos', '1', <DesktopOutlined />),
    getItem('Funcionarios', '2', <TeamOutlined />),
    getItem('Usuarios', '3', <UserOutlined />),
    getItem('Administrador', 'sub1', <SettingOutlined />, [
        getItem('Marca', '4'),
        getItem('Modelo', '5'),
        getItem('Tipo Modelo', '6'),
        getItem('Estado', '7'),
        getItem('Contrato', '8'),
        getItem('Departamento', '9'),
        getItem('Subdepartamento', '10'),
        getItem('Seccion', '11'),
        getItem('Prioridad', '12'),
    ]),
];

const pages = {
    '1': <Equipo />,
    '2': <Funcionario />,
    '3': <Usuario />,
};

const LayoutPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [currentPage, setCurrentPage] = useState('1');
    const navigate = useNavigate();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleMenuClick = (e) => {
        console.log("Key seleccionada:", e.key);
        setCurrentPage(e.key);
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                {/* defaultSelectedKeys={['1']} */}
                <button className='layout-boton' onClick={logout}>← Cerrar sesión</button>
                <Menu theme="dark" selectedKeys={[currentPage]} mode="inline" items={items} onClick={handleMenuClick} />
            </Sider>
            <Layout>
                <Content style={{ margin: '0 16px' }}>
                    {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}

                    {pages[currentPage] || "No existe esta pagina"}

                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    ISPCH - Soporte y Plataformas ©{new Date().getFullYear()} Created by Christian Ortiz
                </Footer>
            </Layout>
        </Layout>
    );
};
export default LayoutPage;
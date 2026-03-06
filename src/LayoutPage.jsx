import { useState } from 'react';
import {
    DesktopOutlined,
    TeamOutlined,
    UserOutlined,
    SettingOutlined,
    ForkOutlined,
    LeftOutlined,
    PieChartOutlined
} from '@ant-design/icons';
import { getItem } from './components/GetItem'
import { Layout, Menu, theme } from 'antd';
import Equipo from './pages/equipo/Equipo';
import Funcionario from './pages/funcionario/Funcionario';
import Usuario from './pages/usuario/Usuario';
import Dashboard from './pages/dashboard/Dashboard';
import Asignacion from './pages/asignacion/Asignacion';
import { useNavigate } from "react-router-dom";
import './LayoutPage.css';
import logo from "../public/logo2.webp";

const { Content, Footer, Sider } = Layout;

const items = [
    getItem('Dashboard', '0', <PieChartOutlined />),
    getItem('Equipos', '1', <DesktopOutlined />),
    getItem('Funcionarios', '2', <TeamOutlined />),
    getItem('Usuarios', '3', <UserOutlined />),
    getItem('Asignaciones', '4', <ForkOutlined />),
    getItem('Administrador', 'sub1', <SettingOutlined />, [
        getItem('Marca', '5'),
        getItem('Modelo', '6'),
        getItem('Tipo Modelo', '7'),
        getItem('Estado', '8'),
        getItem('Contrato', '9'),
        getItem('Departamento', '10'),
        getItem('Subdepartamento', '11'),
        getItem('Seccion', '12'),
        getItem('Prioridad', '13'),
    ]),
];

const LayoutPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [currentPage, setCurrentPage] = useState('0');
    const navigate = useNavigate();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const pages = {
        '0': <Dashboard onNavigate={setCurrentPage} />,
        '1': <Equipo />,
        '2': <Funcionario />,
        '3': <Usuario />,
        '4': <Asignacion />,
    };

    const handleMenuClick = (e) => {
        if (pages[e.key]) {
            setCurrentPage(e.key);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={value => setCollapsed(value)}
                breakpoint="lg"
            >
                <div className="demo-logo-vertical" />
                <button className='layout-boton' onClick={logout}>
                    <LeftOutlined /> {!collapsed && "Cerrar sesión"}
                </button>
                <img className='layout-logo' src={logo} alt="logo" style={{ padding: collapsed ? '.5rem' : '2rem' }} />

                <Menu
                    theme="dark"
                    selectedKeys={[currentPage]}
                    mode="inline"
                    items={items}
                    onClick={handleMenuClick}
                />
            </Sider>

            <Layout>
                <Content style={{ margin: '16px' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: '100%',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {pages[currentPage] || (
                            <div style={{ textAlign: 'center', marginTop: 50 }}>
                                <h3>Sección en desarrollo (Key: {currentPage})</h3>
                            </div>
                        )}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    ISPCH - Soporte y Plataformas ©{new Date().getFullYear()} Created by Christian Ortiz
                </Footer>
            </Layout>
        </Layout>
    );
};

export default LayoutPage;
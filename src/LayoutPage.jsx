import { useState } from 'react';
import {
    DesktopOutlined,
    TeamOutlined,
    UserOutlined,
    SettingOutlined,
    ForkOutlined
} from '@ant-design/icons';
import { getItem } from './components/GetItem'
import { Layout, Menu, theme } from 'antd';
import Equipo from './pages/equipo/Equipo';
import Funcionario from './pages/funcionario/Funcionario';
import Usuario from './pages/usuario/Usuario';
import { useNavigate } from "react-router-dom";
import './LayoutPage.css';
import logo from "../public/logo.webp";
import Asignacion from './pages/asignacion/Asignacion';

const { Header, Content, Footer, Sider } = Layout;

const items = [
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

const pages = {
    '1': <Equipo />,
    '2': <Funcionario />,
    '3': <Usuario />,
    '4': <Asignacion />,
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
                <img className='layout-logo' src={logo} alt="logo" />
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
import { useEffect, useMemo, useState } from "react";
import { Row, Col, Card, Statistic, Table, theme, Tag, Space, Typography, Button } from "antd";
import {
    DesktopOutlined,
    TeamOutlined,
    ForkOutlined,
    CalendarOutlined,
    ArrowRightOutlined
} from "@ant-design/icons";
import { Pie } from "@ant-design/plots";

import { getEquiposDescripcion } from "../../services/equipoService";
import { getFuncionarios, getAsignaciones } from "../../services/funcionarioService";

const { Text, Title } = Typography;

const Dashboard = ({ onNavigate }) => {
    const [equipos, setEquipos] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);
    const [asignaciones, setAsignaciones] = useState([]);

    const {
        token: { colorBgContainer, borderRadiusLG, colorPrimary },
    } = theme.useToken();

    const fetchData = async () => {
        try {
            const [equiposData, funcionariosData, asignacionesData] = await Promise.all([
                getEquiposDescripcion(),
                getFuncionarios(),
                getAsignaciones()
            ]);

            setEquipos(equiposData);
            setFuncionarios(funcionariosData);
            setAsignaciones(asignacionesData);
        } catch (error) {
            console.error("Error cargando dashboard:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const totalEquipos = equipos.length;
    const equiposAsignados = equipos.filter(e => e.id_estado === 1).length;
    const equiposDisponibles = equipos.filter(e => e.id_estado === 3).length;

    const dataEstados = useMemo(() => {
        const estadosMap = {};
        equipos.forEach((e) => {
            const estado = e.descripcionEstado || "Sin estado";
            estadosMap[estado] = (estadosMap[estado] || 0) + 1;
        });
        return Object.keys(estadosMap).map((key) => ({
            type: key,
            value: estadosMap[key],
        }));
    }, [equipos]);

    const pieConfig = {
        data: dataEstados,
        angleField: "value",
        colorField: "type",
        radius: 0.7,
        label: {
            text: (d) => `${d.type}: ${d.value}`,
            position: 'outside',
        },
        legend: {
            color: {
                title: false,
                position: 'bottom',
                rowPadding: 5,
            },
        },
        interactions: [{ type: "element-active" }],
    };

    const columnsAsignaciones = [
        {
            title: "Serie Equipo",
            dataIndex: "serie",
            key: "serie",
            render: (text) => (
                <Space>
                    <DesktopOutlined style={{ color: colorPrimary }} />
                    <Text strong>{text}</Text>
                </Space>
            ),
        },
        {
            title: "Funcionario",
            dataIndex: "id_funcionario",
            key: "id_funcionario",
            render: (id) => (
                <Tag icon={<TeamOutlined />} color="blue">
                    ID: {id}
                </Tag>
            ),
        },
        {
            title: "Fecha Inicio",
            dataIndex: "fecha_inicio",
            key: "fecha_inicio",
            render: (fecha) => (
                <Text type="secondary">
                    <CalendarOutlined style={{ marginRight: 8 }} />
                    {new Date(fecha).toLocaleDateString('es-CL')}
                </Text>
            ),
        },
        {
            title: "Estado",
            dataIndex: "estado",
            key: "estado",
            render: (estado) => {
                const isAsignado = estado === 1;
                return (
                    <Tag color={isAsignado ? "green" : "orange"} variant="filled">
                        {isAsignado ? "Asignado" : "Otro"}
                    </Tag>
                );
            },
        },
    ];

    const ultimasAsignaciones = useMemo(() => {
        return [...asignaciones]
            .sort((a, b) => new Date(b.fecha_inicio) - new Date(a.fecha_inicio))
            .slice(0, 5);
    }, [asignaciones]);

    return (
        <div style={{ padding: '24px', background: colorBgContainer, borderRadius: borderRadiusLG, height: "calc(100vh - 150px)" }}>
            <Title level={4} style={{ marginBottom: 24 }}>Resumen de Inventario</Title>

            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col xs={24} sm={12} lg={6}>
                    <Card variant={false} hoverable style={{ borderLeft: `4px solid #1bafffff` }}>
                        <Statistic title="Total Equipos" value={totalEquipos} prefix={<DesktopOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card variant={false} hoverable style={{ borderLeft: `4px solid #0fac1aff` }}>
                        <Statistic title="Equipos Asignados" value={equiposAsignados} prefix={<ForkOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card variant={false} hoverable style={{ borderLeft: `4px solid #0f41acff` }}>
                        <Statistic title="Equipos Disponibles" value={equiposDisponibles} prefix={<DesktopOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card variant={false} hoverable style={{ borderLeft: `4px solid #c259ffff` }}>
                        <Statistic title="Funcionarios" value={funcionarios.length} prefix={<TeamOutlined />} />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} xl={10}>
                    <Card title="Estado Global" variant={false} style={{ height: '100%' }}>
                        {dataEstados.length > 0 ? (
                            <Pie {...pieConfig} height={350} />
                        ) : (
                            <div style={{ textAlign: 'center', padding: '50px' }}>Cargando datos...</div>
                        )}
                    </Card>
                </Col>

                <Col xs={24} xl={14}>
                    <Card
                        title="Últimas Asignaciones"
                        variant={false}
                        extra={
                            <Button
                                type="link"
                                onClick={() => onNavigate('4')}
                                icon={<ArrowRightOutlined />}
                                iconPlacement="end"
                            >
                                Ver historial
                            </Button>}
                        style={{ height: '100%' }}
                    >
                        <Table
                            columns={columnsAsignaciones}
                            dataSource={ultimasAsignaciones}
                            rowKey="id_asignacion"
                            pagination={false}
                            size="middle"
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
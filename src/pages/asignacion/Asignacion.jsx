import { Breadcrumb, theme } from "antd";

const Asignacion = () => {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <>
            <Breadcrumb
                style={{ margin: '16px 0' }}
                items={[{ title: 'Asignacion' }, { title: 'Asignaciones' }]}
            />
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >

            </div>
        </>
    );
};

export default Asignacion;

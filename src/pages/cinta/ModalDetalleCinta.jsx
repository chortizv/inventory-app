import {
    Modal,
    Typography,
    Row,
    Col,
    Divider,
    Button,
    Tag
} from "antd";
import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { getCintaById } from "../../services/cintasService";
import jsPDF from "jspdf";
import QRCode from "qrcode";

const { Text, Title } = Typography;

const ModalDetalleCinta = ({ open, onClose, cintaId }) => {
    const [cinta, setCinta] = useState(null);

    useEffect(() => {
        if (cintaId && open) {
            cargarCinta();
        }
    }, [cintaId, open]);

    const cargarCinta = async () => {
        try {
            const data = await getCintaById(cintaId);
            setCinta(data);
        } catch (error) {
            console.error("Error cargando cinta", error);
        }
    };

    const generarTextoQR = () => {
        if (!cinta) return "";

        return `Cinta: ${cinta.codigo}
Descripción: ${cinta.descripcion}
Contenido: ${cinta.contenido}
Fecha: ${new Date(cinta.fecha_Respaldo).toLocaleString()}
Ubicación: ${cinta.ubicacion}
Estado: ${cinta.estado}`;
    };

    // 📄 Descargar QR como PDF REAL
    const descargarQR = async () => {
        if (!cinta) return;

        try {
            const textoQR = generarTextoQR();

            // Generar QR como imagen base64
            const qrBase64 = await QRCode.toDataURL(textoQR);

            // Crear PDF tipo etiqueta (6x6 cm)
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: [60, 60]
            });

            // Título
            pdf.setFontSize(10);
            pdf.text(`Cinta: ${cinta.codigo}`, 30, 8, { align: "center" });

            // QR centrado
            pdf.addImage(qrBase64, "PNG", 10, 12, 40, 40);

            // Descargar
            pdf.save(`${cinta.codigo}-qr.pdf`);

        } catch (error) {
            console.error("Error generando PDF", error);
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={700}
            title="Detalle de Cinta"
        >
            {cinta && (
                <>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Title level={4}>{cinta.codigo}</Title>
                        </Col>

                        <Col span={12}>
                            <Text strong>Descripción:</Text><br />
                            <Text>{cinta.descripcion}</Text>
                        </Col>

                        <Col span={12}>
                            <Text strong>Estado:</Text><br />
                            <Tag color={cinta.estado === "Llena" ? "red" : "green"}>
                                {cinta.estado}
                            </Tag>
                        </Col>

                        <Col span={12}>
                            <Text strong>Ubicación:</Text><br />
                            <Text>{cinta.ubicacion}</Text>
                        </Col>

                        <Col span={12}>
                            <Text strong>Fecha Respaldo:</Text><br />
                            <Text>
                                {new Date(cinta.fecha_Respaldo).toLocaleString()}
                            </Text>
                        </Col>

                        <Col span={24}>
                            <Text strong>Contenido:</Text><br />
                            <Text>{cinta.contenido}</Text>
                        </Col>
                    </Row>

                    <Divider />

                    {/* 🔲 QR en pantalla */}
                    <div
                        style={{
                            textAlign: "center",
                            padding: 20,
                            border: "1px solid #eee",
                            borderRadius: 10,
                            background: "#fff"
                        }}
                    >
                        <Title level={5}>{cinta.codigo}</Title>

                        <QRCodeCanvas
                            value={generarTextoQR()}
                            size={180}
                            level="M"
                            includeMargin={true}
                        />

                        <div style={{ marginTop: 10 }}>
                            <Text type="secondary">
                                Escanear para ver detalle (offline)
                            </Text>
                        </div>
                    </div>

                    <Divider />

                    <div style={{ textAlign: "right" }}>
                        <Button onClick={onClose} style={{ marginRight: 10 }}>
                            Cerrar
                        </Button>

                        <Button type="primary" onClick={descargarQR}>
                            Descargar QR
                        </Button>
                    </div>
                </>
            )}
        </Modal>
    );
};

export default ModalDetalleCinta;
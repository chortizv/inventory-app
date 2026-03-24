import {
    Modal,
    Input,
    DatePicker,
    Row,
    Col,
    Typography,
    Select,
    InputNumber
} from "antd";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";



const { Text } = Typography;

const ModalAgregar = ({ open, handleOk, confirmLoading, handleCancel }) => {

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const ESTADOS_CINTA = [
        { value: 1, label: "Disponible" },
        { value: 2, label: "En uso" },
        { value: 3, label: "Llena" }
    ];
    const onSubmit = (data) => {
        const estadoTexto = ESTADOS_CINTA.find(
            (e) => e.value === data.estado
        )?.label;

        const payload = {
            ...data,
            estado: estadoTexto,
            fecha_Respaldo: data.fecha_Respaldo
                ? dayjs(data.fecha_Respaldo).format("YYYY-MM-DDTHH:mm:ss.000[Z]")
                : null
        };

        handleOk(payload);
        reset();
    };


    return (
        <Modal
            open={open}
            onCancel={() => {
                reset();
                handleCancel();
            }}
            confirmLoading={confirmLoading}
            onOk={handleSubmit(onSubmit)}
            okText="Agregar cinta"
            cancelText="Cancelar"
            okButtonProps={{
                type: "primary",
                size: "middle"
            }}
            width={700}
            title="Agregar Cinta"
        >
            <Row gutter={[16, 16]}>

                {/* Código */}
                <Col span={12}>
                    <Text strong>Código</Text>
                    <Controller
                        name="codigo"
                        control={control}
                        rules={{ required: "El código es obligatorio" }}
                        render={({ field }) => (
                            <Input {...field} placeholder="Ej: CT-1001" />
                        )}
                    />
                    {errors.codigo && <Text type="danger">{errors.codigo.message}</Text>}
                </Col>

                {/* Estado */}
                <Col span={12}>
                    <Text strong>Estado</Text>
                    <Controller
                        name="estado"
                        control={control}
                        rules={{ required: "El estado es obligatorio" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                placeholder="Seleccione estado"
                                options={ESTADOS_CINTA}
                                onChange={(value) => field.onChange(value)}
                                value={field.value}
                                style={{ width: "100%" }}
                            />
                        )}
                    />
                    {errors.estado && <Text type="danger">{errors.estado.message}</Text>}
                </Col>

                {/* Ubicación */}
                <Col span={12}>
                    <Text strong>Ubicación</Text>
                    <Controller
                        name="ubicacion"
                        control={control}
                        rules={{ required: "La ubicación es obligatoria" }}
                        render={({ field }) => (
                            <Input {...field} placeholder="Ej: Bodega 1" />
                        )}
                    />
                    {errors.ubicacion && <Text type="danger">{errors.ubicacion.message}</Text>}
                </Col>

                {/* Fecha */}
                <Col span={12}>
                    <Text strong>Fecha Respaldo</Text>
                    <Controller
                        name="fecha_Respaldo"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                style={{ width: "100%" }}
                                showTime
                                format="DD-MM-YYYY HH:mm"
                                value={field.value ? dayjs(field.value) : null}
                                onChange={(date) => field.onChange(date)}
                            />
                        )}
                    />
                    {errors.fecha_Respaldo && (
                        <Text type="danger">{errors.fecha_Respaldo.message}</Text>
                    )}
                </Col>

                {/* Descripción */}
                <Col span={12}>
                    <Text strong>Descripción</Text>
                    <Controller
                        name="descripcion"
                        control={control}
                        rules={{ required: "La descripción es obligatoria", maxLength: 100 }}
                        render={({ field }) => (
                            <Input.TextArea {...field} rows={1} style={{ resize: "none" }} />
                        )}
                    />
                    {errors.descripcion && <Text type="danger">{errors.descripcion.message}</Text>}
                </Col>

                <Col span={12}>
                    <Text strong>Capacidad</Text>
                    <Controller
                        name="capacidad"
                        control={control}
                        rules={{ required: "La capacidad es obligatoria" }}
                        render={({ field }) => (
                            <InputNumber {...field}
                                style={{ width: "100%" }}
                                min={0}
                                step={0.01}
                                precision={2}
                                placeholder="Ej: 13.70" />
                        )}
                    />
                    {errors.capacidad && <Text type="danger">{errors.capacidad.message}</Text>}
                </Col>
                {/* Contenido */}
                <Col span={24}>
                    <Text strong >Contenido</Text>
                    <Controller
                        name="contenido"
                        control={control}
                        rules={{ required: "El contenido es obligatorio", maxLength: 200 }}
                        render={({ field }) => (
                            <Input.TextArea {...field} rows={4} style={{ resize: "none" }} />
                        )}
                    />
                    {errors.contenido && (
                        <Text type="danger">{errors.contenido.message}</Text>
                    )}
                </Col>

            </Row>
        </Modal>
    );
};

export default ModalAgregar;
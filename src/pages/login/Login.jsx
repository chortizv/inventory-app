import { login } from '../../services/usuarioService';
import './../../Login.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import logo from "../../../public/logo.png";
import { useEffect, useState } from 'react';

const Login = ({ setIsAuthenticated }) => {
    const [loginError, setLoginError] = useState("");
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            username: "",
            password: "",
        }
    });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoginError("");
        try {
            const response = await login(data);

            localStorage.setItem("token", "true");

            // 🔥 actualiza estado global
            setIsAuthenticated(true);
            reset();

            navigate("/");

        } catch (error) {
            if (error.response) {
                console.log(error.response.data.mensaje);

                setLoginError("Usuario o contraseña incorrectos");

                reset();
            } else {
                console.log("Error de conexion con el servidor");
                setLoginError("Error de conexión con el servidor");
                reset();
            }
        }
    };

    useEffect(() => {
        reset({
            username: '',
            password: ''
        });
        setLoginError("");
    }, [reset]);

    return (
        <div className='container-login'>
            <img src={logo} alt="logo" />
            <h2>Inventario IT</h2>
            <h5>Inicie sesión para acceder al sistema</h5>
            <form className='login-card' onSubmit={handleSubmit(onSubmit)}>
                <label className='label-login' htmlFor="username">Usuario</label>
                <input className='input-login' type="text" id='username' placeholder='usuario' {...register("username")} autoComplete="off" />
                <label className='label-login' htmlFor='password'>Contraseña</label>
                <input className='input-login' type="password" id='password' placeholder='*******' {...register("password")} autoComplete="off" />
                <div className='input-label'>
                </div>
                {loginError && (
                    <p style={{ color: 'red', marginTop: '10px', textAlign: 'center', fontWeight: '600', fontSize: "12px" }}>
                        {loginError}
                    </p>
                )}
                <button className='login-boton'>Iniciar Sesión →</button>
            </form>
            <h6>Credenciales de acceso restringido</h6>
        </div>
    )
};

export default Login;
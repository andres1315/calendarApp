import Swal from "sweetalert2";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useForm } from "../../hooks/useForm";
import "./LoginPage.css";
const loginFormFiles = {
  loginEmail: "",
  loginPassword: "",
};

const registerFormFiles = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerConfirmPassword: "",
};

export const LoginPage = () => {
  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFiles);

  const {
    registerEmail,
    registerName,
    registerPassword,
    registerConfirmPassword,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFiles);

  const {startLogin,startRegister}=useAuthStore()
  const loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startLogin({email:loginEmail,password:loginPassword})
  };

  const registerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(registerPassword!==registerConfirmPassword) return Swal.fire('Error','Las contraseñas no coinciden','error')
    startRegister({email:registerEmail,password:registerPassword,name:registerName})
  }

  return (
    <div className="container login-container mx-auto ">
      <div className="grid grid-cols-12 gap-4 mx-auto">
        <div className="col-span-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="mb-2">
              <input
                type="text"
                className="border-2 border-gray-300 rounded-md w-full p-2"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="mb-2">
              <input
                type="password"
                className="border-2 border-gray-300 rounded-md w-full p-2"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="mb-2 flex items-center justify-center">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-span-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="mb-2">
              <input
                type="text"
                className="border-2 border-gray-300 rounded-md w-full p-2"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}

              />
            </div>
            <div className="mb-2">
              <input
                type="email"
                className="border-2 border-gray-300 rounded-md w-full p-2"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="mb-2">
              <input
                type="password"
                className="border-2 border-gray-300 rounded-md w-full p-2"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}

              />
            </div>

            <div className="mb-2">
              <input
                type="password"
                className="border-2 border-gray-300 rounded-md w-full p-2"
                placeholder="Repita la contraseña"
                name="registerConfirmPassword"
                value={registerConfirmPassword}
                onChange={onRegisterInputChange}

              />
            </div>

            <div className="mb-2 flex items-center justify-center">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

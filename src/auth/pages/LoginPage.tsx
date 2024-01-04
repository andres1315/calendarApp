import './LoginPage.css'
export const LoginPage = () => {
  return (
    <div className="container login-container mx-auto ">
            <div className="grid grid-cols-12 gap-4 mx-auto">
                <div className="col-span-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form>
                        <div className="mb-2">
                            <input 
                                type="text"
                                className="border-2 border-gray-300 rounded-md w-full p-2"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="mb-2">
                            <input
                                type="password"
                                className="border-2 border-gray-300 rounded-md w-full p-2"
                                placeholder="Contraseña"
                            />
                        </div>
                        <div className="mb-2 flex items-center justify-center">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-span-6 login-form-2">
                    <h3>Registro</h3>
                    <form>
                        <div className="mb-2">
                            <input
                                type="text"
                                className="border-2 border-gray-300 rounded-md w-full p-2"
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="mb-2">
                            <input
                                type="email"
                                className="border-2 border-gray-300 rounded-md w-full p-2"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="mb-2">
                            <input
                                type="password"
                                className="border-2 border-gray-300 rounded-md w-full p-2"
                                placeholder="Contraseña" 
                            />
                        </div>

                        <div className="mb-2">
                            <input
                                type="password"
                                className="border-2 border-gray-300 rounded-md w-full p-2"
                                placeholder="Repita la contraseña" 
                            />
                        </div>

                        <div className="mb-2 flex items-center justify-center" >
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'

export const RegisterScreen = () => {
  return (
 
        <div className=" register-container">
                <div className="col-md-6 login-form-2">
                                <h3>Registro</h3>
                                <form>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Correo"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Contraseña" 
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Repita la contraseña" 
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input 
                                            type="submit" 
                                            className="btnSubmit" 
                                            value="Crear cuenta" />
                                    </div>
                                            <Link to="/login" className="link">
                                           Login
                                            </Link>
                                 </form>
                            </div>
                </div>
  )
}

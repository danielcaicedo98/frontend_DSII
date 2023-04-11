import "assets/css/paypal-button.css"


const PagoLinea = () => {

    return (
        <>
            <div className="header p-4 bg-white text-dark rounded" alt="..." >
                
                <h1 class="display-2" align="center">
                    Bienvenido al Portal de pago en línea (Paypal)
                </h1>
                <h2>
                    En esta sección podrás realizar el pago de tu factura en linea a través de paypal, para ello vas a necesitar a la mano: <br />
                </h2>

                <h3>
                    <dl>
                        <em>
                            <li>Cuenta Paypal</li>
                            <li>Contraseña</li>
                            <li>Fondos suficientes</li>
                        </em>
                    </dl>
                </h3>
 
                <h2>
                    Para proceder con el pago, de click al siguiente botón:
                </h2>

                <div className="mt-4" align="center">
                    <a className="paypal-button" type="button"><img className="h-25" width='25' src={require("../../assets/img/brand/paypal.png")}></img>Paypal</a>
                </div>

                <footer align="center">    
                    <img className="h-25" width='40%' src={require("../../assets/img/brand/paypal-credit-card-logo.png")}></img>
                </footer>

            </div>

        </>
    )
}

export default PagoLinea;
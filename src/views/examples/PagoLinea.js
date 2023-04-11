import "assets/css/paypal-button.css"


const PagoLinea = () => {

    return (
        <>
            <div className="header p-4 bg-light text-dark rounded" alt="...">
                <h1 class="display-3 text-dark">
                    Pago en línea (Paypal)
                </h1>
                <p>
                    En esta sección podrás realizar el pago de tu factura en linea a través de paypal, para ello vas a necesitar a la mano: <br />
                </p>
                <dl>
                    <li>Cuenta Paypal</li>
                    <li>Contraseña</li>
                    <li>Fondos suficientes</li>
                </dl>
 
                <p>
                    Para proceder con el pago, de click al siguiente botón:
                </p>

                <div>
                    <a className="paypal-button" type="button"><img className="h-25" width='25' src={require("../../assets/img/brand/paypal.png")}></img>Paypal</a>
                </div>

            </div>

        </>
    )
}

export default PagoLinea;
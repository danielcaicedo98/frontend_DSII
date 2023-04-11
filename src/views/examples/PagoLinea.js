import "assets/css/paypal-button.css"


const PagoLinea = () => {

    return (
        <>
            <div className="header p-4 bg-light text-dark">
                <h1>
                    Pago en línea (Paypal)
                </h1>
                <p>
                    En esta sección podrás realizar el pago de tu factura en linea a través de paypal, para ello vas a necesitar a la mano: <br />
                </p>
                <ol >
                    <li>Cuenta Paypal</li>
                    <li>Contraseña</li>
                    <li>Fondos suficientes</li>
                </ol>
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
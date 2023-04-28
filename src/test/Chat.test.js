import { render, fireEvent } from "@testing-library/react";
const Chat = require('../views/examples/Chat');

test("Enviar mensaje al hacer clic en el botón", () => {
  const { getByLabelText, getByText } = render(<Chat />);
  const input = getByLabelText("Email address");
  const button = getByText("Enviar");
  fireEvent.change(input, { target: { value: "Hola" } });
  fireEvent.click(button);
  const mensajeEnviado = getByText("TU : Hola");
  expect(mensajeEnviado).toBeInTheDocument();
});

test("Conexión con el servidor", () => {
    const { getByText } = render(<Chat />);
    const mensajeConexion = getByText("CONECTADO");
    expect(mensajeConexion).toBeInTheDocument();
});
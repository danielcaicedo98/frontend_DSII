
# DESARROLLO DE SOFTWARE I
-----------------------------------------------------------------------------------------------------

## NRG-X


Este proyecto es para la empresa de energía eléctrica NRG-X, el cual tiene el propósito de gestionar la facturación del servicio eléctrico que consume cada uno de sus clientes, dichos clientes serán usuarios del sistema, los cuáles podrán acceder  para consultar o pagar sus facturas. Así mismo, se contará con otros tipos de usuarios como: Administrador, Operador y Gerente, dónde cada uno de ellos contará con sus respectivas funcionalidades permitiendo así optimizar el manejo de muchas actividades de la empresa.

Esta app puede ser útil para empresas de energía eléctrica pero además puede ser empleado por otro tipo de empresas prestadoras de servicio, como también para aquellas personas naturales que ofrecen un servicio y quieren llevar un control de lo consumido por sus clientes.

### Flujo de trabajo Git

En el equipo se utiliza el flujo de trabajo Git Trunk, donde se cuenta con una única rama principal denomida main para registrar el historial del proyecto:

- main (Producción)

Con este flujo, o mejor llamado estrategía, todo el equipo colabora he integra directamente (hace push), siguiendo estas consideraciones:

- No existen branches de larga duración. 
- Se debe hacer commit al menos una vez al día (esto no significa que vamos integrar cualquier código solo por hacer commit, el siguiente punto lo explica mejor). Esto lo que busca es eliminar la distancia entre los desarrolladores cuando se empieza a codear cosas nuevas.
- Todo lo que se le haga commit es código funcional, esto implica que se cumpla la definición de hecho (definition of done), se hayan creado las pruebas necesarias y todo lo que sea requerido para asegurarse que el código no esta introduciendo un bug 🐛. Esto significa que el equipo debe de tener un grado de madurez y responsabilidad alto al momento de entregar el código.
- El trunk siempre debe encontrarse en un estado verde y optimo con esto quiero decir listo para hacerle release.

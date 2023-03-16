
# DESARROLLO DE SOFTWARE I
-----------------------------------------------------------------------------------------------------

## NRG-X


Este proyecto es para la empresa de energía eléctrica NRG-X, el cual tiene el propósito de gestionar la facturación del servicio eléctrico que consume cada uno de sus clientes, dichos clientes serán usuarios del sistema, los cuáles podrán acceder  para consultar o pagar sus facturas. Así mismo, se contará con otros tipos de usuarios como: Administrador, Operador y Gerente, dónde cada uno de ellos contará con sus respectivas funcionalidades permitiendo así optimizar el manejo de muchas actividades de la empresa.

Esta app puede ser útil para empresas de energía eléctrica pero además puede ser empleado por otro tipo de empresas prestadoras de servicio, como también para aquellas personas naturales que ofrecen un servicio y quieren llevar un control de lo consumido por sus clientes.

### Flujo de trabajo Git

En el equipo se utiliza un flujo de trabajo derivado de Gitflow, donde en lugar de una única rama, contamos con 3 ramas principales para registrar el historial del proyecto:

- main (Producción)
- testing (Pruebas de calidad)
- development (Desarrollo)

En primer lugar se cuenta con la rama **_main_** la cual estará publicada en un servidor para uso de los usuarios en producción y a partir de ella se derivan las ramas *HotFix* para la resolución de errores en producción. En segundo lugar, contamos con la rama **_testing_** la cual contará con todos los cambios estables, listos para ser publicados y sirve para probar la calidad de los desarrollos sin que se agreguen nuevos, es poreso que de esta rama se derivan ramas *bugfix* orientadas a la corrección de errores de calidad, y otras orientadas a la publicación. Por último, se tiene la rama **_development_**, de la cual se derivaran todas aquellas ramas *features* corresnpodientes a los nuevos desarrollos que se incorporarán al proyecto.

Tanto **testing** como **development** no cuentan con un servidor dedicado, sino que son ejecutados de forma local (localhost).


### El flujo general es el siguiente:

1. Se crea una rama **development** a partir de **main**.
    - Cada nuevo desarrollo (**_feature_**) se crea a partir de **development**
    - Cuando se termina una rama feature, se fusiona en la rama development.

2. Se crea una rama **testing** a partir de **development**.
    - si se detecta un problema en testing, se crea una rama **bugfix** a partir de **testing**.
    - Una vez terminada la rama **bugfix**, esta se fusiona tanto en developmen como en testing.
    - Cuando la rama testing está lista, se fusiona en las ramas development y main.

3. Si se detecta un problema en main, se crea una rama **hotfix** a partir de **main**.
    - Una vez terminada la rama hotfix, esta se fusiona tanto en developmen como en main y testing.

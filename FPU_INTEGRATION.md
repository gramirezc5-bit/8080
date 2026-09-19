# Integración conceptual de un coprocesador de punto flotante (FPU)

## 1. Introducción

El presente proyecto consiste en la ampliación de un emulador educativo del microprocesador Intel 8080 mediante la incorporación conceptual de un coprocesador de punto flotante (FPU). Se realizó un fork del repositorio original para desarrollar las modificaciones de manera independiente, conservando las funcionalidades existentes del emulador.

La propuesta busca demostrar cómo un procesador principal puede apoyarse en una unidad especializada para realizar operaciones matemáticas con números decimales.

## 2. Objetivo

Integrar un módulo educativo de punto flotante al emulador Intel 8080, permitiendo realizar operaciones de suma, resta, multiplicación y división mediante registros independientes y una interfaz gráfica.

## 3. Arquitectura conceptual

La arquitectura propuesta contempla dos componentes principales:

- CPU Intel 8080: procesador principal encargado de ejecutar las instrucciones de su arquitectura original.
- Coprocesador FPU: módulo especializado que realiza operaciones matemáticas con números de punto flotante.

En una integración completa, la CPU enviaría los operandos y la operación solicitada al coprocesador. La FPU realizaría el cálculo y devolvería el resultado mediante un mecanismo de comunicación, como registros de entrada/salida o memoria compartida.

En la implementación actual, la FPU funciona como un módulo independiente dentro de la aplicación y recibe las solicitudes directamente desde la interfaz gráfica. La comunicación directa entre la CPU emulada y la FPU queda planteada como una ampliación futura.

## 4. Componentes implementados

### Archivo fpu.js

Se desarrolló una clase FPU con los registros F0 y F1, un registro de resultado y un indicador de error. El módulo permite cargar valores, ejecutar operaciones matemáticas, consultar su estado y reiniciar sus registros.

Las operaciones implementadas son:

- FADD: suma de F0 y F1.
- FSUB: resta de F1 a F0.
- FMUL: multiplicación de F0 y F1.
- FDIV: división de F0 entre F1, con detección de división entre cero.

### Archivo index.html

Se incorporó un panel visual con campos para introducir los valores de F0 y F1, botones para ejecutar las cuatro operaciones, un indicador de resultado y mensajes de estado. También se agregó la carga del archivo fpu.js antes de main.js.

### Archivo main.js

Se implementaron los eventos de los botones para transferir los valores introducidos en la interfaz al módulo FPU, ejecutar la operación seleccionada y mostrar el resultado o el mensaje de error correspondiente.

## 5. Funcionamiento

El usuario introduce dos valores decimales en los campos F0 y F1. Al seleccionar una operación, main.js recoge los operandos y los carga en los registros del módulo FPU. El coprocesador realiza el cálculo y devuelve el resultado a la interfaz.

Por ejemplo, al ingresar F0 = 5.5 y F1 = 2.5 y presionar FADD, el módulo realiza la suma y muestra el resultado 8.

Las operaciones FADD, FSUB, FMUL y FDIV son comandos educativos del módulo agregado; no forman parte del conjunto original de instrucciones del Intel 8080 y actualmente no son interpretadas por el ensamblador del emulador.

## 6. Pruebas funcionales

Se realizaron las siguientes pruebas desde la interfaz gráfica:

| Prueba | Valores | Resultado obtenido | Estado |
|---|---|---|---|
| FADD | 5.5 + 2.5 | 8 | Correcto |
| FSUB | 5.5 - 2.5 | 3 | Correcto |
| FMUL | 5.5 × 2.5 | 13.75 | Correcto |
| FDIV | 5.5 / 2.5 | 2.2 | Correcto |
| División entre cero | 10 / 0 | Error detectado | Correcto |

Las pruebas confirmaron el funcionamiento de las cuatro operaciones y la detección de división entre cero mediante el panel FPU.

## 7. Alcances y limitaciones

El proyecto incorpora un coprocesador educativo que utiliza las operaciones numéricas de JavaScript para representar cálculos de punto flotante. No reproduce un coprocesador físico ni implementa un protocolo de comunicación real con el Intel 8080.

Los registros F0 y F1 son variables del módulo FPU y no registros físicos del procesador original. Tampoco se implementaron instrucciones adicionales dentro del ensamblador ni mecanismos de transferencia de datos entre la CPU emulada y la FPU.

Como mejora futura se propone implementar registros de comunicación, instrucciones de entrada/salida o un mecanismo de memoria compartida para permitir que la CPU solicite operaciones al coprocesador y consulte sus resultados.

## 8. Conclusión

La ampliación del emulador permitió comprender de manera práctica la función de un coprocesador de punto flotante y su utilidad para realizar operaciones matemáticas especializadas. Mediante la creación de un módulo independiente y su integración con la interfaz gráfica, se logró demostrar el funcionamiento de las operaciones básicas y el manejo de errores.

Esta implementación constituye una primera aproximación educativa a la arquitectura de un sistema con coprocesador y establece una base para desarrollar posteriormente una comunicación directa entre la CPU Intel 8080 y la FPU.

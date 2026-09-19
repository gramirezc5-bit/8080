// ======================================================
// Coprocesador de Punto Flotante (FPU)
// Integracion conceptual con el emulador Intel 8080
// ======================================================

class FPU {
  constructor() {
    // Registros de punto flotante del coprocesador
    this.F0 = 0.0;
    this.F1 = 0.0;
    this.result = 0.0;

    // Estado del coprocesador
    this.error = false;
  }

  // Carga un valor en uno de los registros
  load(register, value) {
    const number = Number(value);

    if (Number.isNaN(number)) {
      this.error = true;
      throw new Error("El valor ingresado no es numerico.");
    }

    if (register === "F0") {
      this.F0 = number;
    } else if (register === "F1") {
      this.F1 = number;
    } else {
      this.error = true;
      throw new Error("Registro FPU no valido.");
    }

    this.error = false;
  }

  // FADD: suma
  add() {
    this.result = this.F0 + this.F1;
    this.error = false;
    return this.result;
  }

  // FSUB: resta
  sub() {
    this.result = this.F0 - this.F1;
    this.error = false;
    return this.result;
  }

  // FMUL: multiplicacion
  mul() {
    this.result = this.F0 * this.F1;
    this.error = false;
    return this.result;
  }

  // FDIV: division
  div() {
    if (this.F1 === 0) {
      this.error = true;
      throw new Error("Division entre cero en la FPU.");
    }

    this.result = this.F0 / this.F1;
    this.error = false;
    return this.result;
  }

  // Reinicia el coprocesador
  reset() {
    this.F0 = 0.0;
    this.F1 = 0.0;
    this.result = 0.0;
    this.error = false;
  }

  // Devuelve el estado actual
  getState() {
    return {
      F0: this.F0,
      F1: this.F1,
      result: this.result,
      error: this.error
    };
  }
}

// Instancia del coprocesador
const fpu = new FPU();

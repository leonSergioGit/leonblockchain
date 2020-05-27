

/**
 * Este archivo consiste en la clase transaccion, la cual contiene la información correspondiente y que se introducirá en el array de transacciones del un bloque
 * @file
 */

/**
* Clase transacciones que serán incluidas en los bloques los cuales forman el blockchain.
* @class 
* @property {string} hospital  Nombre del hospital.
* @property {string} country País del hospital.
* @property {string} patientInfo Información del paciente.
* @property {string} symptoms Síntomas del paciente.
* @property {string} transactionId Id de la transacción.
*/
class Transaction {
    hospital: string;
    country: string;
    patientInfo: string;
    symptoms: string;
    transactionId: string;

    /**
     * @constructs
     * @param hospital Nombre del hospital.
     * @param country País del hospital.
     * @param patientInfo Información del paciente.
     * @param symptoms Síntomas del paciente.
     * @param transactionId Id de la transacción.
     */
    constructor(hospital: string, country: string, patientInfo: string, symptoms: string, transactionId: string) {
        this.hospital = hospital;
        this.country = country;
        this.patientInfo = patientInfo;
        this.symptoms = symptoms;
        this.transactionId = transactionId;
    }

}


export default Transaction;
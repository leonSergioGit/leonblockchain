class Transaction {
    hospital: string;
    country: string;
    patientInfo: string;
    symptoms: string;
    transactionId: string;


    constructor(hospital: string, country: string, patientInfo: string, symptoms: string, transactionId: string) {
        this.hospital = hospital;
        this.country = country;
        this.patientInfo = patientInfo;
        this.symptoms = symptoms;
        this.transactionId = transactionId;
    }

}


export default Transaction;
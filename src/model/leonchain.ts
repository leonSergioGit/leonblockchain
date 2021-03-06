//watch file constantly tsc file -w
//tsc --init to create a typescript config file
//typescript files should be in the src
/*
const greeting: string = 'Hello';
const numbers: number[] = [1, 2, 3];
*/

//Importamos la clase block que formará cada uno de los elementos del blockchain
import Block from './Block';
import Transaction from './Transaction';
//Interfaz blockchain que se implementa en la clase LeonChain.
import Iblockchain from './Iblockchain';
import { v4 as uuid } from 'uuid';
import sha256 from 'crypto-js/sha256';

/**
 * Archivo que consiste en la clase leonchain, que es donde creamos el blockchain, y que implementa la interfaz IBlockchain
 * @file
 */

/**
 * Clase que es un Blockchain y que implementa la Interfaz IBlockchain.
 * @class
 * @implements Implementa la interfaz Iblockchain
 * 
 */
class LeonChain implements Iblockchain {
    chain: Block[];
    pendingTransactions: object[];
    currentNodeUrl: string;
    networkNodes: string[];

    
    /**
     * Constructor de la clase blockchain que crea el array que formará la cadena, el array de las transacciones pendientes y el array de los nodos
     * @constructs
     */
    constructor(){
        this.chain = []
        this.pendingTransactions = [];
        this.currentNodeUrl = "";
        this.networkNodes = [];
    } 
    

    
    

    //Implementación de los métodos del interfaz Iblockchain
    /**
     * Función que crea el conocido como genesis block. El genesis block es el primer bloque de la cadena, el cual debido a las peculiares características del Blockchain, debe ser creado manualmente (hardcoded).
     * @function
     */
    creationGenesisBlock(){
        const genesisBlock = new Block(1, Date.now(), ["Welcome to my blockchain. I did it my way"], 0, "BlockHash", "PreviousBlockHash");

        this.chain.push(genesisBlock);
        return genesisBlock;
    }
    
    /**
     * Función que crea un bloque con todos los datos necesarios y 10 transacciones y lo añade al blockchain. Devuelve el bloque creado
     * @function
     */
    createNewBlock(): Block {

        let transacciones = [];
        let newBlock: Block;
        if(this.pendingTransactions.length > 10){
            for(let i = 0; i < 10; i++){
                transacciones.push(this.pendingTransactions.shift())
            }

            let previousBlockHash = this.chain[this.chain.length - 1].hash;
            let actualDate = Date.now();
            let hash = this.hashBlock(previousBlockHash, transacciones, 0, this.chain.length + 1, actualDate)
            newBlock = new Block(this.chain.length + 1, actualDate, transacciones, 0, hash, previousBlockHash)

             //Validamos la cadena antes de añadir el bloque
             let isValid = this.validateTheBlockchain(this);
             

            //Añadimos el bloque al blockchain
            this.chain.push(newBlock);

            //Devolvemos el bloque
            return newBlock
        }

        return new Block(0, Date.now(), [], 0, "afadsf", "!afd");
    }

    /**
     * Función que devuelve el último bloque de la cadena.
     * @function
     */
    getLastBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    /**
     * Functión que crea una nueva transacción. 
     * @function
     * @param hospital Nombre del hospital de quien realiza la transacción.
     * @param country País al que pertenece el hospital.
     * @param patientInfo Información del paciente.
     * @param symptoms Síntomas. 
     */
    createNewTransaction(hospital: string, country: string, patientInfo: string, symptoms: string): Transaction {
        let idTransaction = uuid().split('-').join('');
        const newTransaction = new Transaction(hospital, country, patientInfo, symptoms, idTransaction); 
      
        return newTransaction;
    }

    /**
     * Función que añade una transacción al array de transacciones pendientes. 
     * @function
     * @param transactionObj Transacción que será añadida al array de transacciones pendientes.
     */
    addTransactionToPendingTransactions(transactionObj: object): object[] {
        this.pendingTransactions.push(transactionObj);

        return this.pendingTransactions;
    }

    /**
     * Función que pasa todo el bloque para codificarlo-hashearlo mediante el algoritmo sha256.
     * @function
     * @param previousBlockHash Hash del anterior bloque.
     * @param currentBlockData Datos del bloque actual.
     * @param nonce Número a resolver por la minería. 
     */
    hashBlock(previousBlockHash: string, currentBlockData: object, nonce: number, index: number, timestamp: number): string {
        const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData) + timestamp.toString();
        const hash = sha256(dataAsString).toString();
    
        return hash;
    }

    /**
     * Función que consiste en resolver el número nonce. Es en esto en lo que consiste la minería.
     * @param previousBlockHash Hash del anterior bloque.
     * @param currentBlockData Datos del bloque actual.
     */
    proofOfWork(previousBlockHash: string, currentBlockData: object): number {
        throw new Error("Method not implemented.");
    }

    /**
     * Función que devuelve un bloque a partir de su hash.
     * @function
     * @param blockHash Hash del bloque que se desea obtener.
     */
    getBlock(blockHash: string): Block {
        throw new Error("Method not implemented.");
    }

    /**
     * Función que devuelve una transacción a partir de su id.
     * @function
     * @param transactionId Id de la trasacción que se desea obtener.
     */
    getTransaction(transactionId: string): object {
        throw new Error("Method not implemented.");
    }

    validateTheBlockchain(blockchain: LeonChain): boolean {
        //Validar el blockchain antes y después de agregar un bloque.
        //Antes de agregar el bloque, validamos. 
        //Si es correcto, lo agregamos.
        //Una vez agregado, lo volvemos a validar.
        //Si no pasa el test, no lo agregamos.

        let isValid: boolean = true;

        //Validamos el blockchain antes de añadir el nuevo bloque
        for(let i = 0; i < blockchain.chain.length - 1; i++){
            if(blockchain.chain[i].hash != blockchain.chain[i + 1].previousBlockHash){
                isValid = false;
                break;
            }
        }

        return isValid;
    }
}



export default LeonChain;
import axios from "axios";

// const BASE_URL = "http://16.16.24.209:8080/api/Invoices";
const BASE_URL = "http://127.0.0.1:8080/api/Invoices";

class InvoiceService{

    //**Method to get all Invoice from our api or database */
    getAllInvoice(){
        return axios.get(BASE_URL);
    }
    /**MEthod to save Invoice */
    saveInvoice(InvoiceData){
        return axios.post(BASE_URL, InvoiceData);
    }
    updateInvoice(id, InvoiceData){
        return axios.put(`${BASE_URL}/${id}`, InvoiceData)
    }
    getInvoiceById(id){
        return axios.get(`${BASE_URL}/${id}`);
    }
    deleteInvoice(id){
        return axios.delete(BASE_URL +"/" +id);
    }

}
export default new InvoiceService();
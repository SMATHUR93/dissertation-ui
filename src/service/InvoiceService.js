import axios from "axios";

const BASE_URL = "http://13.51.167.78:8080/api/Invoices";
// const BASE_URL = "http://127.0.0.1:8080/api/Invoices";

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

    createJiraTicket = async (apiToken, projectKey, summary, description) => {
        const apiUrl = `http://localhost:3001/create-jira-ticket`;

        console.log("In invsrv :: createJiraTicket");
        try {
            console.log("In invsrv :: calling api");
            const response = await axios.post(apiUrl, {
                apiToken,
                projectKey,
                summary,
                description,
            });
            console.log('Jira Ticket Created:', response.data);
            return response.data;
        } catch (error) {
            console.error('InvoiceService :: Error creating Jira Ticket:', error);
            return "Error in creating issue, please try again later";
        }
    };


}
export default new InvoiceService();
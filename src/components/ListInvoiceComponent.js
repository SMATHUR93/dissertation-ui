import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    Button,
    Table,
    Container, Row, Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPen, 
    faTrashCan,
    faPlus
} from '@fortawesome/free-solid-svg-icons';
import InvoiceService from '../service/InvoiceService';
import * as Constants from '../constants/Constants';
import {
    convertCamelCaseToTitleCaseFunction
} from '../commons/CommonMethods';

const ListInvoiceComponent = () => {

    const [InvoiceArray, setInvoiceArray] = useState([]);

    useEffect(() => {
        getAllInvoice();
    }, []);

    function getAllInvoice() {
        InvoiceService.getAllInvoice()
            .then(res => {
                setInvoiceArray(res.data);
                console.log(res) 
            })
            .catch(e => console.log(e));
    }
    function deleteInvoice(e, id) {
        e.preventDefault()
        InvoiceService.deleteInvoice(id)
            .then(getAllInvoice())
            .catch(e => console.log(e));
    }

    return (
        <div>
            <br/>
            <br/>
            <Container
                fluid="xl"
            >
                <Row>
                    <Col
                        className="align-middle"
                        xs="3"
                    >
                        <h2 className='float-start align-middle'>List Invoice</h2>
                    </Col>
                    <Col
                        className="align-middle"
                        xs="9"
                    >
                        <Link to={"/add-Invoice"} className='btn btn-primary float-end align-middle' href="">
                            <FontAwesomeIcon icon={faPlus} />&nbsp;Create Invoice
                        </Link>                    
                    </Col>
                </Row>
            </Container>

            <div>&nbsp;</div>

            <Container
                fluid="xl text-center"
            >
                <Table hover>
                    <thead>
                        {/* <th>{convertCamelCaseToTitleCaseFunction(Constants.id)}</th> */}
                        <th>{convertCamelCaseToTitleCaseFunction(Constants.invoiceName)}</th>
                        <th>{convertCamelCaseToTitleCaseFunction(Constants.invoiceNumber)}</th>
                        <th>{convertCamelCaseToTitleCaseFunction(Constants.vendorName)}</th>
                        <th>{convertCamelCaseToTitleCaseFunction(Constants.invoiceOwner)}</th>
                        <th>{convertCamelCaseToTitleCaseFunction(Constants.policyType)}</th>
                        <th className="text-center">Actions</th>
                    </thead>
                    <tbody>
                        {InvoiceArray.map(Invoice =>
                            <tr id={Invoice.id}>
                                {/* <td>{Invoice[Constants.id]}</td> */}
                                <td>{Invoice[Constants.invoiceName]}</td>
                                <td>{Invoice[Constants.invoiceNumber]}</td>
                                <td>{Invoice[Constants.vendorName]}</td>
                                <td>{Invoice[Constants.invoiceOwner]}</td>
                                <td>{Invoice[Constants.policyType]}</td>
                                <td className="text-center">
                                    <Link to={"/add-Invoice/"+Invoice.id} className='btn btn-warning' href="">
                                        <FontAwesomeIcon icon={faPen} />&nbsp; Update
                                    </Link>
                                    &nbsp;
                                    <Button
                                        color="danger"
                                        onClick={(e) => deleteInvoice(e, Invoice.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} />&nbsp;Delete
                                    </Button>
                                </td>
                            </tr>)}

                    </tbody>
                </Table>
            </Container>
            
        </div>
    )
}

export default ListInvoiceComponent
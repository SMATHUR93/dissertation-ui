import React, { useState, useEffect } from 'react'
import InvoiceService from '../service/InvoiceService';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Table,
    Container, Row, Col,
    Form, FormGroup, Label, Input,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Badge
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCheck, faCircleCheck, faArrowDownLong, faCircle } from '@fortawesome/free-solid-svg-icons';
import * as Constants from '../constants/Constants';
import {
    convertCamelCaseToTitleCaseFunction
} from '../commons/CommonMethods';

const AddInvoiceComponent = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const [approvalFlowModal, setApprovalFlowModal] = useState(false);
    const approvalFlowModalToggle = () => setApprovalFlowModal(!approvalFlowModal);

    const [auditTrailsModal, setAuditTrailsModal] = useState(false);
    const auditTrailsModalToggle = () => setAuditTrailsModal(!auditTrailsModal);

    /** Variables and method to collect and store inputes */
    const [invoice, setInvoice] =  useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    const [invoiceStatus, setInvoiceStatus] = useState('NOT_FILED');

    const [vendorName, setVendorName] = useState('');
    const [invoiceOwner, setInvoiceOwner] = useState('');
    const [policyType, setPolicyType] = useState('');

    const [invoiceName, setInvoiceName] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [invoiceDate, setInvoiceDate] = useState('');

    const [invoiceAmount, setInvoiceAmount] = useState('');
    const [shippingAmount, setShippingAmount] = useState('');
    const [taxAmount, setTaxAmount] = useState('');

    const [li1ExpenseType, setLi1ExpenseType] = useState('');
    const [li1LineDescription, setLi1LineDescription] = useState('');
    const [li1Quantity, setLi1Quantity] = useState('');
    const [li1UnitPrice, setLi1UnitPrice] = useState('');

    const [li2ExpenseType, setLi2ExpenseType] = useState('');
    const [li2LineDescription, setLi2LineDescription] = useState('');
    const [li2Quantity, setLi2Quantity] = useState('');
    const [li2UnitPrice, setLi2UnitPrice] = useState('');

    const [li3ExpenseType, setLi3ExpenseType] = useState('');
    const [li3LineDescription, setLi3LineDescription] = useState('');
    const [li3Quantity, setLi3Quantity] = useState('');
    const [li3UnitPrice, setLi3UnitPrice] = useState('');

    const [li4ExpenseType, setLi4ExpenseType] = useState('');
    const [li4LineDescription, setLi4LineDescription] = useState('');
    const [li4Quantity, setLi4Quantity] = useState('');
    const [li4UnitPrice, setLi4UnitPrice] = useState('');

    const [li5ExpenseType, setLi5ExpenseType] = useState('');
    const [li5LineDescription, setLi5LineDescription] = useState('');
    const [li5Quantity, setLi5Quantity] = useState('');
    const [li5UnitPrice, setLi5UnitPrice] = useState('');

    //bundle the inputs from user
    const InvoiceData = {
        vendorName, 
        invoiceOwner, 
        policyType,
        invoiceName, 
        invoiceNumber,
        invoiceDate,
        invoiceAmount, 
        shippingAmount, 
        taxAmount, 
        li1ExpenseType, 
        li1LineDescription, 
        li1Quantity, 
        li1UnitPrice, 
        li2ExpenseType, 
        li2LineDescription, 
        li2Quantity, 
        li2UnitPrice, 
        li3ExpenseType, 
        li3LineDescription, 
        li3Quantity, 
        li3UnitPrice, 
        li4ExpenseType, 
        li4LineDescription, 
        li4Quantity, 
        li4UnitPrice, 
        li5ExpenseType, 
        li5LineDescription, 
        li5Quantity, 
        li5UnitPrice
    };

    function submitInvoice(e) {
        e.preventDefault();
        setInvoiceStatus("PENDING_APPROVAL");
        saveInvoice(e);
    }

    function approveInvoice(e) {
        e.preventDefault();
        setInvoiceStatus("APPROVED");
        saveInvoice(e);
    }

    function rejectInvoice(e) {
        e.preventDefault();
        setInvoiceStatus("NOT_FILED");
        saveInvoice(e);
    }

    function processPayment(e) {
        e.preventDefault();
        setInvoiceStatus("PAYMENT_PROCESSING");
        saveInvoice(e);
    }

    /**send data to api and navigate when succesful */
    function saveInvoice(e) {
        e.preventDefault();

        // if (InvoiceData.firstName !== "" && InvoiceData.lastName !== "" && InvoiceData.email != "") {
            /**If id is present in the parameter, it should update else it should save */
            if (id) {
                InvoiceService.updateInvoice(id, InvoiceData)
                    .then(navigate("/Invoice"))
                    .catch(e => console.log(e));
            } else {
                InvoiceService.saveInvoice(InvoiceData)
                    .then(navigate("/Invoice"))
                    .catch(e => console.log(e));
            }

        /* } else {
            alert("Please, fill in all inputes");
        } */
    }

    function tile() {
        if (id) {
            return "Update Invoice";
        } else {
            return "Add Invoice";
        }
    }
    useEffect(() => {
        if (id) {
            InvoiceService.getInvoiceById(id)
                .then(res => {
                    let invoice = res.data;
                    setInvoice(invoice);

                    setInvoiceStatus(invoice[Constants.setInvoiceStatus]);

                    setVendorName(invoice[Constants.vendorName]);
                    setInvoiceOwner(invoice[Constants.invoiceOwner]);
                    setPolicyType(invoice[Constants.policyType]);
                    
                    setInvoiceName(invoice[Constants.invoiceName]);
                    setInvoiceNumber(invoice[Constants.invoiceNumber]);
                    setInvoiceDate(invoice[Constants.invoiceDate]);
    
                    setInvoiceAmount(invoice[Constants.invoiceAmount]);
                    setShippingAmount(invoice[Constants.shippingAmount]);
                    setTaxAmount(invoice[Constants.taxAmount]);

                    setLi1ExpenseType(invoice[Constants.li1ExpenseType]);
                    setLi1LineDescription(invoice[Constants.li1LineDescription]);
                    setLi1Quantity(invoice[Constants.li1Quantity]);
                    setLi1UnitPrice(invoice[Constants.li1UnitPrice]);

                    setLi2ExpenseType(invoice[Constants.li2ExpenseType]);
                    setLi2LineDescription(invoice[Constants.li2LineDescription]);
                    setLi2Quantity(invoice[Constants.li2Quantity]);
                    setLi2UnitPrice(invoice[Constants.li2UnitPrice]);

                    setLi3ExpenseType(invoice[Constants.li3ExpenseType]);
                    setLi3LineDescription(invoice[Constants.li3LineDescription]);
                    setLi3Quantity(invoice[Constants.li3Quantity]);
                    setLi3UnitPrice(invoice[Constants.li3UnitPrice]);

                    setLi4ExpenseType(invoice[Constants.li4ExpenseType]);
                    setLi4LineDescription(invoice[Constants.li4LineDescription]);
                    setLi4Quantity(invoice[Constants.li4Quantity]);
                    setLi4UnitPrice(invoice[Constants.li4UnitPrice]);

                    setLi5ExpenseType(invoice[Constants.li5ExpenseType]);
                    setLi5LineDescription(invoice[Constants.li5LineDescription]);
                    setLi5Quantity(invoice[Constants.li5Quantity]);
                    setLi5UnitPrice(invoice[Constants.li5UnitPrice]);

                })
                .catch(e => console.log(e));
        }
    }, []);

    return (
        <div>

            <br/>
            
            <FontAwesomeIcon 
                icon={faChevronLeft} 
                size="md" style={{float: 'inline-start', marginTop: "12px"}} 
                onClick={(e) => window.location.href = "/Invoice"}
            />
            <h2 style={{marginLeft: "20px"}}>{id ? "Update Invoice "+invoiceName : "Create New Invoice"}</h2>

            <Container
                fluid="xl"
            >
                <Row>
                    <Col md={1}>
                        <Dropdown isOpen={dropdownOpen} toggle={toggle} style={{marginTop: '6px'}}>
                            <DropdownToggle caret size="sm">
                                Actions
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem disabled>Delete</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={approvalFlowModalToggle}>
                                    Approval Flow
                                </DropdownItem>
                                <Modal isOpen={approvalFlowModal} toggle={approvalFlowModalToggle}>
                                    <ModalHeader toggle={approvalFlowModalToggle}>Approval Flow</ModalHeader>
                                    <ModalBody  className='text-center'>
                                        <div>
                                            <FontAwesomeIcon icon={faCheck} />&nbsp;NOT FILED
                                        </div><div>
                                            <FontAwesomeIcon icon={faArrowDownLong} />
                                        </div><div>
                                            <FontAwesomeIcon icon={faCircle} />&nbsp;PENDING APPROVAL
                                        </div><div>
                                            <FontAwesomeIcon icon={faArrowDownLong} />
                                        </div><div>
                                            <FontAwesomeIcon icon={faCircle} />&nbsp;APPROVED
                                        </div><div>
                                            <FontAwesomeIcon icon={faArrowDownLong} />
                                        </div><div>
                                            <FontAwesomeIcon icon={faCircle} />&nbsp;PAYMENT PROCESSING
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="secondary" onClick={approvalFlowModalToggle}>
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </Modal>
                                <DropdownItem onClick={auditTrailsModalToggle}>
                                    Audit Trails
                                </DropdownItem>
                                <Modal isOpen={auditTrailsModal} toggle={auditTrailsModalToggle}>
                                    <ModalHeader toggle={auditTrailsModalToggle}>Audit Trails</ModalHeader>
                                    <ModalBody>
                                        <Table hover className='text-center'>
                                            <thead>
                                                <th>Date Time</th>
                                                <th>Action</th>
                                                <th colspan='2'>Description</th>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{invoiceDate}</td>
                                                    <td>Invoice Line Item Details Added</td>
                                                    <td colspan='2'>Invoice Line Item Details Added</td>
                                                </tr>
                                                <tr>
                                                    <td>{invoiceDate}</td>
                                                    <td>Invoice Header Details Added</td>
                                                    <td colspan='2'>Invoice Header Details Added</td>
                                                </tr>
                                                <tr>
                                                    <td>{invoiceDate}</td>
                                                    <td>Invoice Meta Details Added</td>
                                                    <td colspan='2'>Invoice Meta Details Added</td>
                                                </tr>
                                                <tr>
                                                    <td>{invoiceDate}</td>
                                                    <td>Invoice Creation</td>
                                                    <td colspan='2'>Invoice created</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="secondary" onClick={auditTrailsModalToggle}>
                                            Close
                                        </Button>
                                    </ModalFooter>
                                </Modal>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                    <Col md={5}>
                        <h5 className='float-start' style={{marginTop: '10px'}}>
                            &nbsp;&nbsp;<b>Status</b>:&nbsp;{
                                invoiceStatus ? (
                                    Constants.invoiceStatusMap[invoiceStatus]
                                ) : (
                                    Constants.invoiceStatusMap["NOT_FILED"]
                                )
                            }</h5>
                    </Col>
                    <Col md={6} className="align-middle float-end">
                        {(
                            (invoiceStatus && invoiceStatus==="NOT_FILED") || (!invoiceStatus)
                        ) ? (
                            <div>
                                <button onClick={(e) => submitInvoice(e)} className='btn btn-success float-end'>Submit</button>
                                <span className='float-end'>&nbsp;</span>
                            </div>
                        ) : (
                            <div/>
                        )}
                        {(
                            invoiceStatus && invoiceStatus==="PENDING_APPROVAL"
                        ) ? (
                            <div>
                                <button onClick={(e) => approveInvoice(e)} className='btn btn-success float-end'>Approve</button>
                                <span className='float-end'>&nbsp;</span>
                            </div>
                        ) : (
                            <div/>
                        )}
                        {(
                            invoiceStatus && invoiceStatus==="PENDING_APPROVAL"
                        ) ? (
                            <div>
                                <button onClick={(e) => rejectInvoice(e)} className='btn btn-danger float-end'>Reject</button>
                                <span className='float-end'>&nbsp;</span>
                            </div>
                        ) : (
                            <div/>
                        )}
                        {(
                            invoiceStatus && invoiceStatus==="APPROVED"
                        ) ? (
                            <div>
                                <button onClick={(e) => processPayment(e)} className='btn btn-primary float-end'>Process Payment</button>
                                <span className='float-end'>&nbsp;</span>
                            </div>
                        ) : (
                            <div/>
                        )}
                        {(
                            invoiceStatus && invoiceStatus==="PAYMENT_PROCESSING"
                        ) ? (
                            <div>
                                <FontAwesomeIcon icon={faCircleCheck} />
                            </div>
                        ) : (
                            <div/>
                        )}
                    </Col>
                </Row>                                
            </Container>

            <br/>
            <Container
                fluid="xl"
            >
                <Form>
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="formVendorName">
                                    {convertCamelCaseToTitleCaseFunction(Constants.vendorName)}
                                </Label>
                                <Input
                                    id="formVendorName"
                                    name="vendorName"
                                    value={vendorName}
                                    onChange={(e) => setVendorName(e.target.value)}
                                    placeholder=""
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="formInvoiceOwner">
                                    {convertCamelCaseToTitleCaseFunction(Constants.invoiceOwner)}
                                </Label>
                                <Input
                                    id="formInvoiceOwner"
                                    name="invoiceOwner"
                                    value={invoiceOwner}
                                    onChange={(e) => setInvoiceOwner(e.target.value)}
                                    placeholder=""
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="formPolicyType">
                                    {convertCamelCaseToTitleCaseFunction(Constants.policyType)}
                                </Label>
                                <Input
                                    id="formPolicyType"
                                    name="policyType"
                                    value={policyType}
                                    onChange={(e) => setPolicyType(e.target.value)}
                                    placeholder=""
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </Container>

            <br/>
            <h2>Header Details</h2>
            <Container
                fluid="xl"
            >
                <Form>
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="formInvoiceName">
                                    {convertCamelCaseToTitleCaseFunction(Constants.invoiceName)}
                                </Label>
                                <Input
                                    id="formInvoiceName"
                                    name="invoiceName"
                                    value={invoiceName}
                                    onChange={(e) => setInvoiceName(e.target.value)}
                                    placeholder=""
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="formInvoiceNumber">
                                    {convertCamelCaseToTitleCaseFunction(Constants.invoiceNumber)}
                                </Label>
                                <Input
                                    id="formInvoiceNumber"
                                    name="invoiceNumber"
                                    value={invoiceNumber}
                                    onChange={(e) => setInvoiceNumber(e.target.value)}
                                    placeholder=""
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="formInvoiceDate">
                                    {convertCamelCaseToTitleCaseFunction(Constants.invoiceDate)}
                                </Label>
                                <Input
                                    id="formInvoiceDate"
                                    name="invoiceDate"
                                    value={invoiceDate}
                                    onChange={(e) => setInvoiceDate(e.target.value)}
                                    placeholder=""
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="formInvoiceAmount">
                                    {convertCamelCaseToTitleCaseFunction(Constants.invoiceAmount)}
                                </Label>
                                <Input
                                    id="formInvoiceAmount"
                                    name="invoiceAmount"
                                    value={invoiceAmount}
                                    onChange={(e) => setInvoiceAmount(e.target.value)}
                                    placeholder=""
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="formShippingAmount">
                                    {convertCamelCaseToTitleCaseFunction(Constants.shippingAmount)}
                                </Label>
                                <Input
                                    id="formShippingAmount"
                                    name="shippingAmount"
                                    value={shippingAmount}
                                    onChange={(e) => setShippingAmount(e.target.value)}
                                    placeholder=""
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="formTaxAmount">
                                    {convertCamelCaseToTitleCaseFunction(Constants.taxAmount)}
                                </Label>
                                <Input
                                    id="formTaxAmount"
                                    name="taxAmount"
                                    value={taxAmount}
                                    onChange={(e) => setTaxAmount(e.target.value)}
                                    placeholder=""
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </Container>
        
            <br/>
            <h2>Line Items</h2>
            <Container>
                <Table
                    bordered
                    hover
                    size=""
                    >
                    <thead>
                        <tr>
                            <th>
                                {convertCamelCaseToTitleCaseFunction(Constants.ExpenseType)}
                            </th>
                            <th>
                                {convertCamelCaseToTitleCaseFunction(Constants.LineDescription)}
                            </th>
                            <th>
                                {convertCamelCaseToTitleCaseFunction(Constants.Quantity)}
                            </th>
                            <th>
                                {convertCamelCaseToTitleCaseFunction(Constants.UnitPrice)}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Line Item 1 */}
                        <tr>
                            <td>
                                <Input
                                    id="formLi1ExpenseType"
                                    name="li1ExpenseType"
                                    value={li1ExpenseType}
                                    onChange={(e) => setLi1ExpenseType(e.target.value)}
                                    placeholder=""
                                />
                            </td>
                            <td>
                                <Input
                                    id="formLi1LineDescription"
                                    name="li1LineDescription"
                                    value={li1LineDescription}
                                    onChange={(e) => setLi1LineDescription(e.target.value)}
                                    placeholder=""
                                />
                            </td>
                            <td>
                                <Input
                                    id="formLi1Quantity"
                                    name="li1Quantity"
                                    value={li1Quantity}
                                    onChange={(e) => setLi1Quantity(e.target.value)}
                                    placeholder=""
                                />
                            </td>
                            <td>
                                <Input
                                    id="formLi1UnitPrice"
                                    name="li1UnitPrice"
                                    value={li1UnitPrice}
                                    onChange={(e) => setLi1UnitPrice(e.target.value)}
                                    placeholder=""
                                />
                            </td>
                        </tr>
                        {/* Line Item 2 */}
                        <tr>
                            <td>
                                <Input
                                    id="formLi2ExpenseType"
                                    name="li2ExpenseType"
                                    value={li2ExpenseType}
                                    onChange={(e) => setLi2ExpenseType(e.target.value)}
                                    placeholder=""
                                />
                            </td>
                            <td>
                                <Input
                                    id="formLi2LineDescription"
                                    name="li2LineDescription"
                                    value={li2LineDescription}
                                    onChange={(e) => setLi2LineDescription(e.target.value)}
                                    placeholder=""
                                />
                            </td>
                            <td>
                                <Input
                                    id="formLi2Quantity"
                                    name="li2Quantity"
                                    value={li2Quantity}
                                    onChange={(e) => setLi2Quantity(e.target.value)}
                                    placeholder=""
                                />
                            </td>
                            <td>
                                <Input
                                    id="formLi2UnitPrice"
                                    name="li2UnitPrice"
                                    value={li2UnitPrice}
                                    onChange={(e) => setLi2UnitPrice(e.target.value)}
                                    placeholder=""
                                />
                            </td>
                        </tr>
                        {/* Line Item 3 */}
                        <tr>
                            <td>
                                <Input
                                    id="formLi3ExpenseType"
                                    name="li3ExpenseType"
                                    value={li3ExpenseType}
                                    onChange={(e) => setLi3ExpenseType(e.target.value)}
                                    placeholder=""
                                />
                            </td>
                            <td>
                                <Input
                                    id="formLi3LineDescription"
                                    name="li3LineDescription"
                                    value={li3LineDescription}
                                    onChange={(e) => setLi3LineDescription(e.target.value)}
                                    placeholder=""
                                />
                            </td>
                            <td>
                                <Input
                                    id="formLi3Quantity"
                                    name="li3Quantity"
                                    value={li3Quantity}
                                    onChange={(e) => setLi3Quantity(e.target.value)}
                                    placeholder=""
                                />
                            </td>
                            <td>
                                <Input
                                    id="formLi3UnitPrice"
                                    name="li3UnitPrice"
                                    value={li3UnitPrice}
                                    onChange={(e) => setLi3UnitPrice(e.target.value)}
                                    placeholder=""
                                />
                            </td>
                        </tr>
                        {/* Line Item 4 */}
                        <tr>
                            <td>
                                <Input
                                    id="formLi4ExpenseType"
                                    name="li4ExpenseType"
                                    value={li4ExpenseType}
                                    onChange={(e) => setLi4ExpenseType(e.target.value)}
                                    placeholder=""
                                />
                            </td>
                            <td>
                                <Input
                                    id="formLi4LineDescription"
                                    name="li4LineDescription"
                                    value={li4LineDescription}
                                    onChange={(e) => setLi4LineDescription(e.target.value)}
                                    placeholder=""
                                />
                            </td>
                            <td>
                                <Input
                                    id="formLi4Quantity"
                                    name="li4Quantity"
                                    value={li4Quantity}
                                    onChange={(e) => setLi4Quantity(e.target.value)}
                                    placeholder=""
                                />
                            </td>
                            <td>
                                <Input
                                    id="formLi4UnitPrice"
                                    name="li4UnitPrice"
                                    value={li4UnitPrice}
                                    onChange={(e) => setLi4UnitPrice(e.target.value)}
                                    placeholder=""
                                />
                            </td>
                        </tr>
                        {/* Line Item 5 */}
                        <tr>
                            <td>
                                <Input
                                    id="formLi5ExpenseType"
                                    name="li5ExpenseType"
                                    value={li5ExpenseType}
                                    onChange={(e) => setLi5ExpenseType(e.target.value)}
                                    placeholder=""
                                />
                            </td>
                            <td>
                                <Input
                                    id="formLi5LineDescription"
                                    name="li5LineDescription"
                                    value={li5LineDescription}
                                    onChange={(e) => setLi5LineDescription(e.target.value)}
                                    placeholder=""
                                />
                            </td>
                            <td>
                                <Input
                                    id="formLi5Quantity"
                                    name="li5Quantity"
                                    value={li5Quantity}
                                    onChange={(e) => setLi5Quantity(e.target.value)}
                                    placeholder=""
                                />
                            </td>
                            <td>
                                <Input
                                    id="formLi5UnitPrice"
                                    name="li5UnitPrice"
                                    value={li5UnitPrice}
                                    onChange={(e) => setLi5UnitPrice(e.target.value)}
                                    placeholder=""
                                />
                            </td>
                        </tr>
                    </tbody>
                    </Table> 

            </Container>
            

            {/* <div className='container mt-5'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3'>
                        <h2 className='text-center'>{tile()}</h2>
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <input className='form-control'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        type="text" placeholder='Enter First Name' />
                                </div>
                                <div className='form-group mb-2'>
                                    <input className='form-control'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        type="text" placeholder='Enter Last Name' />
                                </div>
                                <div className='form-group mb-2'>
                                    <input className='form-control'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email" placeholder='Enter Email' />
                                </div>
                                <button onClick={(e) => saveInvoice(e)} className='btn btn-success'>Save</button> {" "}
                                <Link to={"/Invoice"} className='btn btn-danger' href="">Cancel</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default AddInvoiceComponent
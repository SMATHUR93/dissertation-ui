import React, {useState, useEffect} from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Table,
    Container, Row, Col,
    Form, FormGroup, Label, Input,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Badge
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import HelpWindow from './HelpWindow';
import DocumentationList from './DocumentationList';
import InvoiceService from '../../service/InvoiceService';

const ChatWindow = ({isEditmode, invoice, approvalFlowModal, approvalFlowModalToggle, auditTrailsModal, auditTrailsModalToggle, invoiceDate}) => {
	const [userInputMessage, setUserInputMessage] = useState('');
	const [messageList, setMessageList] = useState([
		{isUser: false, message: 'Hi Concur User, Please type your queries here.'}
	]);
	const [messageListFooter, setMessageListFooter] = useState(null);
	const [showHelpOptions, setShowHelpOptions] = useState(false);
	const [isTyping, setIsTyping] = useState(false);

	const [showDocumentationList, setShowDocumentationList] = useState(false);
	const [createTicket, setCreateTicket] = useState(false);

	const setChatbotResponse = (res) => {
		const chatbotResponse = {
			isUser: false,
			message: null
		};
		if (res?.choices) {
			chatbotResponse.message = res.choices[0].text;
		} else if(res){
			chatbotResponse.message = res;
		} else {
			chatbotResponse.message =
				'please try again / Can you clarify that again for me?';
		}
		setMessageList([...messageList, chatbotResponse]);
		setIsTyping(false);
	};

	const submitUserMessage = (event) => {
		event.preventDefault();
		if (userInputMessage) {
			let processedUserInput = preProcessUserMessage(userInputMessage);
			console.log("BEGIN :: PRE PROCESSED USER INPUT");
			console.log(processedUserInput);
			console.log("FINISH :: PRE PROCESSED USER INPUT");
			const userMessage = {
				isUser: true,
				message: userInputMessage
			};
			messageList.push(userMessage);
			setMessageList(messageList);
			setUserInputMessage('');
			setIsTyping(true);
			const payloadData = {
				prompt: `${processedUserInput}`,
				temperature: 0.5,
				n: 1,
				model: 'text-davinci-003',
				max_tokens: 200,
				top_p: 1,
				stream: false,
				logprobs: null
			};
			if (createTicket) {
				createSupportTicket(userInputMessage);
				setCreateTicket(false);
			} else {
				getResponse(payloadData, userInputMessage);
			}
		}
	};
	
	const preProcessUserMessage = (userInputMessage) => {
		let processedUserInput;
		let originalUserInputMessage = userInputMessage;
		const pattern =
	  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/g;
		if(!(originalUserInputMessage.includes("how") || originalUserInputMessage.includes("what") || originalUserInputMessage.includes("why") || originalUserInputMessage.includes("when") || originalUserInputMessage.includes("where"))){
			if(originalUserInputMessage.includes("get") || originalUserInputMessage.includes("fetch") || originalUserInputMessage.includes("delete") || originalUserInputMessage.includes("update")){
				if(originalUserInputMessage.match(pattern)){
					originalUserInputMessage.replaceAll(pattern, 'DUMMY_UUID')
					processedUserInput="Hi Chatgpt\nGive me the HTTP request for this expression:\""+originalUserInputMessage+"\"\nGive response in this format:\n Method: <METHOD_NAME>\n || URL: <SERVICE_URL>\n || Body: <REQUEST_BODY>"
				} else{
					processedUserInput="Hi Chatgpt\nGive me the HTTP request for this expression:\""+originalUserInputMessage+"\"\nGive response in this format:\n Method: <METHOD_NAME>\n || URL: <SERVICE_URL>\n || Body: <REQUEST_BODY>"
				}
			} else{
				processedUserInput = originalUserInputMessage+" in SAP Concur";
			}
		} else{
			processedUserInput = originalUserInputMessage+" in SAP Concur";
		}
		return processedUserInput;
	};
	
	const getResponse = (body, userInputMessage) => {
		fetch('https://api.openai.com/v1/completions', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization:
					'Bearer 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'
			},
			body: JSON.stringify(body)
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				// Handle data
				let processsedData=data;
				processsedData = postProcessUserMessage(data, userInputMessage);
				setChatbotResponse(processsedData);
			})
			.catch((err) => {
				setIsTyping(false);
				console.log(err.message);
			});
	};
	
	const postProcessUserMessage = (data, userInputMessage) => {
		let responseData = data?.choices[0]?.text.trim();
		let triggerAction = false;
		let requestMethod, requestURL, requestBody;
		const pattern =
		  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/g;
		let requestUUID = userInputMessage.match(pattern);
		if(responseData.includes("Method") || responseData.includes("URL")){
			let requestDetailsItemsArray = responseData.includes("||") ? responseData.split("||") : responseData.split('\n');
			let i;
			let token;
			for(i=0;i<requestDetailsItemsArray.length;i++){
				token = requestDetailsItemsArray[i];
				if(token.includes("Method")){
					requestMethod = token.split(":")[1].trim();
				}
				if(token.includes("URL")){
					let i = token.indexOf(':');
					let splits = [token.slice(0,i), token.slice(i+1)];
					requestURL = splits[1].trim();
				}
				if(token.includes("Body")){
					requestBody = token.split(":")[1].trim() && token.split(":")[1].trim()!=='null' ? token.split(":")[1].trim() : null;
				}
			}
			triggerAction=true;
		}
		switch (requestMethod) {
			case 'GET':
					if(requestUUID){
						console.log("Fetch single invoice");
					}
					if(requestURL && ( requestURL.indexOf("approval")!=-1 || requestURL.indexOf("flow")!=-1) ){
						console.log("Fetch approval flow");
						approvalFlowModalToggle();
					}					
					if(requestURL && requestURL.indexOf("audit")!=-1){
						console.log("Fetch audit trails");
						auditTrailsModalToggle();
					}
				break;
			case 'DELETE':
					if(requestUUID){
						console.log("delete single invoice");
					}
				break;
			default:
			  console.log("something didn't worked out");
		}
		let outputData = data;
		if(triggerAction===true){
			outputData="Requested Action Completed."
		}
		return outputData;
	};

	useEffect(() => {
		if (messageListFooter) {
			messageListFooter.scrollIntoView({
				behavior: 'smooth',
				block: 'end',
				inline: 'nearest'
			});
		}
	}, [messageList]);

	const toggleHelp = () => {
		if (showHelpOptions) {
			setShowHelpOptions(false);
		} else {
			setShowHelpOptions(true);
		}
	};

	const toggleBack = () => {
		if (showDocumentationList) {
			setShowDocumentationList(false);
		}
	};

	const handleCallback = (childData) => {
		if (childData === 'createTicket') {
			toggleHelp();
			setCreateTicket(true);
			const chatbotResponse = {
				isUser: false,
				message: 'Please provide the description to raise the ticket'
			};
			setMessageList([chatbotResponse]);
		}
	};

	/* const createSupportTicket = (desc) => {
		const body = {
			fields: {
				project: {
					id: '10000'
				},
				issuetype: {
					id: '10001'
				},
				summary: 'Concur CRMC Support Ticket by Chatbot',
				description: {
					version: 1,
					type: 'doc',
					content: [
						{
							type: 'paragraph',
							content: [
								{
									type: 'text',
									text: desc
								}
							]
						}
					]
				},
				labels: ['demo-desk'],
				customfield_10021: []
			},
			update: {}
		};
		callJiraEndpoint(body);
	};

	const callJiraEndpoint = (body) => {
		createNewJira(body)
		.then((response) => {
			if (response) {
				const message = `Ticket create with id: ${response?.key} You may track the status here `;
				const chatbotResponse = {
					isUser: false,
					message: message,
					url: `https://2021mt93645.atlassian.net/browse/${response?.key}`
				};
				setMessageList([...messageList, chatbotResponse]);
				setIsTyping(false);
			}
		}).catch((err) => {
			console.log(err);
		});
	};

	async function createNewJira(body) {
		try {
			const token = btoa(
				'2021MT93645@wilp.bits-pilani.ac.in : ATATT3xFfGF0i2HW77APxCczxave-ZnitiuiyGzT-rk3OJOQzyB036Upe6jqRsAh7ZN_SvtuPuOADftJbH7MusAiNVdDFi3V9bBpJWy3cpeb4f6AtVrN-0Ww2nKLLkeC2GdFyX8RGokutVWBuyStVzKnkSzZXulcfS-IVLK6wXyC2rbk08c3qOA=B14AAE35'
			);
			const headers = {
				'Content-type': 'application/json',
				Accept: 'application/json',
				'Access-Control-Allow-Origin': '*',
				Authorization: `Basic ${token}`
			};
			const response = await fetch('https://2021mt93645.atlassian.net/rest/api/3/issue', {
				method: 'POST',
				body: JSON.stringify(body),
				headers: headers
			});
			const responseJson = await response.json();
			return responseJson;
		} catch (err) {
			console.log(err.message);
		}
	} */

	const createSupportTicket = (desc) => {
		const body = {
			fields: {
				project: {
					id: '10000'
				},
				issuetype: {
					id: '10001'
				},
				summary: 'Concur CRMC Support Ticket by Chatbot',
				description: {
					version: 1,
					type: 'doc',
					content: [
						{
							type: 'paragraph',
							content: [
								{
									type: 'text',
									text: desc
								}
							]
						}
					]
				},
				labels: ['demo-desk'],
				customfield_10021: []
			},
			update: {}
		};
		const apiToken = 'ATATT3xFfGF0FwCzMYomnp4xQOskGEAE6VUP0Ik0SUrXSfF9EtrT-f4os9qx6xJmoNO68IGgkmVh9Gjhd4E9Aeo3QREmbnJt4bZ3LVce-mrs9NCWWz9hlws4LFvytpc9G0mB0-PlEJBTabD8jYa_bxrG1fOcWrfuDMEGz8cQ2hzD5dMyANbNbUM=FBE1C832';
		const projectKey = 'KAN';
		const summary = 'Concur CRMC Support Ticket by Chatbot '+ new Date().toDateString();
		const description = desc;

		InvoiceService.createJiraTicket(apiToken, projectKey, summary, description)
			.then((response) => {
				if (response) {
					const message = `Ticket create with id: ${response?.key} You may track the status here `;
					const chatbotResponse = {
						isUser: false,
						message: message,
						url: `https://2021mt93645.atlassian.net/browse/${response?.key}`
					};
					setMessageList([...messageList, chatbotResponse]);
					setIsTyping(false);
				}
			}).catch((err) => {
				console.log(err);
			});
	};


	return (
		<>
			<div className="chatbotWindow">
				<div className="chatbot-container">
					<div className="chatbot-header">
						<FontAwesomeIcon 
							icon={faChevronLeft} 
							size="md" style={{float: 'inline-start', marginTop: "12px"}} 
							onClick={toggleBack}
							hidden={!showDocumentationList}
						/>
						Concur Chatbot
						<FontAwesomeIcon 
							icon={showHelpOptions ? faXmark : faBars} 
							size="md" style={{float: 'inline-start', marginTop: "12px"}} 
							onClick={toggleHelp}
							hidden={showDocumentationList}
						/>
					</div>
					{showHelpOptions ? (
						showDocumentationList === true ? (
							isEditmode ? (
								<DocumentationList /> // edit mode flow for documentation list
							) : (
								<DocumentationList /> // create mode flow for documentation list
							)
						) : (
							<HelpWindow
								parentCallback={handleCallback}
								isEditmode={isEditmode}
								setShowDocumentationList={setShowDocumentationList}
							/>
						)
					) : (
						<>
							<div className="chatbot-messages-container">
								{messageList.map((value) => {
									return (
										<div className="chatbot-message-container" key="value.id">
											<div
												className={
													value.isUser ? 'user-message' : 'chatbot-message'
												}
											>
												<span>
													{value.message}
													<a
														target="_blank"
														rel="noreferrer"
														className="chatbot-ticket-link"
														href={value?.url}
													>
														{value?.url}
													</a>
												</span>
											</div>
										</div>
									);
								})}
								{isTyping && (
									<div className="chatbot-message-container">
										<div className="chatbot-message">
											<div className="loader">
												<span />
												<span />
												<span />
											</div>
										</div>
									</div>
								)}
								<div
									style={{float: 'left', clear: 'both'}}
									ref={(el) => {
										setMessageListFooter(el);
									}}
								/>
							</div>
							<div className="chatbot-input-container">
								<form
									className="chatbot-input-form"
									onSubmit={submitUserMessage}
								>
									<input
										className="chatbot-input"
										placeholder="Enter your message here"
										value={userInputMessage}
										onChange={(event) =>
											setUserInputMessage(event?.target?.value)
										}
									/>
									<div
										className="chatbot-input-submit"
										role="button"
										tabIndex={0}
										onClick={submitUserMessage}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="100%"
											viewBox="0 0 20 18"
										>
											<g fill="none" fillRule="evenodd">
												<path
													fill="#B8B8B8"
													d="M.843 17.25L20.082 9 .843.75l-.01 6.417L14.583 9 .833 10.833z"
												/>
												<path d="M-1-2h22v22H-1z" />
											</g>
										</svg>
									</div>
								</form>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default ChatWindow;


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faXmark } from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import ChatWindow from './ChatWindow';

const ChatWindowToggler = ({isEditmode, invoice, approvalFlowModal, approvalFlowModalToggle, auditTrailsModal, auditTrailsModalToggle, invoiceDate}) => {
	const [showChatWindow, setShowChatWindow] = useState(false);
	const toggleChatWindow = () => {
		if (showChatWindow) {
			setShowChatWindow(false);
		} else {
			setShowChatWindow(true);
		}
	};

	return (
		<>
			{showChatWindow && (
				<ChatWindow
					isEditmode={isEditmode}
					invoice={invoice}
					approvalFlowModal = {approvalFlowModal}
					approvalFlowModalToggle = {approvalFlowModalToggle}
					auditTrailsModal = {auditTrailsModal}
					auditTrailsModalToggle = {auditTrailsModalToggle}
					invoiceDate = {invoiceDate}
				/>
			)}
            <div>
                <FontAwesomeIcon 
                    icon={showChatWindow ? faXmark : faComments }
                    onClick={toggleChatWindow}
                    ariaLabel="Toggle Chat box"
                    size="lg"
					className="chatbot-toggler"
                />
            </div>
		</>
	);
};

export default ChatWindowToggler;

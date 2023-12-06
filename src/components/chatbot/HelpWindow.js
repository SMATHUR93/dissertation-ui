import {
    ListGroup, ListGroupItem
} from 'reactstrap';
import React, {useEffect, useState} from 'react';
import PopupWindow from './PopupWindow';

const HelpWindow = (props) => {
	const [actionList, setActionList] = useState([]);
	const {isEditmode, setShowDocumentationList} = props;
	const createHelpOptions = [
		{
			id: 0,
			key: "Start Invoice Create Walkthrough"
		},
		{
			id: 1,
			key: "Create Support Ticket"
		},
		{
			id: 2,
			key: "Check product documentation"
		}
	];

	const createWalkthroughInfo = [
		{
			id: 0,
			xPath:
				'//*[@id="cnqr-app-content"]/div/div[5]/div[1]/div/div[1]/div/div/span',
			description: 'Select a supplier from the list of vendors'
		},
		{
			id: 1,
			xPath:
				'//*[@id="cnqr-app-content"]/div/div[5]/div[1]/div/div[2]/div/div/span',
			description:
				'Select an Invoice Owner to which this invoice is to be assigned'
		},
		{
			id: 2,
			xPath: '//*[@id="combobox-policyDropdown"]/div/span',
			description: 'Select a Policy from the Dropdown'
		}
	];

	useEffect(() => {
		if (isEditmode) {
			// @TODO: modify below list based on the page the user is in.
			setActionList(createHelpOptions);
		} else {
			setActionList(createHelpOptions);
		}
	}, []);

	const getElementByXpath = (path) => {
		return document.evaluate(
			path,
			document,
			null,
			XPathResult.FIRST_ORDERED_NODE_TYPE,
			null
		).singleNodeValue;
	};

	const showWalkThroughPopup = (id) => {
		const element = getElementByXpath(createWalkthroughInfo[id]?.xPath);

		const popup = document.getElementById('popup');
		element.appendChild(popup);
		// popup.style.left = element.parentElement.style.left - 200 + "px";
		// popup.style.top = element.parentElement.style.top + "px";
		popup.classList.add('show');
	};

	const performMenuAction = (event) => {
		if (
			"Start Invoice Create Walkthrough" ===
			event.target.innerText
		) {
			showWalkThroughPopup(0);
		} else if (
			"Create Support Ticket" ===
			event.target.innerText
		) {
			props.parentCallback('createTicket');
		} else if (
			"Check product documentation" ===
			event.target.innerText
		) {
			setShowDocumentationList(true);
		}
	};

	return (
		<>
			<div className="helpWindowOptions">
				<ListGroup>
					{actionList.map((item) => (
						<ListGroupItem
							key={item.key}
							eventKey={item.key}
							onClick={performMenuAction}
						>
							{item.key}
						</ListGroupItem>
					))}
				</ListGroup>
				{/* <PopupWindow
					showWalkThroughPopup={showWalkThroughPopup}
					createWalkthroughInfo={createWalkthroughInfo}
					id={0}
				/> */}
			</div>
		</>
	);
};

export default HelpWindow;

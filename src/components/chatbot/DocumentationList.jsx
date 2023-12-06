import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    ListGroup, ListGroupItem
} from 'reactstrap';
import React, {useEffect, useState} from 'react';

const DocumentationList = (props) => {
	const [actionList, setActionList] = useState([]);
	const createHelpOptions = [
		{
			id: 0,
			key: "Audit Rules Documentation",
			link: 'https://www.concurtraining.com/customers/tech_pubs/Docs/_Current/SG_Inv/Inv_SG_Audit_Rules.pdf'
		},
		{
			id: 1,
			key: "Forms & Fields Documentation",
			link: 'https://www.concurtraining.com/customers/tech_pubs/Docs/_Current/SG_Inv/Inv_SG_Forms_Fields.pdf'
		},
		{
			id: 2,
			key: "Invoice Document",
			link: 'https://www.concurtraining.com/customers/tech_pubs/Docs/_Current/UG_Inv/Inv_UG_AP_Payment.pdf'
		},
		{
			id: 3,
			key: "All Concur Documentation",
			link: 'https://www.concurtraining.com/customers/tech_pubs/_Docs_InvHelp.htm#ug'
		}
	];

	useEffect(() => {
		setActionList(createHelpOptions);
	}, []);

	const performMenuAction = (event) => {
		let url;
		createHelpOptions.forEach((element) => {
			if (element.key === event.target.innerText) {
				url = element.link;
			}
		});
		window.open(url, '_blank').focus();
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
			</div>
		</>
	);
};

export default DocumentationList;

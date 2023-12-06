import React, {useState} from 'react';

const PopupWindow = ({showWalkThroughPopup, createWalkthroughInfo, id}) => {
	const [currentIndex, setCurrentIndex] = useState(id);

	const hidePopup = () => {
		const popup = document.getElementById('popup');
		popup.classList.remove('show');
	};

	const onNextOrPreviousStepClick = (isNext) => {
		hidePopup();
		if (isNext && createWalkthroughInfo.length > currentIndex + 1) {
			setCurrentIndex(currentIndex + 1);
			showWalkThroughPopup(currentIndex + 1);
		} else if (!isNext && currentIndex - 1 >= 0) {
			setCurrentIndex(currentIndex - 1);
			showWalkThroughPopup(currentIndex - 1);
		}
	};

	return (
		<>
			<div id="popup" className="popup">
				<div id="popup-container">
					<div>
						<button type="button" className="close" onClick={hidePopup}>
							X
						</button>
					</div>

					<div className="content">
						{createWalkthroughInfo[currentIndex]?.description}
					</div>
					<div id="walkthrough-nav" style={{display: 'flex'}}>
						<button
							type="button"
							className="prev"
							onClick={() => onNextOrPreviousStepClick(false)}
						>
							&lt;
						</button>
						<button
							type="button"
							className="next"
							onClick={() => onNextOrPreviousStepClick(true)}
						>
							&gt;
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default PopupWindow;

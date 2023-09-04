import React, { useState } from 'react';
import { SelectedProperty, PropertyDetails } from './types';
import './styles/PropertyBlock.scss';

interface PropertyBlockProps {
	fileName: string;
	propertyName: string;
	propertyDetails: PropertyDetails;
	onSelect: (selectedProperty: SelectedProperty) => void;
	onDeselect: (fileName: string, propertyName: string) => void;
}

const PropertyBlock: React.FC<PropertyBlockProps> = ({
	fileName,
	propertyName,
	propertyDetails,
	onSelect,
	onDeselect,
}) => {
	const [isSelected, setIsSelected] = useState<boolean>(false);

	const handleToggle = () => {
		if (isSelected) {
			onDeselect(fileName, propertyName);
		} else {
			onSelect({ fileName, propertyName, propertyDetails });
		}
		setIsSelected(!isSelected);
	};

	return (
		<div
			onClick={handleToggle}
			className={`property-block ${isSelected ? 'selected' : ''}`}
		>
			<h3>{propertyName}</h3>
			{propertyDetails.question && <p>{propertyDetails.question}</p>}
		</div>
	);
};

export default PropertyBlock;

import React, { useState } from 'react';
import { PropertyDetails, Statement } from './types';
import './styles/PropertyBlock.scss';

interface PropertyBlockProps {
	propertyName: string;
	propertyData: PropertyDetails;
	onSelect: (propertyName: string, statements: Statement[]) => void;
	onDeselect: (propertyName: string) => void;
}

const PropertyBlock: React.FC<PropertyBlockProps> = ({
	propertyName,
	propertyData,
	onSelect,
	onDeselect,
}) => {
	const [isSelected, setIsSelected] = useState<boolean>(false);

	const handleToggle = () => {
		if (isSelected) {
			onDeselect(propertyName);
		} else {
			onSelect(propertyName, propertyData.statements);
		}
		setIsSelected(!isSelected);
	};

	return (
		<div
			onClick={handleToggle}
			className={`property-block ${isSelected ? 'selected' : ''}`}
		>
			<h3>{propertyName}</h3>
			{propertyData.question && <p>{propertyData.question}</p>}
		</div>
	);
};

export default PropertyBlock;

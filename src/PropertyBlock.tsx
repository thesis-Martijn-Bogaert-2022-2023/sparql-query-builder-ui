import React, { useState } from 'react';
import { PropertyData } from './types';
import './styles/PropertyBlock.scss';

interface PropertyBlockProps {
	propertyName: string;
	propertyData: PropertyData;
}

const PropertyBlock: React.FC<PropertyBlockProps> = ({
	propertyName,
	propertyData,
}) => {
	const [isSelected, setIsSelected] = useState<boolean>(false);

	const toggleSelection = () => {
		setIsSelected(!isSelected);
	};

	return (
		<div
			onClick={toggleSelection}
			className={`property-block ${isSelected ? 'selected' : ''}`}
		>
			<h3>{propertyName}</h3>
			{propertyData.question && <p>{propertyData.question}</p>}
		</div>
	);
};

export default PropertyBlock;

import React, { useState } from 'react';
import { PropertyData, Statement } from './types';
import './styles/PropertyBlock.scss';

interface PropertyBlockProps {
	propertyName: string;
	propertyData: PropertyData;
	onAdd: (propertyName: string, statements: Statement[]) => void;
	onRemove: (propertyName: string) => void;
}

const PropertyBlock: React.FC<PropertyBlockProps> = ({
	propertyName,
	propertyData,
	onAdd,
	onRemove,
}) => {
	const [isSelected, setIsSelected] = useState<boolean>(false);

	const handleToggle = () => {
		if (isSelected) {
			onRemove(propertyName);
		} else {
			onAdd(propertyName, propertyData.statements);
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

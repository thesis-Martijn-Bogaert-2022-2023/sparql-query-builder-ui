import React, { useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { SelectedProperty, PropertyDetails } from './types';
import { languages } from './language-names-codes';
import './styles/PropertyBlock.scss';

interface PropertyBlockProps {
	fileName: string;
	propertyName: string;
	propertyDetails: PropertyDetails;
	onSelect: (selectedProperty: SelectedProperty) => void;
	onDeselect: (fileName: string, propertyName: string) => void;
	onUpdate: (updatedProperty: SelectedProperty) => void;
}

const PropertyBlock: React.FC<PropertyBlockProps> = ({
	fileName,
	propertyName,
	propertyDetails,
	onSelect,
	onDeselect,
	onUpdate,
}) => {
	const [isSelected, setIsSelected] = useState<boolean>(false);
	const [stringFilter, setStringFilter] = useState<string>('');
	const [languageFilter, setLanguageFilter] = useState<string>('');
	const [isOptional, setIsOptional] = useState<boolean>(false);

	useEffect(() => {
		if (isSelected) {
			const updatedPropertyDetails: PropertyDetails = {
				...propertyDetails,
				filters: {
					string: stringFilter,
					language: languageFilter,
				},
				optional: isOptional,
			};
			onUpdate({
				fileName,
				propertyName,
				propertyDetails: updatedPropertyDetails,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stringFilter, languageFilter, isOptional]);

	const handleToggle = () => {
		if (isSelected) {
			onDeselect(fileName, propertyName);
		} else {
			const updatedPropertyDetails: PropertyDetails = {
				...propertyDetails,
				filters: {
					string: stringFilter,
					language: languageFilter,
				},
				optional: isOptional,
			};
			onSelect({
				fileName,
				propertyName,
				propertyDetails: updatedPropertyDetails,
			});
		}
		setIsSelected(!isSelected);
	};

	return (
		<div className={`property-block ${isSelected ? 'selected' : ''}`}>
			<div onClick={handleToggle}>
				<h3>{propertyName}</h3>
				{propertyDetails.question && <p>{propertyDetails.question}</p>}
			</div>
			<div className="filters">
				<DebounceInput
					minLength={1}
					debounceTimeout={300}
					type="text"
					placeholder="Enter filter value"
					value={stringFilter}
					onChange={(e) => setStringFilter(e.target.value)}
				/>
				<select
					value={languageFilter}
					onChange={(e) => setLanguageFilter(e.target.value)}
				>
					<option value="">Select language</option>
					{Object.entries(languages).map(([name, code]) => (
						<option key={code} value={code}>
							{name}
						</option>
					))}
				</select>

				<div>
					<input
						type="checkbox"
						checked={isOptional}
						onChange={() => setIsOptional(!isOptional)}
					/>
					Optional
				</div>
			</div>
		</div>
	);
};

export default PropertyBlock;

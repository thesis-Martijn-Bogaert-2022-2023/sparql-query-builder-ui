import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import PropertyBlock from './PropertyBlock';
import { JSONModule, Properties, Statement } from './types';
import plusIcon from './assets/plus.svg';
import minusIcon from './assets/minus.svg';
import './styles/Module.scss';

interface ModuleProps {
	filePath: string;
	importFn: () => Promise<{ default: JSONModule }>;
	onPropertySelect: (propertyData: Properties) => void;
	onPropertyDeselect: (propertyName: string) => void;
}

const Module: React.FC<ModuleProps> = ({
	filePath,
	importFn,
	onPropertySelect,
	onPropertyDeselect,
}) => {
	const [properties, setProperties] = useState<Properties | null>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const fileName = filePath.split('/').pop()?.split('.')[0] || '';

	const handleFileClick = async () => {
		if (!properties) {
			const module = await importFn();
			setProperties(module.default.properties);
		}
		setIsOpen(!isOpen);
	};

	const handlePropertySelect = (
		propertyName: string,
		statements: Statement[]
	) => {
		const selectedProperty: Properties = { [propertyName]: { statements } };
		onPropertySelect(selectedProperty);
	};

	const handlePropertyDeselect = (propertyName: string) => {
		onPropertyDeselect(propertyName);
	};

	return (
		<>
			<div className="module-header" onClick={handleFileClick}>
				<span className="module-name">{fileName}</span>
				<img
					src={isOpen ? minusIcon : plusIcon}
					alt={isOpen ? 'Collapse' : 'Expand'}
				/>
			</div>
			<Collapse isOpened={isOpen}>
				<div className="property-blocks-container">
					{properties &&
						Object.entries(properties).map(([propertyName, propertyData]) => (
							<PropertyBlock
								key={propertyName}
								propertyName={propertyName}
								propertyData={propertyData}
								onSelect={handlePropertySelect}
								onDeselect={handlePropertyDeselect}
							/>
						))}
				</div>
			</Collapse>
		</>
	);
};

export default Module;

import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import PropertyBlock from './PropertyBlock';
import { Properties } from './types';
import plusIcon from './assets/plus.svg';
import minusIcon from './assets/minus.svg';
import './styles/Module.scss';

interface ModuleProps {
	filePath: string;
	importFn: () => Promise<{ default: Properties }>;
}

const Module: React.FC<ModuleProps> = ({ filePath, importFn }) => {
	const [properties, setProperties] = useState<Properties | null>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleFileClick = async () => {
		if (!properties) {
			const module = await importFn();
			setProperties(module.default);
		}
		setIsOpen(!isOpen);
	};

	const fileName = filePath.split('/').pop();

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
							/>
						))}
				</div>
			</Collapse>
		</>
	);
};

export default Module;

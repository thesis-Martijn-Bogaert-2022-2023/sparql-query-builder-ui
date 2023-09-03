import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import PropertyBlock from './PropertyBlock';
import { Properties } from './types';

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
		<div>
			<button onClick={handleFileClick}>{fileName}</button>
			<Collapse isOpened={isOpen}>
				{properties &&
					Object.entries(properties).map(([propertyName, propertyData]) => (
						<PropertyBlock
							key={propertyName}
							propertyName={propertyName}
							propertyData={propertyData}
						/>
					))}
			</Collapse>
		</div>
	);
};

export default Module;

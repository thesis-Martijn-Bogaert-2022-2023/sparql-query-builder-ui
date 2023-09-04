import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import PropertyBlock from './PropertyBlock';
import { Properties, Statement } from './types';
import plusIcon from './assets/plus.svg';
import minusIcon from './assets/minus.svg';
import './styles/Module.scss';

interface ModuleProps {
	filePath: string;
	importFn: () => Promise<{ default: Properties }>;
	onPropertyAdd: (
		id: string,
		propertyName: string,
		statements: Statement[]
	) => void;
	onPropertyRemove: (id: string) => void;
}

const Module: React.FC<ModuleProps> = ({
	filePath,
	importFn,
	onPropertyAdd,
	onPropertyRemove,
}) => {
	const [properties, setProperties] = useState<Properties | null>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const fileName = filePath.split('/').pop()?.split('.')[0] || '';

	const handleFileClick = async () => {
		if (!properties) {
			const module = await importFn();
			setProperties(module.default);
		}
		setIsOpen(!isOpen);
	};

	const handlePropertyAdd = (propertyName: string, statements: Statement[]) => {
		const id = `${fileName}-${propertyName}`;
		onPropertyAdd(id, propertyName, statements);
	};

	const handlePropertyRemove = (propertyName: string) => {
		const id = `${fileName}-${propertyName}`;
		onPropertyRemove(id);
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
								onAdd={handlePropertyAdd}
								onRemove={handlePropertyRemove}
							/>
						))}
				</div>
			</Collapse>
		</>
	);
};

export default Module;

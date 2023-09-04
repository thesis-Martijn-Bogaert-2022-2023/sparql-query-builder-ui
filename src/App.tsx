import React, { useState } from 'react';
import Module from './Module';
import CodeDisplay from './CodeDisplay';
import { JSONModule, Prefixes, SelectedProperty } from './types';
import './styles/App.scss';

const App: React.FC = () => {
	const modules = import.meta.glob('./config/*.json');
	const [selectedProperties, setSelectedProperties] = useState<
		SelectedProperty[]
	>([]);
	const [prefixes, setPrefixes] = useState<Prefixes>({});

	const handlePrefixesLoaded = (modulePrefixes: Prefixes) => {
		setPrefixes((prev) => ({ ...prev, ...modulePrefixes }));
	};

	const handlePropertySelect = (selectedProperty: SelectedProperty) => {
		setSelectedProperties((prev) => [...prev, selectedProperty]);
	};

	const handlePropertyDeselect = (fileName: string, propertyName: string) => {
		setSelectedProperties((prev) =>
			prev.filter(
				(prop) =>
					!(prop.propertyName === propertyName && prop.fileName === fileName)
			)
		);
	};

	const handlePropertyUpdate = (updatedProperty: SelectedProperty) => {
		setSelectedProperties((prev) =>
			prev.map((property) =>
				property.fileName === updatedProperty.fileName &&
				property.propertyName === updatedProperty.propertyName
					? { ...property, propertyDetails: updatedProperty.propertyDetails }
					: property
			)
		);
	};

	return (
		<>
			<h1>SPARQL Query Builder</h1>
			<div className="container">
				<div>
					<h2>Select Properties</h2>
					{Object.entries(modules).map(([filePath, importFn]) => (
						<Module
							key={filePath}
							filePath={filePath}
							importFn={importFn as () => Promise<{ default: JSONModule }>}
							onPrefixesLoaded={handlePrefixesLoaded}
							onPropertySelect={handlePropertySelect}
							onPropertyDeselect={handlePropertyDeselect}
							onPropertyUpdate={handlePropertyUpdate}
						/>
					))}
				</div>
				<div>
					<h2>Query</h2>
					<CodeDisplay
						selectedProperties={selectedProperties}
						prefixes={prefixes}
					/>
				</div>
			</div>
		</>
	);
};

export default App;

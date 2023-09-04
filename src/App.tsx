import React, { useState } from 'react';
import Module from './Module';
import CodeDisplay from './CodeDisplay';
import { JSONModule, Properties, Prefixes } from './types';
import './styles/App.scss';

const App: React.FC = () => {
	const modules = import.meta.glob('./config/*.json');
	const [selectedProperties, setSelectedProperties] = useState<Properties>({});
	const [prefixes, setPrefixes] = useState<Prefixes>({});

	return (
		<div className="container">
			<div>
				{Object.entries(modules).map(([filePath, importFn]) => (
					<Module
						key={filePath}
						filePath={filePath}
						importFn={importFn as () => Promise<{ default: JSONModule }>}
						onPrefixesLoaded={(modulePrefixes) => {
							setPrefixes((prev) => ({ ...prev, ...modulePrefixes }));
						}}
						onPropertySelect={(propertyData) => {
							setSelectedProperties((prev) => ({
								...prev,
								...propertyData,
							}));
						}}
						onPropertyDeselect={(propertyName) => {
							setSelectedProperties((prev) => {
								const updated = { ...prev };
								delete updated[propertyName];
								return updated;
							});
						}}
					/>
				))}
			</div>
			<CodeDisplay
				selectedProperties={selectedProperties}
				prefixes={prefixes}
			/>
		</div>
	);
};

export default App;

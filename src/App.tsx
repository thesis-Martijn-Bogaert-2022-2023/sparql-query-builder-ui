import React, { useState, useEffect } from 'react';
import Module from './Module';
import { Properties } from './types';
import { buildQuery } from 'sparql-query-builder';
import './styles/App.scss';

const App: React.FC = () => {
	const modules = import.meta.glob('./config/*.json');
	const [selectedProperties, setSelectedProperties] = useState<Properties>({});
	const [generatedQuery, setGeneratedQuery] = useState<string>('');

	useEffect(() => {
		if (Object.keys(selectedProperties).length > 0) {
			const query = buildQuery(selectedProperties);
			setGeneratedQuery(query);
		} else {
			setGeneratedQuery('');
		}
	}, [selectedProperties]);

	return (
		<div className="container">
			<div>
				{Object.entries(modules).map(([filePath, importFn]) => (
					<Module
						key={filePath}
						filePath={filePath}
						importFn={importFn as () => Promise<{ default: Properties }>}
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
			<div>
				<span>
					Number of properties selected:{' '}
					{Object.keys(selectedProperties).length}
				</span>
				{generatedQuery && <pre>{generatedQuery}</pre>}
			</div>
		</div>
	);
};

export default App;

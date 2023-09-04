import React, { useState } from 'react';
import Module from './Module';
import CodeDisplay from './CodeDisplay';
import { Properties } from './types';
import './styles/App.scss';

const App: React.FC = () => {
	const modules = import.meta.glob('./config/*.json');
	const [selectedProperties, setSelectedProperties] = useState<Properties>({});

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
			<CodeDisplay selectedProperties={selectedProperties} />
		</div>
	);
};

export default App;

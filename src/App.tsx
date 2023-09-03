import React from 'react';
import Module from './Module';
import { Properties } from './types';

const App: React.FC = () => {
	const modules = import.meta.glob('./config/*.json');

	return (
		<div>
			{Object.entries(modules).map(([filePath, importFn]) => (
				<Module
					key={filePath}
					filePath={filePath}
					importFn={importFn as () => Promise<{ default: Properties }>}
				/>
			))}
		</div>
	);
};

export default App;

import { useState } from 'react';
import { Properties, Statement } from './types';
import Module from './Module';
import './styles/App.scss';

interface SelectedProperty {
	id: string;
	name: string;
	statements: Statement[];
}

const App: React.FC = () => {
	const modules = import.meta.glob('./config/*.json');
	const [selectedProperties, setSelectedProperties] = useState<
		SelectedProperty[]
	>([]);

	const addProperty = (
		id: string,
		propertyName: string,
		statements: Statement[]
	) => {
		setSelectedProperties((prev) => [
			...prev,
			{ id, name: propertyName, statements },
		]);
	};

	const removeProperty = (id: string) => {
		setSelectedProperties((prev) => prev.filter((prop) => prop.id !== id));
	};

	return (
		<div className="container">
			<div>
				{Object.entries(modules).map(([filePath, importFn]) => (
					<Module
						key={filePath}
						filePath={filePath}
						importFn={importFn as () => Promise<{ default: Properties }>}
						onPropertyAdd={addProperty}
						onPropertyRemove={removeProperty}
					/>
				))}
			</div>
			<div>
				{selectedProperties.length === 0 ? (
					<span>No properties selected yet</span>
				) : (
					<span>
						Number of properties selected: {selectedProperties.length}
					</span>
				)}
			</div>
		</div>
	);
};

export default App;

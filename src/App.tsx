import Module from './Module';

export default function App() {
	// Import all JSON files from the config directory
	const configFiles = import.meta.glob('./config/*.json');
	const fileNames = Object.keys(configFiles);

	return (
		<>
			<div>Hello World</div>
			{fileNames.map((filePath) => (
				<Module key={filePath} filePath={filePath} />
			))}
		</>
	);
}

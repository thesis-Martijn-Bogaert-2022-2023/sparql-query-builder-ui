import React, { useState } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

interface QueryExecutionProps {
	sparqlQuery: string;
	predicates: string[];
}

const QueryExecution: React.FC<QueryExecutionProps> = ({
	sparqlQuery,
	predicates,
}) => {
	const [useLinkTraversal, setUseLinkTraversal] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');

	return (
		<div className="toggle-run-query">
			<label>
				<Toggle
					defaultChecked={useLinkTraversal}
					onChange={(e) => {
						setUseLinkTraversal(e.target.checked);
					}}
				/>
				<span>Use Link Traversal</span>
			</label>
			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<button
				onClick={() => {
					console.log('Query:', sparqlQuery);
					console.log('Predicates:', predicates);
					console.log(inputValue);
				}}
			>
				Run Query
			</button>
		</div>
	);
};

export default QueryExecution;

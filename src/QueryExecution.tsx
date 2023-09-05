import React, { useState } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import './styles/QueryExecution.scss';

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
		<>
			<textarea
				value={inputValue}
				placeholder="Enter datasource(s), seperate using comma's"
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<div className="toggle-run-query">
				<label className="toggle-label">
					<span>Use Link Traversal: </span>
					<Toggle
						icons={false}
						defaultChecked={useLinkTraversal}
						onChange={(e) => {
							setUseLinkTraversal(e.target.checked);
						}}
					/>
				</label>
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
		</>
	);
};

export default QueryExecution;

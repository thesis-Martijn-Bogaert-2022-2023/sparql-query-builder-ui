import React, { useState } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import './styles/QueryExecution.scss';
import { iriIsValid } from './iri-validation';
import { DebounceInput } from 'react-debounce-input';

interface QueryExecutionProps {
	sparqlQuery: string;
	predicates: string[];
}

const QueryExecution: React.FC<QueryExecutionProps> = ({
	sparqlQuery,
	predicates,
}) => {
	const [useLinkTraversal, setUseLinkTraversal] = useState<boolean>(false);
	const [datasources, setDatasources] = useState<string[]>([]);

	const handleDatasourcesChange = (datasourcesInput: string) => {
		setDatasources(
			datasourcesInput
				.split(',')
				.map((datasource) => datasource.trim())
				.filter((datasource) => iriIsValid(datasource))
		);
	};

	return (
		<>
			<DebounceInput
				minLength={1}
				debounceTimeout={300}
				element="textarea"
				placeholder="Enter datasource(s), seperate using comma's"
				onChange={(e) => handleDatasourcesChange(e.target.value)}
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
					disabled={!useLinkTraversal && !(datasources.length > 0)}
					onClick={() => {
						console.log('Query:', sparqlQuery);
						console.log('Predicates:', predicates);
						console.log(datasources);
					}}
				>
					Run Query
				</button>
			</div>
		</>
	);
};

export default QueryExecution;

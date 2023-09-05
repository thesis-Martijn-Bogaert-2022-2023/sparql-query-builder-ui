import React, { useState } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import './styles/QueryExecution.scss';
import { iriIsValid } from './iri-validation';
import { DebounceInput } from 'react-debounce-input';
import { QueryEngine } from '@comunica/query-sparql';
import { QueryEngineFactory } from '@comunica/query-sparql-link-traversal-custom';
import { Bindings, IDataSource } from '@comunica/types';
import BarLoader from 'react-spinners/BarLoader';

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
	const [queryResults, setQueryResults] = useState<
		Array<Record<string, string>>
	>([]);
	const [loading, setLoading] = useState(false);

	const handleDatasourcesChange = (datasourcesInput: string) => {
		setDatasources(
			datasourcesInput
				.split(',')
				.map((datasource) => datasource.trim())
				.filter((datasource) => iriIsValid(datasource))
		);
	};

	const executeQuery = async () => {
		setQueryResults([]);

		if (useLinkTraversal) {
			const queryEngine = await new QueryEngineFactory().create({
				configPath: '',
			});
			console.log(queryEngine);
			alert('Not implemented yet!');
		} else {
			const queryEngine = new QueryEngine();

			setLoading(true);

			const bindingsStream = await queryEngine.queryBindings(sparqlQuery, {
				sources: [...datasources] as [IDataSource, ...IDataSource[]],
			});

			bindingsStream.on('data', (bindings: Bindings) => {
				const queryResult: Record<string, string> = {};
				for (const key of bindings.keys()) {
					const value = bindings.get(key)?.value;
					if (value) queryResult[key.value] = value;
				}
				setQueryResults((prevResults) => [...prevResults, queryResult]);
			});

			bindingsStream.on('end', () => {
				setLoading(false);
			});

			bindingsStream.on('error', (error: Error) => {
				console.error(error.message);
				setLoading(false);
			});
		}
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
					onClick={executeQuery}
				>
					Run Query
				</button>
			</div>
			<div className={`loader-container${loading ? ' loading' : ''}`}>
				<BarLoader />
			</div>
			<div className="query-results">
				{queryResults.map((result, index) => (
					<div key={index}>
						{Object.entries(result).map(([key, value]) => (
							<div key={key}>
								<strong>{key}:</strong> {value}
							</div>
						))}
					</div>
				))}
			</div>
		</>
	);
};

export default QueryExecution;

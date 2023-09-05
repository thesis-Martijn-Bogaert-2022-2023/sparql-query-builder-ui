import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-turtle';
import 'prismjs/components/prism-sparql';
import { buildQuery } from 'sparql-query-builder';
import { Prefixes, Properties, SelectedProperty } from './types';
import copy from 'copy-text-to-clipboard';
import copyIcon from './assets/copy.svg';
import './styles/CodeDisplay.scss';
import { DebounceInput } from 'react-debounce-input';

interface CodeDisplayProps {
	selectedProperties: SelectedProperty[];
	prefixes: Prefixes;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({
	selectedProperties,
	prefixes,
}) => {
	const [sparqlQuery, setSparqlQuery] = useState<string>('');
	const [highlightedCode, setHighlightedCode] = useState<string>('');
	const [limit, setLimit] = useState<number | null>(null);
	const [offset, setOffset] = useState<number | null>(null);

	useEffect(() => {
		const propertiesObject: Properties = selectedProperties.reduce(
			(acc, curr) => {
				const existingProperty = selectedProperties.find(
					(prop) =>
						prop.propertyName === curr.propertyName &&
						prop.fileName !== curr.fileName
				);
				const key = existingProperty
					? `${curr.propertyName}_${curr.fileName}`
					: curr.propertyName;
				acc[key] = curr.propertyDetails;
				return acc;
			},
			{} as Properties
		);

		if (Object.keys(propertiesObject).length > 0) {
			const query = buildQuery(
				propertiesObject,
				prefixes,
				undefined,
				limit && limit > 0 ? limit : undefined,
				offset && offset > 0 ? offset : undefined
			);
			setSparqlQuery(query);

			const highlighted = Prism.highlight(
				query,
				Prism.languages.sparql,
				'sparql'
			);
			setHighlightedCode(highlighted);
		} else {
			setSparqlQuery('');
			setHighlightedCode('');
		}
	}, [selectedProperties, prefixes, limit, offset]);

	const propertiesCount = selectedProperties.length;

	return (
		<div>
			{propertiesCount > 0 ? (
				<>
					<span className="counter">
						Number of properties selected: {propertiesCount}
					</span>
					<div className="limit-offset">
						<label htmlFor="limit">Limit:</label>
						<DebounceInput
							minLength={1}
							debounceTimeout={300}
							type="number"
							id="limit"
							value={limit || ''}
							onChange={(e) => setLimit(Number(e.target.value))}
						/>
						<label htmlFor="offset">Offset:</label>
						<DebounceInput
							minLength={1}
							debounceTimeout={300}
							type="number"
							id="offset"
							value={offset || ''}
							onChange={(e) => setOffset(Number(e.target.value))}
						/>
					</div>
					<pre>
						<img
							src={copyIcon}
							alt="Copy code"
							className="copy-icon"
							onClick={() => copy(sparqlQuery)}
						/>
						<code
							id="codeBlock"
							dangerouslySetInnerHTML={{ __html: highlightedCode }}
						/>
					</pre>
				</>
			) : (
				<span className="counter">No properties selected</span>
			)}
		</div>
	);
};

export default CodeDisplay;

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

	useEffect(() => {
		const propertiesObject: Properties = selectedProperties.reduce(
			(acc, curr) => {
				// Check if the property name already exists in the accumulator
				const existingProperty = selectedProperties.find(
					(prop) =>
						prop.propertyName === curr.propertyName &&
						prop.fileName !== curr.fileName
				);

				// If it exists, use a combination of fileName and propertyName, otherwise just use propertyName
				const key = existingProperty
					? `${curr.propertyName}_${curr.fileName}`
					: curr.propertyName;

				acc[key] = curr.propertyDetails;
				return acc;
			},
			{} as Properties
		);

		if (Object.keys(propertiesObject).length > 0) {
			const query = buildQuery(propertiesObject, prefixes);
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
	}, [selectedProperties, prefixes]);

	const propertiesCount = selectedProperties.length;

	return (
		<div>
			{propertiesCount > 0 ? (
				<>
					<span>Number of properties selected: {propertiesCount}</span>
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
				<span>No properties selected</span>
			)}
		</div>
	);
};

export default CodeDisplay;

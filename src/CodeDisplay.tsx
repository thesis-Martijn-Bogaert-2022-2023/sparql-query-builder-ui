import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-turtle';
import 'prismjs/components/prism-sparql';
import { buildQuery } from 'sparql-query-builder';
import { Prefixes, Properties } from './types';
import copy from 'copy-text-to-clipboard';
import copyIcon from './assets/copy.svg';
import './styles/CodeDisplay.scss';

interface CodeDisplayProps {
	selectedProperties: Properties;
	prefixes: Prefixes;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({
	selectedProperties,
	prefixes,
}) => {
	const [sparqlQuery, setSparqlQuery] = useState<string>('');
	const [highlightedCode, setHighlightedCode] = useState<string>('');

	useEffect(() => {
		if (Object.keys(selectedProperties).length > 0) {
			const query = buildQuery(selectedProperties, prefixes);
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

	const propertiesCount = Object.keys(selectedProperties).length;

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

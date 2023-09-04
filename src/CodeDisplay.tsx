import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-turtle';
import 'prismjs/components/prism-sparql';
import { buildQuery } from 'sparql-query-builder';
import { Properties } from './types';
import copy from 'copy-text-to-clipboard';
import copyIcon from './assets/copy.svg';
import './styles/CodeDisplay.scss';

interface CodeDisplayProps {
	selectedProperties: Properties;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ selectedProperties }) => {
	const [sparqlQuery, setSparqlQuery] = useState<string>('');
	const [highlightedCode, setHighlightedCode] = useState<string>('');

	useEffect(() => {
		if (Object.keys(selectedProperties).length > 0) {
			const query = buildQuery(selectedProperties);
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
	}, [selectedProperties]);

	return (
		<div>
			<span>
				Number of properties selected: {Object.keys(selectedProperties).length}
			</span>
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
		</div>
	);
};

export default CodeDisplay;

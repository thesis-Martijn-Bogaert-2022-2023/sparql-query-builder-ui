import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-turtle';
import 'prismjs/components/prism-sparql';
import { buildQuery } from 'sparql-query-builder';
import { Properties } from './types';
import './styles/CodeDisplay.scss';

interface CodeDisplayProps {
	selectedProperties: Properties;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ selectedProperties }) => {
	const [highlightedCode, setHighlightedCode] = useState<string>('');

	useEffect(() => {
		if (Object.keys(selectedProperties).length > 0) {
			const query = buildQuery(selectedProperties);
			const highlighted = Prism.highlight(
				query,
				Prism.languages.sparql,
				'sparql'
			);
			setHighlightedCode(highlighted);
		} else {
			setHighlightedCode('');
		}
	}, [selectedProperties]);

	return (
		<div>
			<span>
				Number of properties selected: {Object.keys(selectedProperties).length}
			</span>
			<pre>
				<code
					id="codeBlock"
					dangerouslySetInnerHTML={{ __html: highlightedCode }}
				/>
			</pre>
		</div>
	);
};

export default CodeDisplay;

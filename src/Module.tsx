// Module.tsx
import React, { useState } from 'react';
import { Collapse } from 'react-collapse';

interface ModuleProps {
	filePath: string;
}

const Module: React.FC<ModuleProps> = ({ filePath }) => {
	const [content, setContent] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleFileClick = async () => {
		if (!content) {
			const module = await import(filePath);
			setContent(JSON.stringify(module.default, null, 2));
		}
		setIsOpen(!isOpen);
	};

	const fileName = filePath.split('/').pop();

	return (
		<div>
			<button onClick={handleFileClick}>{fileName}</button>
			<Collapse isOpened={isOpen}>
				<pre>{content}</pre>
			</Collapse>
		</div>
	);
};

export default Module;

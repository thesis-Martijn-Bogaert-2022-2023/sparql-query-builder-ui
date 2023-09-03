export interface Statement {
	predicate: string;
	prefix?: string;
	subject_variable_name?: string;
	object_variable_name?: string;
}

export interface PropertyData {
	statements: Statement[];
	question?: string;
}

export interface Properties {
	[key: string]: PropertyData;
}

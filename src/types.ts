export interface Statement {
	predicate: string;
	prefix?: string;
	subject_variable_name?: string;
	object_variable_name?: string;
}

export interface PropertyDetails {
	statements: Statement[];
	question?: string;
	filters?: {
		string?: string;
		language?: string;
	};
	optional?: boolean;
}

export interface Properties {
	[propertyName: string]: PropertyDetails;
}

export interface Prefixes {
	[prefixName: string]: string;
}

export interface JSONModule {
	prefixes?: Prefixes;
	properties: Properties;
}

export interface SelectedProperty {
	fileName: string;
	propertyName: string;
	propertyDetails: PropertyDetails;
}

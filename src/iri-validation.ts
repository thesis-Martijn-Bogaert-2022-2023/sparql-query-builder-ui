import { validateIri } from 'validate-iri';

export function iriIsValid(iri: string): boolean {
	// validateIri returns undefined in case valid
	if (validateIri(iri) === undefined) return true;
	return false;
}

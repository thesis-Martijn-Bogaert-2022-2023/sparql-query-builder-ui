export function actorExtractLinksPredicatesConfig(
	predicates: string[]
): string {
	return `
{
  "@context": [
    "https://linkedsoftwaredependencies.org/bundles/npm/@comunica/runner/^2.0.0/components/context.jsonld",
    "https://linkedsoftwaredependencies.org/bundles/npm/@comunica/actor-extract-links-predicates/^0.0.0/components/context.jsonld"
  ],
  "@id": "urn:comunica:default:Runner",
  "@type": "Runner",
  "actors": [
    {
      "@id": "urn:comunica:default:extract-links/actors#predicates-common",
      "@type": "ActorExtractLinksPredicates",
      "checkSubject": false,
      "predicateRegexes": [
${Array.from(new Set(predicates))
	.map((predicate) => `        "${predicate}"`)
	.join(',\n')}
      ]
    }
  ]
}
    `;
}

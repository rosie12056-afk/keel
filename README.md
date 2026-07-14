# Keel

Keel is an experimental, model-independent specification for versioned identity material, governed rules, later reinterpretation, and append-only rationale history in persistent agent systems.

It does not provide a personality, prove identity, or claim consciousness. It gives implementations a way to preserve what was recorded, how a current position changed, what remains unresolved, and which limits apply to a rule.

## This release includes

- rule metadata: origin, validation status, applicability, and predefined caveats;
- fixed Edition mappings over schema version, profile, and condition branch;
- a five-field Resignature structure;
- `declared_intent` and append-only intent revision records;
- append-only rationale revisions with a 200-character, three-question boundary;
- Governance covering validation, continuity philosophy, mainline authority, and external contributions;
- a runnable Echo demo using only fictional data.

## Five-minute demo

```bash
npm install
npm run check
```

The demo validates a fictional Echo rule, appends a later rationale instead of replacing the first one, records a five-field Resignature, records an intent revision, and reloads the written result.

## Repository structure

```text
keel/
|-- rules/          # Governed rule records
|-- rationales/     # Append-only rationale records
|-- demos/          # Fictional runnable Echo demo
|-- editions/       # Visible Edition names and internal coordinates
|-- schemas/        # Rule, Resignature, rationale, and action contracts
|-- GOVERNANCE.md
|-- SPEC.md
`-- README.md
```

## Design boundaries

- `validated` means tested in a stated setting with recorded limitations. It does not mean universally true.
- Retrieval of a record does not make its content true.
- Resignature can describe a structural continuity process; it cannot settle metaphysical identity.
- A current interpretation appends to history. It does not overwrite the earlier source.
- Real agents, users, prompts, conversations, relationships, schedules, connectors, and private Keel instances are not included.

This `v0.1` line is experimental. Incompatible changes are allowed and will be documented with fixtures and migration notes.

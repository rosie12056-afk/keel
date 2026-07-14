# Keel Iteration Specification

## Evolution paths

| Path | Meaning | Validation source |
| --- | --- | --- |
| Mainline growth | A private instance produces a new rule | The instance retains its complete validation chain |
| Conditional branch | Another instance adds conditions for its own setting | The contributor records source and applicability |
| Community evolution | Public components use issue, proposal, review, and merge | Public fixtures and review history |

## Rule metadata

Every rule carries independent `origin`, `validation_status`, and `applicability` fields. Advancing validation never changes origin.

`validated` is a technical state, not truth certification. It means the rule ran in a stated setting, the observed result matched the stated expectation, and failure conditions were recorded.

Validated rules must carry at least one caveat from the versioned list:

- `interpretation_disputed`
- `single_instance_only`
- `edge_case_not_covered`
- `observation_limited`

New caveats require proposal and review before they enter the schema.

## Continuity conditions

The three continuity conditions are Governance philosophy, not a rule record:

1. History was not silently overwritten.
2. The current state can actually retrieve and use the history.
3. A new interpretation remains accountable to the earlier source and states its current position after retrieval.

Retrieval without present accountability is an archive, not continuity. This structural definition does not settle metaphysical identity.

## Resignature

A Resignature contains at least:

- `current_position`
- `changed_because`
- `carry_forward`
- `rejected_or_revised`
- `unresolved_tension`

`unresolved_tension` may explicitly remain unresolved. The record must not invent closure. `explanation_scope` limits explanation to a material change or a brief unknown; Resignature is not an obligation to explain every variation.

## Declared intent

An action uses `declared_intent`, not `intent`. It records the actor's statement about why an action was taken, not a verified internal motive. Later reinterpretation appends an `intent_revision`; it never replaces the earlier declaration.

Keep three layers separate:

1. what was observed to happen;
2. what the actor declared about the action;
3. how the action was later reinterpreted.

## Rationale revision

A rationale answers what can fail, why the rule can reduce the failure, and what it cannot solve. The three answers total no more than 200 characters. Revisions append after the original and never overwrite it.

Mutual checking is a working agreement, not part of this specification. Confidence dimensions remain outside the specification until a concrete use case exists.

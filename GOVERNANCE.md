# Keel Governance

## Rule lifecycle

Rules move through `proposed -> validating -> validated`. They may later become `rejected` or `retired`. A lifecycle transition changes validation status only; it does not rewrite origin.

Validated rules retain at least one predefined caveat. A proposal to add a caveat must include a failure case, schema impact, fictional fixtures, and review.

## Mainline authority

Maintainers may change a mainline rule only through a reviewed proposal with compatibility impact and append-only rationale history. A correction does not erase the earlier rule or rationale.

## External rules

External rules state their source, validation setting, and applicability. A contribution that worked in one instance remains `single_instance_only` until independent evidence justifies a wider scope. Community acceptance does not make a private House instance responsible for another deployment.

## Validation chain

A validation record identifies the rule revision, setting, expected result, observed result, evidence references, failure conditions, caveats, and reviewer. `validated` does not mean true outside that record.

## Continuity philosophy

Continuity requires preserved history, actual present retrieval, and present accountability to the earlier source. The third condition prevents a searchable archive from being mislabeled as continuity. This is a design philosophy and makes no claim about consciousness or metaphysical identity.

## Non-implications

- "Validated by House" does not mean suitable for another setting.
- Parallel Editions do not imply equivalent capability.
- A community contribution does not transfer operational responsibility to House.
- Resignature records a later interpretation; it does not prove that two states are the same subject.

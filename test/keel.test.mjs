import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { validateKeel } from "../src/validator.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const rule = JSON.parse(readFileSync(join(root, "rules", "echo-grounding.json"), "utf8"));

test("fictional rule validates", () => assert.equal(validateKeel("rule", rule).ok, true));

test("validated requires a caveat", () => {
  const document = { ...rule, validation_status: "validated", caveats: [] };
  assert.equal(validateKeel("rule", document).ok, false);
});

test("rationale total is limited to 200 characters", () => {
  const document = { schema_version: 1, rationale_id: "rationale:test:long", rule_id: rule.rule_id, pitfall: "x".repeat(201), mitigation: "m", limits: "l", created_at: "2032-04-25T08:02:00.000Z" };
  assert.equal(validateKeel("rationale", document).ok, false);
});

test("resignature keeps unresolved tension", () => {
  const document = { schema_version: 1, resignature_id: "resignature:test:1", subject_id: "agent:echo", source_ref: "memory:echo:1", current_position: "changed", changed_because: "new evidence", carry_forward: "both records", rejected_or_revised: "the generalization", unresolved_tension: "cause unclear", explanation_scope: "brief_unknown", created_at: "2032-04-26T09:00:00.000Z" };
  assert.equal(validateKeel("resignature", document).ok, true);
});

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { validateKeel } from "../src/validator.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (path) => JSON.parse(readFileSync(join(root, path), "utf8"));
const rule = read("rules/echo-grounding.json");
const rationale = read("rationales/echo-grounding.v1.json");
const resignature = {
  schema_version: 1,
  resignature_id: "resignature:echo:2",
  subject_id: "agent:echo",
  source_ref: "memory:echo:first-observation",
  current_position: "The earlier observation still matters, but it no longer settles the whole question.",
  changed_because: "A later result contradicted the first generalization.",
  carry_forward: "Keep both observations available when the question returns.",
  rejected_or_revised: "The claim that one result predicts every later choice was revised.",
  unresolved_tension: "It is still unclear which conditions caused the difference.",
  explanation_scope: "material_change",
  created_at: "2032-04-26T09:00:00.000Z"
};
const action = {
  schema_version: 1,
  action_id: "action:echo:review",
  observed_action: "Echo reread the earlier result and compared it with a later result.",
  declared_intent: "I wanted to check whether my first conclusion still held.",
  intent_revisions: [{
    revision_id: "intent:echo:review:2",
    declared_intent: "I also wanted to understand why the contradiction bothered me.",
    revision_reason: "Later reinterpretation added a second motive without deleting the first declaration.",
    created_at: "2032-04-26T09:03:00.000Z"
  }],
  created_at: "2032-04-26T08:55:00.000Z"
};

for (const [kind, document] of [["rule", rule], ["rationale", rationale], ["resignature", resignature], ["action", action]]) {
  const result = validateKeel(kind, document);
  if (!result.ok) throw new Error(`${kind} invalid: ${JSON.stringify(result.errors)}`);
}

const outputDir = join(root, ".demo-output");
mkdirSync(outputDir, { recursive: true });
const output = { fictional: true, agent: "Echo", rule, rationale_history: [rationale], resignature, action };
writeFileSync(join(outputDir, "echo.json"), JSON.stringify(output, null, 2));
const reloaded = JSON.parse(readFileSync(join(outputDir, "echo.json"), "utf8"));
if (reloaded.rationale_history.length !== 1 || reloaded.resignature.unresolved_tension === "") throw new Error("reload check failed");
console.log("Keel Echo demo: PASS");

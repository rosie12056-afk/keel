import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const files = { rule: "rule.schema.json", resignature: "resignature.schema.json", action: "action.schema.json", rationale: "rationale.schema.json" };
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validators = new Map(Object.entries(files).map(([kind, file]) => [kind, ajv.compile(JSON.parse(readFileSync(join(root, "schemas", file), "utf8")))]));

export function validateKeel(kind, document) {
  const validate = validators.get(kind);
  if (!validate) return { ok: false, errors: [{ message: `unknown kind: ${kind}` }] };
  const schemaOk = validate(document);
  const errors = schemaOk ? [] : structuredClone(validate.errors || []);
  if (schemaOk && kind === "rationale") {
    const count = [...`${document.pitfall}\n${document.mitigation}\n${document.limits}`].length;
    if (count > 200) errors.push({ instancePath: "/", keyword: "maxRationaleCharacters", message: "the three rationale answers must total at most 200 characters" });
  }
  if (schemaOk && kind === "action") {
    let expectedPrevious = null;
    for (const [index, revision] of document.intent_revisions.entries()) {
      if ((revision.previous_revision_id || null) !== expectedPrevious) errors.push({ instancePath: `/intent_revisions/${index}/previous_revision_id`, keyword: "appendOnlyChain", message: "intent revisions must form one append-only chain" });
      expectedPrevious = revision.revision_id;
    }
  }
  return { ok: schemaOk && errors.length === 0, errors };
}

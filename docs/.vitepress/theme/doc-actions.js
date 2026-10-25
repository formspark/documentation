// The address of a page's Markdown copy and the prompt that hands the page to
// a coding agent. The DocActions buttons use them, and the tests import them.

import { SITE_URL } from "../urls.js";

const PRODUCT = "Formspark";
const SITE_BASE = "/";
const SKILL_URL = `${SITE_URL}/skills/formspark/SKILL.md`;

// The site path of a page's Markdown copy: the page's source path under the
// site's base, so a directory index is its index.md. Characters a URL path
// cannot hold as they are, such as braces, are percent-encoded.
export function markdownPathFor(relativePath) {
  return encodeURI(`${SITE_BASE}${relativePath}`);
}

export function markdownUrlFor(relativePath) {
  return `${SITE_URL}${markdownPathFor(relativePath)}`;
}

export function agentPrompt(title, markdownUrl) {
  return [
    `Read the ${PRODUCT} docs page "${title}": ${markdownUrl}`,
    `The ${PRODUCT} agent skill is at ${SKILL_URL}.`,
    "Use them to make this change in my project, on the stack it already uses. Ask me for keys or IDs rather than inventing them.",
  ].join("\n");
}

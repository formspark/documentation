<script setup>
import { useData } from "vitepress";
import { computed, ref } from "vue";
import { markdownUrl, SITE_URL } from "../urls.js";

const { page } = useData();
const copied = ref(false);

// A prompt to paste into a coding agent: this page as Markdown, the skill
// that explains Formspark as a whole, and where to find the other pages.
const prompt = computed(() =>
  [
    "Help me integrate Formspark, a hosted form backend.",
    `Read this documentation page as Markdown: ${markdownUrl(page.value.relativePath)}`,
    `Follow the Formspark agent skill: ${SITE_URL}/skills/formspark/SKILL.md`,
    `The page index is at ${SITE_URL}/llms.txt, and every page in one file is at ${SITE_URL}/llms-full.txt.`,
  ].join("\n"),
);

async function copy() {
  await navigator.clipboard.writeText(prompt.value);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
}
</script>

<template>
  <div class="copy-for-agents">
    <button type="button" @click="copy">
      {{ copied ? "Copied" : "Copy for agents" }}
    </button>
    <span class="visually-hidden" aria-live="polite">
      {{ copied ? "Prompt copied to the clipboard" : "" }}
    </span>
  </div>
</template>

<style scoped>
.copy-for-agents {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

button {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 4px 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition:
    color 0.25s,
    border-color 0.25s;
}

button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
</style>

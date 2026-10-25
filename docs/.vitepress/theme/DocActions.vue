<script setup>
import { useData } from "vitepress";
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from "vue";
import { agentPrompt, markdownPathFor, markdownUrlFor } from "./doc-actions";

// Copies the page's Markdown copy, or a prompt that points a coding agent at
// it, from a split button at the top of the page. The arrow half is a plain
// disclosure rather than an ARIA menu: it shows two more controls, and the
// keyboard reaches them with Tab like any others.

const FEEDBACK_MS = 2000;

const { page, frontmatter } = useData();
const markdownPath = computed(() => markdownPathFor(page.value.relativePath));
// The title VitePress resolved for the page, from its frontmatter or else its
// first heading.
const title = computed(() => page.value.title || frontmatter.value.title);

const panelId = useId();
const root = ref(null);
const toggle = ref(null);
const open = ref(false);
const copied = ref(null);
const status = ref("");
let timer;

function close({ focus = false } = {}) {
  open.value = false;
  if (focus) toggle.value?.focus();
}

// Swaps the clicked label to "Copied" and tells a screen reader what
// happened, then puts both back, so the same message is announced again on
// the next click. A copy from the panel closes it once the label has shown,
// and focus moves to the arrow rather than being lost with the panel.
function announce(message, label = null) {
  clearTimeout(timer);
  status.value = message;
  copied.value = label;
  timer = setTimeout(() => {
    if (copied.value === "prompt") {
      close({ focus: root.value?.contains(document.activeElement) });
    }
    copied.value = null;
    status.value = "";
  }, FEEDBACK_MS);
}

// Attributes for one of a control's two labels. Both keep their place, so the
// control holds the width of the longer one; the label not showing is hidden
// from sight and from screen readers.
function label(key, copiedLabel) {
  const hidden = (copied.value === key) !== copiedLabel;
  return hidden ? { class: "inactive", "aria-hidden": "true" } : {};
}

async function markdownBlob() {
  const response = await fetch(markdownPath.value);
  if (!response.ok) throw new Error(`${response.status} ${response.url}`);
  return new Blob([await response.text()], { type: "text/plain" });
}

// Safari keeps the click's permission to write only while the write starts in
// the click itself, so the fetch goes to ClipboardItem as a promise.
async function copyMarkdown() {
  try {
    if (typeof ClipboardItem === "undefined") {
      const blob = await markdownBlob();
      await navigator.clipboard.writeText(await blob.text());
    } else {
      await navigator.clipboard.write([
        new ClipboardItem({ "text/plain": markdownBlob() }),
      ]);
    }
    announce("Copied the page's Markdown", "markdown");
  } catch {
    open.value = true;
    announce("Could not copy the Markdown. Open it with View as Markdown.");
  }
}

async function copyPrompt() {
  try {
    await navigator.clipboard.writeText(
      agentPrompt(title.value, markdownUrlFor(page.value.relativePath)),
    );
    announce("Copied the prompt for agents", "prompt");
  } catch {
    announce("Could not copy the prompt for agents.");
  }
}

function onEscape() {
  if (open.value) close({ focus: true });
}

function onPointerDown(event) {
  if (open.value && !root.value?.contains(event.target)) close();
}

watch(
  () => page.value.relativePath,
  () => close(),
);
onMounted(() => document.addEventListener("pointerdown", onPointerDown));
onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", onPointerDown);
  clearTimeout(timer);
});
</script>

<template>
  <div ref="root" class="doc-actions" @keydown.escape="onEscape">
    <div class="bar">
      <div class="split">
        <button type="button" class="action" @click="copyMarkdown">
          <svg
            class="icon"
            viewBox="0 0 24 24"
            width="14"
            height="14"
            aria-hidden="true"
          >
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path
              d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"
            />
          </svg>
          <span class="labels">
            <span v-bind="label('markdown', false)">Copy Markdown</span>
            <span v-bind="label('markdown', true)">Copied</span>
          </span>
        </button>
        <button
          ref="toggle"
          type="button"
          class="action toggle"
          aria-label="More copy options"
          :aria-expanded="String(open)"
          :aria-controls="panelId"
          @click="open = !open"
        >
          <svg
            class="icon"
            viewBox="0 0 24 24"
            width="14"
            height="14"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>
      <div v-show="open" :id="panelId" class="panel">
        <button type="button" class="item" @click="copyPrompt">
          <span class="labels">
            <span v-bind="label('prompt', false)">Copy for agents</span>
            <span v-bind="label('prompt', true)">Copied</span>
          </span>
        </button>
        <a
          class="item"
          :href="markdownPath"
          target="_blank"
          rel="noopener"
          @click="close()"
        >
          View as Markdown <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
    <span class="visually-hidden" aria-live="polite">{{ status }}</span>
  </div>
</template>

<style scoped>
/* Below 640px the buttons take a row of their own above the H1. From 640px
   they sit in the H1's first line, which the global rule below keeps clear.
   A float would do the same for a plain page, but any content that forms its
   own layout box, such as an API operation, would then narrow beside it for
   its whole height. */
.doc-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  -webkit-user-select: none;
  user-select: none;
}

.bar {
  position: relative;
  z-index: 1;
}

@media (min-width: 640px) {
  .doc-actions {
    position: relative;
    height: 0;
    margin: 0;
  }

  .bar {
    position: absolute;
    top: 5px;
    right: 0;
  }
}

/* The outline belongs to the wrapper and the fills stay inside it, so no
   state of either half can cover the border. The border token is the one
   stronger than any fill, in both colour schemes. */
.split {
  display: flex;
  overflow: hidden;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
}

.action {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
  padding: 0 10px;
  line-height: 30px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  color: var(--vp-c-text-2);
  transition:
    color 0.25s,
    background-color 0.25s;
}

.toggle {
  padding: 0 8px;
  border-left: 1px solid var(--vp-c-border);
}

.action:hover,
.toggle[aria-expanded="true"] {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-default-soft);
}

/* Both labels share one cell, so the control keeps the width of the longer
   one while "Copied" shows and nothing beside it moves. */
.labels {
  display: grid;
  justify-items: start;
  text-align: left;
}

.labels > span {
  grid-area: 1 / 1;
}

.labels > .inactive {
  visibility: hidden;
}

.icon {
  flex-shrink: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.panel {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 184px;
  padding: 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
}

.item {
  display: block;
  width: 100%;
  padding: 0 12px;
  border-radius: 6px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  color: var(--vp-c-text-1);
  transition:
    color 0.25s,
    background-color 0.25s;
}

.item:hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-default-soft);
}

.action:focus-visible,
.item:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

/* Inside the wrapper, which clips anything drawn past its edge. */
.action:focus-visible {
  outline-offset: -2px;
  border-radius: 7px;
}
</style>

<style>
/* Room for the buttons beside a page's H1. Only a heading the page's Markdown
   writes is padded; a heading a component renders lays itself out. */
@media (min-width: 640px) {
  .vp-doc > div > h1 {
    padding-right: 200px;
  }
}
</style>

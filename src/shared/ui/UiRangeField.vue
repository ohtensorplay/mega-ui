<script setup lang="ts">
import { useId } from "vue";

const props = withDefaults(defineProps<{
  lowerValue: number;
  upperValue: number;
  min?: number;
  max?: number;
  step?: number;
  lowerLabel: string;
  upperLabel: string;
  marks?: string[];
}>(), {
  min: 0,
  max: 100,
  step: 1,
  marks: () => [],
});
const emit = defineEmits<{
  "update:lowerValue": [value: number];
  "update:upperValue": [value: number];
}>();
const id = useId();

function updateLower(event: Event): void {
  const value = Number((event.target as HTMLInputElement).value);
  emit("update:lowerValue", Math.min(value, props.upperValue));
}
function updateUpper(event: Event): void {
  const value = Number((event.target as HTMLInputElement).value);
  emit("update:upperValue", Math.max(value, props.lowerValue));
}
</script>

<template>
  <div class="ui-range-field">
    <div v-if="marks.length" class="ui-range-field__marks" aria-hidden="true"><span v-for="mark in marks" :key="mark">{{ mark }}</span></div>
    <div class="ui-range-field__control">
      <label class="sr-only" :for="`${id}-lower`">{{ lowerLabel }}</label>
      <input :id="`${id}-lower`" type="range" :min="min" :max="max" :step="step" :value="lowerValue" @input="updateLower" />
      <label class="sr-only" :for="`${id}-upper`">{{ upperLabel }}</label>
      <input :id="`${id}-upper`" type="range" :min="min" :max="max" :step="step" :value="upperValue" @input="updateUpper" />
    </div>
    <p class="ui-range-field__readout"><slot /></p>
  </div>
</template>

<style scoped>
.ui-range-field__marks { display: flex; justify-content: space-between; gap: var(--space-1); color: var(--text-muted); font-size: var(--font-size-label); font-weight: 620; }
.ui-range-field__marks span:first-child, .ui-range-field__marks span:last-child { padding: 2px 4px; color: var(--text-secondary); background: var(--surface-muted); border-radius: var(--radius-control); }
.ui-range-field__control { position: relative; height: 22px; margin: 5px 3px 0; }
.ui-range-field__control::before { position: absolute; top: 10px; right: 3px; left: 3px; height: 3px; content: ""; background: var(--text-primary); border-radius: var(--radius-control); }
.ui-range-field input { position: absolute; top: 0; left: 0; width: 100%; height: 22px; margin: 0; appearance: none; pointer-events: none; background: transparent; }
.ui-range-field input::-webkit-slider-thumb { width: 11px; height: 11px; appearance: none; pointer-events: auto; cursor: ew-resize; background: var(--text-primary); border: 2px solid var(--surface); border-radius: 50%; box-shadow: 0 0 0 1px var(--text-primary); }
.ui-range-field input::-moz-range-thumb { width: 9px; height: 9px; pointer-events: auto; cursor: ew-resize; background: var(--text-primary); border: 2px solid var(--surface); border-radius: 50%; box-shadow: 0 0 0 1px var(--text-primary); }
.ui-range-field input:focus-visible { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
.ui-range-field__readout { margin: 5px 0 0; color: var(--text-muted); font-size: var(--font-size-meta); }
</style>

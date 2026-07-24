import { defineComponent } from '@opl/core';

/**
 * @kind(component)
 * @contract(id: "feedback-section", in: "any", out: "any")
 * @state(initial: "idle")
 */
export function feedback-section() {
  return { type: 'feedback-section' as const };
}

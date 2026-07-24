import { defineComponent } from '@opl/core';

/**
 * @kind(component)
 * @contract(id: "pricing-redesign", in: "any", out: "any")
 * @state(initial: "idle")
 */
export function pricing-redesign() {
  return { type: 'pricing-redesign' as const };
}

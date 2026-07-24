import { defineComponent } from '@opl/core';

/**
 * @kind(component)
 * @contract(id: "project-case-studies", in: "any", out: "any")
 * @state(initial: "idle")
 */
export function project-case-studies() {
  return { type: 'project-case-studies' as const };
}

import { NodeSchema } from '@alilc/lowcode-types';
import { Node } from '@alilc/lowcode-designer';
import { Component, ComponentPublicInstance, inject, InjectionKey } from 'vue';

export interface RendererContext {
  readonly components: Record<string, Component>;
  readonly designMode: 'live' | 'design' | undefined;
  getNode(id: string): Node<NodeSchema> | null;
  triggerCompGetCtx(schema: NodeSchema, val: ComponentPublicInstance): void;
}

export function contextFactory(): InjectionKey<RendererContext> {
  let context = (window as any).__appContext;
  if (!context) {
    context = Symbol('__appContext');
    (window as any).__appContext = context;
  }
  return context;
}

export function useRendererContext() {
  const key = contextFactory();
  return inject(key)!;
}

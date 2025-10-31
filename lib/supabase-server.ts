export function createClientServer() {
  // Minimal mock that satisfies .from().select().eq().maybeSingle() chains
  const q = {
    select: (_sel?: string) => q,
    eq: (_col?: string, _val?: any) => q,
    order: (_col?: string, _opts?: any) => q,
    limit: (_n?: number) => q,
    maybeSingle: async () => ({ data: null }),
    single: async () => ({ data: null }),
  };
  return {
    from: (_table: string) => q,
  };
}

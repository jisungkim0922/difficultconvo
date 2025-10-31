export function createClientServer(): any {
  const makeQuery = () => {
    const chain: any = {
      select: (_sel?: string) => chain,
      eq: (_col?: string, _val?: any) => chain,
      order: (_col?: string, _opts?: any) => chain,
      limit: (_n?: number) => chain,
      // Allow awaiting the chain directly:
      //   const { data } = await supabase.from("...").select("...").eq(...);
      then: (resolve: (v: any) => any) => resolve({ data: [] }),
      // Keep helpers used elsewhere:
      maybeSingle: async () => ({ data: null }),
      single: async () => ({ data: null }),
    };
    return chain;
  };
  return {
    from: (_table: string) => makeQuery(),
  };
}

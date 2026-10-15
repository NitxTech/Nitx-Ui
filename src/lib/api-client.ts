let sharedClient: any = null;

export const setSharedApiClient = (client: any) => {
  if (client) {
    sharedClient = client;
    if (typeof window !== "undefined") {
      (window as any).__NITX_API_CLIENT__ = client;
    }
  }
};

export const getSharedApiClient = (): any => {
  if (sharedClient) return sharedClient;
  if (typeof window !== "undefined") {
    return (
      (window as any).__NITX_API_CLIENT__ ||
      (window as any).axios ||
      null
    );
  }
  return null;
};

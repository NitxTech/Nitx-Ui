
import { SpaceSelectorApi } from "../types";

// Expects an axios-like instance (with get, post, put, delete methods returning { data: { data: ... } })
export const createSpaceSelectorApi = (client: any): SpaceSelectorApi => {
  return {
    createSpace: async (name: string) => {
      const { data } = await client.post("/api/spaces", { name });
      return data.data;
    },
    deleteSpace: async (id: string) => {
      await client.delete(`/api/spaces/${id}`);
    },
    renameSpace: async (id: string, name: string) => {
      await client.put(`/api/spaces/${id}`, { name });
    },
    fetchMembers: async (spaceId: string) => {
      const { data } = await client.get(`/api/my-space/${spaceId}/members`);
      return data.data;
    },
    fetchInvitations: async (spaceId: string) => {
      const { data } = await client.get(`/api/my-space/${spaceId}/invitations`);
      return data.data;
    },
    inviteMembers: async (spaceId: string, emails: string[], role: string) => {
      await client.post(`/api/my-space/${spaceId}/invitations`, {
        emails,
        role,
      });
    },
    removeMember: async (spaceId: string, memberId: string) => {
      await client.delete(`/api/my-space/${spaceId}/members/${memberId}`);
    },
    updateMemberRole: async (spaceId: string, memberId: string, role: string, email: string) => {
      await client.put(`/api/my-space/${spaceId}/members/${memberId}`, {
        role,
        email,
      });
    },
    revokeInvitation: async (spaceId: string, inviteId: string) => {
      await client.delete(`/api/my-space/${spaceId}/invitations/${inviteId}`);
    },
    resendInvitation: async (spaceId: string, inviteId: string) => {
      await client.post(`/api/my-space/${spaceId}/invitations/${inviteId}/resend`);
    },
    getInviteLink: async (spaceId: string, inviteId: string) => {
      const { data } = await client.get(`/api/my-space/${spaceId}/invitations/${inviteId}/link`);
      return data.data?.link;
    },
    fetchStats: async () => {
      const [screensRes, licensesRes] = await Promise.all([
        client.get("/api/screens"),
        client.get("/api/licenses/available-count"),
      ]);
      return {
        screens: screensRes.data.data?.length || 0,
        licenses: licensesRes.data.data?.available_count || 0,
      };
    },
  };
};

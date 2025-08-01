import fetchClient from "../fetchClient";
import type * as types from "./types.js";

export async function listUsers(params: { query?: types.ListUsersQueryParams; init?: RequestInit }): Promise<types.ListUsersSuccessResponse> {
  const { query, init } = params;
  const url = "/v1/users";
    const searchParams = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.ListUsersSuccessResponse;
}

export async function getSocialProviders(params: { init?: RequestInit }): Promise<types.GetSocialProvidersSuccessResponse> {
  const { init } = params;
  const url = "/v1/users/social/providers";
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetSocialProvidersSuccessResponse;
}

export async function getUserSocialLinks(params: { init?: RequestInit }): Promise<types.GetUserSocialLinksSuccessResponse> {
  const { init } = params;
  const url = "/v1/users/social";
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetUserSocialLinksSuccessResponse;
}

export async function updateUserProfile(params: { body: types.UpdateUserProfileRequestBody; init?: RequestInit }): Promise<types.UpdateUserProfileSuccessResponse> {
  const { body, init } = params;
  const url = "/v1/users/update";
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "PUT",
    headers: { "Content-Type": "application/json", ...init?.headers },
    body: JSON.stringify(body)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.UpdateUserProfileSuccessResponse;
}

export async function getActiveUsers(params: { init?: RequestInit }): Promise<types.GetActiveUsersSuccessResponse> {
  const { init } = params;
  const url = "/v1/users/active";
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetActiveUsersSuccessResponse;
}

export async function getUserByUsername(params: { path: types.GetUserByUsernamePathParams; init?: RequestInit }): Promise<types.GetUserByUsernameSuccessResponse> {
  const { path, init } = params;
  const url = `/v1/users/${path.username}`;
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetUserByUsernameSuccessResponse;
}

export async function checkUsernameAvailability(params: { path: types.CheckUsernameAvailabilityPathParams; init?: RequestInit }): Promise<types.CheckUsernameAvailabilitySuccessResponse> {
  const { path, init } = params;
  const url = `/v1/users/${path.username}/available`;
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.CheckUsernameAvailabilitySuccessResponse;
}

export async function listUsersWithMetadata(params: { query?: types.ListUsersWithMetadataQueryParams; init?: RequestInit }): Promise<types.ListUsersWithMetadataSuccessResponse> {
  const { query, init } = params;
  const url = "/v1/users/admin/users";
    const searchParams = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.ListUsersWithMetadataSuccessResponse;
}

export async function getUserWithMetadata(params: { path: types.GetUserWithMetadataPathParams; init?: RequestInit }): Promise<types.GetUserWithMetadataSuccessResponse> {
  const { path, init } = params;
  const url = `/v1/users/admin/users/${path.userId}`;
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetUserWithMetadataSuccessResponse;
}

export async function banUser(params: { path: types.BanUserPathParams; body: types.BanUserRequestBody; init?: RequestInit }): Promise<types.BanUserSuccessResponse> {
  const { path, body, init } = params;
  const url = `/v1/users/admin/users/${path.userId}/ban`;
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "POST",
    headers: { "Content-Type": "application/json", ...init?.headers },
    body: JSON.stringify(body)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.BanUserSuccessResponse;
}

export async function unbanUser(params: { path: types.UnbanUserPathParams; init?: RequestInit }): Promise<types.UnbanUserSuccessResponse> {
  const { path, init } = params;
  const url = `/v1/users/admin/users/${path.userId}/unban`;
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "POST"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.UnbanUserSuccessResponse;
}

export async function setUserRole(params: { path: types.SetUserRolePathParams; body: types.SetUserRoleRequestBody; init?: RequestInit }): Promise<types.SetUserRoleSuccessResponse> {
  const { path, body, init } = params;
  const url = `/v1/users/admin/users/${path.userId}/role`;
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "POST",
    headers: { "Content-Type": "application/json", ...init?.headers },
    body: JSON.stringify(body)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.SetUserRoleSuccessResponse;
}

export async function listProblems(params: { query?: types.ListProblemsQueryParams; init?: RequestInit }): Promise<types.ListProblemsSuccessResponse> {
  const { query, init } = params;
  const url = "/v1/problems";
    const searchParams = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.ListProblemsSuccessResponse;
}

export async function createProblem(params: { body: types.CreateProblemRequestBody; init?: RequestInit }): Promise<types.CreateProblemSuccessResponse> {
  const { body, init } = params;
  const url = "/v1/problems/create";
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "POST",
    headers: { "Content-Type": "application/json", ...init?.headers },
    body: JSON.stringify(body)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.CreateProblemSuccessResponse;
}

export async function getProblemByName(params: { path: types.GetProblemByNamePathParams; init?: RequestInit }): Promise<types.GetProblemByNameSuccessResponse> {
  const { path, init } = params;
  const url = `/v1/problems/${path.name}`;
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetProblemByNameSuccessResponse;
}

export async function listTopics(params: { init?: RequestInit }): Promise<types.ListTopicsSuccessResponse> {
  const { init } = params;
  const url = "/v1/problems/topics";
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.ListTopicsSuccessResponse;
}

export async function createTopic(params: { body: types.CreateTopicRequestBody; init?: RequestInit }): Promise<types.CreateTopicSuccessResponse> {
  const { body, init } = params;
  const url = "/v1/problems/topics";
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "POST",
    headers: { "Content-Type": "application/json", ...init?.headers },
    body: JSON.stringify(body)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.CreateTopicSuccessResponse;
}

export async function getTestcases(params: { query?: types.GetTestcasesQueryParams; init?: RequestInit }): Promise<types.GetTestcasesSuccessResponse> {
  const { query, init } = params;
  const url = "/v1/problems/testcases";
    const searchParams = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetTestcasesSuccessResponse;
}

export async function createOrReplaceTestcases(params: { body: types.CreateOrReplaceTestcasesRequestBody; init?: RequestInit }): Promise<types.CreateOrReplaceTestcasesSuccessResponse> {
  const { body, init } = params;
  const url = "/v1/problems/testcases";
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "PUT",
    headers: { "Content-Type": "application/json", ...init?.headers },
    body: JSON.stringify(body)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.CreateOrReplaceTestcasesSuccessResponse;
}

export async function listProblemsWithFiltering(params: { query?: types.ListProblemsWithFilteringQueryParams; init?: RequestInit }): Promise<types.ListProblemsWithFilteringSuccessResponse> {
  const { query, init } = params;
  const url = "/v1/problems/problems";
    const searchParams = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.ListProblemsWithFilteringSuccessResponse;
}

export async function getLanguages(params: { init?: RequestInit }): Promise<types.GetLanguagesSuccessResponse> {
  const { init } = params;
  const url = "/v1/judge/languages";
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetLanguagesSuccessResponse;
}

export async function submitSolution(params: { query?: types.SubmitSolutionQueryParams; body: types.SubmitSolutionRequestBody; init?: RequestInit }): Promise<types.SubmitSolutionSuccessResponse> {
  const { query, body, init } = params;
  const url = "/v1/judge/submit";
    const searchParams = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "POST",
    headers: { "Content-Type": "application/json", ...init?.headers },
    body: JSON.stringify(body)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.SubmitSolutionSuccessResponse;
}

export async function getSubmissionStatus(params: { query?: types.GetSubmissionStatusQueryParams; init?: RequestInit }): Promise<types.GetSubmissionStatusSuccessResponse> {
  const { query, init } = params;
  const url = "/v1/judge/status";
    const searchParams = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetSubmissionStatusSuccessResponse;
}

export async function listChannels(params: { query?: types.ListChannelsQueryParams; init?: RequestInit }): Promise<types.ListChannelsSuccessResponse> {
  const { query, init } = params;
  const url = "/v1/channels";
    const searchParams = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.ListChannelsSuccessResponse;
}

export async function createChannel(params: { body: types.CreateChannelRequestBody; init?: RequestInit }): Promise<types.CreateChannelSuccessResponse> {
  const { body, init } = params;
  const url = "/v1/channels/create";
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "POST",
    headers: { "Content-Type": "application/json", ...init?.headers },
    body: JSON.stringify(body)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.CreateChannelSuccessResponse;
}

export async function getChannelByName(params: { path: types.GetChannelByNamePathParams; init?: RequestInit }): Promise<types.GetChannelByNameSuccessResponse> {
  const { path, init } = params;
  const url = `/v1/channels/${path.channel_name}`;
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetChannelByNameSuccessResponse;
}

export async function getChannelMessages(params: { path: types.GetChannelMessagesPathParams; query?: types.GetChannelMessagesQueryParams; init?: RequestInit }): Promise<types.GetChannelMessagesSuccessResponse> {
  const { path, query, init } = params;
  const url = `/v1/channels/${path.channel_name}/messages`;
    const searchParams = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetChannelMessagesSuccessResponse;
}

export async function listRooms(params: { query?: types.ListRoomsQueryParams; init?: RequestInit }): Promise<types.ListRoomsSuccessResponse> {
  const { query, init } = params;
  const url = "/v1/rooms";
    const searchParams = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.ListRoomsSuccessResponse;
}

export async function createRoom(params: { body: types.CreateRoomRequestBody; init?: RequestInit }): Promise<types.CreateRoomSuccessResponse> {
  const { body, init } = params;
  const url = "/v1/rooms/create";
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "POST",
    headers: { "Content-Type": "application/json", ...init?.headers },
    body: JSON.stringify(body)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.CreateRoomSuccessResponse;
}

export async function getRoomInfo(params: { path: types.GetRoomInfoPathParams; init?: RequestInit }): Promise<types.GetRoomInfoSuccessResponse> {
  const { path, init } = params;
  const url = `/v1/rooms/${path.roomId}/info`;
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetRoomInfoSuccessResponse;
}

export async function getRoomProblems(params: { path: types.GetRoomProblemsPathParams; init?: RequestInit }): Promise<types.GetRoomProblemsSuccessResponse> {
  const { path, init } = params;
  const url = `/v1/rooms/${path.roomId}/problems`;
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetRoomProblemsSuccessResponse;
}

export async function joinRoom(params: { path: types.JoinRoomPathParams; init?: RequestInit }): Promise<types.JoinRoomSuccessResponse> {
  const { path, init } = params;
  const url = `/v1/rooms/${path.roomId}/join`;
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "POST"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.JoinRoomSuccessResponse;
}

export async function leaveRoom(params: { path: types.LeaveRoomPathParams; init?: RequestInit }): Promise<types.LeaveRoomSuccessResponse> {
  const { path, init } = params;
  const url = `/v1/rooms/${path.roomId}/leave`;
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "DELETE"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.LeaveRoomSuccessResponse;
}

export async function getRoomMessages(params: { path: types.GetRoomMessagesPathParams; query?: types.GetRoomMessagesQueryParams; init?: RequestInit }): Promise<types.GetRoomMessagesSuccessResponse> {
  const { path, query, init } = params;
  const url = `/v1/rooms/${path.roomId}/messages`;
    const searchParams = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetRoomMessagesSuccessResponse;
}

export async function askAI(params: { body: types.AskAIRequestBody; init?: RequestInit }): Promise<types.AskAISuccessResponse> {
  const { body, init } = params;
  const url = "/v1/ai/ask";
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "POST",
    headers: { "Content-Type": "application/json", ...init?.headers },
    body: JSON.stringify(body)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.AskAISuccessResponse;
}

export async function generateDescription(params: { body: types.GenerateDescriptionRequestBody; init?: RequestInit }): Promise<types.GenerateDescriptionSuccessResponse> {
  const { body, init } = params;
  const url = "/v1/ai/description";
    const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    ...init,
    method: "POST",
    headers: { "Content-Type": "application/json", ...init?.headers },
    body: JSON.stringify(body)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GenerateDescriptionSuccessResponse;
}

import fetchClient from "../fetchClient";
import type * as types from "./types.js";

export async function listUsers(params: { query?: types.ListUsersQueryParams; init?: RequestInit }): Promise<types.ListUsers200Response> {
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
  
  return response.json() as types.ListUsers200Response;
}

export async function getSocialProviders(params: { init?: RequestInit }): Promise<types.GetSocialProviders200Response> {
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
  
  return response.json() as types.GetSocialProviders200Response;
}

export async function getUserSocialLinks(params: { init?: RequestInit }): Promise<types.GetUserSocialLinks200Response> {
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
  
  return response.json() as types.GetUserSocialLinks200Response;
}

export async function updateUserProfile(params: { body: types.UpdateUserProfileRequestBody; init?: RequestInit }): Promise<types.UpdateUserProfile200Response> {
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
  
  return response.json() as types.UpdateUserProfile200Response;
}

export async function getActiveUsers(params: { init?: RequestInit }): Promise<types.GetActiveUsers200Response> {
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
  
  return response.json() as types.GetActiveUsers200Response;
}

export async function getUserByUsername(params: { path: types.GetUserByUsernamePathParams; init?: RequestInit }): Promise<types.GetUserByUsername200Response> {
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
  
  return response.json() as types.GetUserByUsername200Response;
}

export async function checkUsernameAvailability(params: { path: types.CheckUsernameAvailabilityPathParams; init?: RequestInit }): Promise<types.CheckUsernameAvailability200Response> {
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
  
  return response.json() as types.CheckUsernameAvailability200Response;
}

export async function listUsersWithMetadata(params: { query?: types.ListUsersWithMetadataQueryParams; init?: RequestInit }): Promise<types.ListUsersWithMetadata200Response> {
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
  
  return response.json() as types.ListUsersWithMetadata200Response;
}

export async function getUserWithMetadata(params: { path: types.GetUserWithMetadataPathParams; init?: RequestInit }): Promise<types.GetUserWithMetadata200Response> {
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
  
  return response.json() as types.GetUserWithMetadata200Response;
}

export async function banUser(params: { path: types.BanUserPathParams; body: types.BanUserRequestBody; init?: RequestInit }): Promise<types.BanUser200Response> {
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
  
  return response.json() as types.BanUser200Response;
}

export async function unbanUser(params: { path: types.UnbanUserPathParams; init?: RequestInit }): Promise<types.UnbanUser200Response> {
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
  
  return response.json() as types.UnbanUser200Response;
}

export async function setUserRole(params: { path: types.SetUserRolePathParams; body: types.SetUserRoleRequestBody; init?: RequestInit }): Promise<types.SetUserRole200Response> {
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
  
  return response.json() as types.SetUserRole200Response;
}

export async function listProblems(params: { query?: types.ListProblemsQueryParams; init?: RequestInit }): Promise<types.ListProblems200Response> {
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
  
  return response.json() as types.ListProblems200Response;
}

export async function createProblem(params: { body: types.CreateProblemRequestBody; init?: RequestInit }): Promise<types.CreateProblem201Response> {
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
  
  return response.json() as types.CreateProblem201Response;
}

export async function getProblemByName(params: { path: types.GetProblemByNamePathParams; init?: RequestInit }): Promise<types.GetProblemByName200Response> {
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
  
  return response.json() as types.GetProblemByName200Response;
}

export async function listTopics(params: { init?: RequestInit }): Promise<types.ListTopics200Response> {
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
  
  return response.json() as types.ListTopics200Response;
}

export async function createTopic(params: { body: types.CreateTopicRequestBody; init?: RequestInit }): Promise<types.CreateTopic201Response> {
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
  
  return response.json() as types.CreateTopic201Response;
}

export async function getTestcases(params: { query?: types.GetTestcasesQueryParams; init?: RequestInit }): Promise<types.GetTestcases200Response> {
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
  
  return response.json() as types.GetTestcases200Response;
}

export async function createOrReplaceTestcases(params: { body: types.CreateOrReplaceTestcasesRequestBody; init?: RequestInit }): Promise<types.CreateOrReplaceTestcases201Response> {
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
  
  return response.json() as types.CreateOrReplaceTestcases201Response;
}

export async function listProblemsWithFiltering(params: { query?: types.ListProblemsWithFilteringQueryParams; init?: RequestInit }): Promise<types.ListProblemsWithFiltering200Response> {
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
  
  return response.json() as types.ListProblemsWithFiltering200Response;
}

export async function getLanguages(params: { init?: RequestInit }): Promise<types.GetLanguages200Response> {
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
  
  return response.json() as types.GetLanguages200Response;
}

export async function submitSolution(params: { query?: types.SubmitSolutionQueryParams; body: types.SubmitSolutionRequestBody; init?: RequestInit }): Promise<types.SubmitSolution200Response> {
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
  
  return response.json() as types.SubmitSolution200Response;
}

export async function getSubmissionStatus(params: { query?: types.GetSubmissionStatusQueryParams; init?: RequestInit }): Promise<types.GetSubmissionStatus200Response | types.GetSubmissionStatus206Response> {
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
  
  return response.json() as types.GetSubmissionStatus200Response | types.GetSubmissionStatus206Response;
}

export async function listChannels(params: { query?: types.ListChannelsQueryParams; init?: RequestInit }): Promise<types.ListChannels200Response> {
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
  
  return response.json() as types.ListChannels200Response;
}

export async function createChannel(params: { body: types.CreateChannelRequestBody; init?: RequestInit }): Promise<types.CreateChannel201Response> {
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
  
  return response.json() as types.CreateChannel201Response;
}

export async function getChannelByName(params: { path: types.GetChannelByNamePathParams; init?: RequestInit }): Promise<types.GetChannelByName200Response> {
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
  
  return response.json() as types.GetChannelByName200Response;
}

export async function getChannelMessages(params: { path: types.GetChannelMessagesPathParams; query?: types.GetChannelMessagesQueryParams; init?: RequestInit }): Promise<types.GetChannelMessages200Response> {
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
  
  return response.json() as types.GetChannelMessages200Response;
}

export async function listRooms(params: { query?: types.ListRoomsQueryParams; init?: RequestInit }): Promise<types.ListRooms200Response> {
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
  
  return response.json() as types.ListRooms200Response;
}

export async function createRoom(params: { body: types.CreateRoomRequestBody; init?: RequestInit }): Promise<types.CreateRoom201Response> {
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
  
  return response.json() as types.CreateRoom201Response;
}

export async function getRoomInfo(params: { path: types.GetRoomInfoPathParams; init?: RequestInit }): Promise<types.GetRoomInfo200Response> {
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
  
  return response.json() as types.GetRoomInfo200Response;
}

export async function getRoomProblems(params: { path: types.GetRoomProblemsPathParams; init?: RequestInit }): Promise<types.GetRoomProblems200Response> {
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
  
  return response.json() as types.GetRoomProblems200Response;
}

export async function joinRoom(params: { path: types.JoinRoomPathParams; init?: RequestInit }): Promise<types.JoinRoom201Response> {
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
  
  return response.json() as types.JoinRoom201Response;
}

export async function leaveRoom(params: { path: types.LeaveRoomPathParams; init?: RequestInit }): Promise<types.LeaveRoom200Response> {
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
  
  return response.json() as types.LeaveRoom200Response;
}

export async function getRoomMessages(params: { path: types.GetRoomMessagesPathParams; query?: types.GetRoomMessagesQueryParams; init?: RequestInit }): Promise<types.GetRoomMessages200Response> {
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
  
  return response.json() as types.GetRoomMessages200Response;
}

export async function askAI(params: { body: types.AskAIRequestBody; init?: RequestInit }): Promise<types.AskAI200Response> {
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
  
  return response.json() as types.AskAI200Response;
}

export async function generateDescription(params: { body: types.GenerateDescriptionRequestBody; init?: RequestInit }): Promise<types.GenerateDescription200Response> {
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
  
  return response.json() as types.GenerateDescription200Response;
}

import fetchClient from "../fetchClient";
import type * as types from "./types.js";

export async function ListUsers({ queryParams?: types.ListUsersQueryParams }): Promise<types.ListUsersSuccessResponse> {
  const url = "/v1/users";
  const searchParams = new URLSearchParams();
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetchClient(fullUrl, {
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.ListUsersSuccessResponse;
}

export async function GetSocialProviders(): Promise<types.GetSocialProvidersSuccessResponse> {
  const url = "/v1/users/social/providers";
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetSocialProvidersSuccessResponse;
}

export async function GetUserSocialLinks(): Promise<types.GetUserSocialLinksSuccessResponse> {
  const url = "/v1/users/social";
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetUserSocialLinksSuccessResponse;
}

export async function UpdateUserProfile({ requestBody: types.UpdateUserProfileRequestBody }): Promise<types.UpdateUserProfileSuccessResponse> {
  const url = "/v1/users/update";
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.UpdateUserProfileSuccessResponse;
}

export async function GetActiveUsers(): Promise<types.GetActiveUsersSuccessResponse> {
  const url = "/v1/users/active";
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetActiveUsersSuccessResponse;
}

export async function GetUserByUsername({ pathParams: types.GetUserByUsernamePathParams }): Promise<types.GetUserByUsernameSuccessResponse> {
  const url = `/v1/users/${pathParams.username}`;
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetUserByUsernameSuccessResponse;
}

export async function CheckUsernameAvailability({ pathParams: types.CheckUsernameAvailabilityPathParams }): Promise<types.CheckUsernameAvailabilitySuccessResponse> {
  const url = `/v1/users/${pathParams.username}/available`;
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.CheckUsernameAvailabilitySuccessResponse;
}

export async function ListUsersWithMetadata({ queryParams?: types.ListUsersWithMetadataQueryParams }): Promise<types.ListUsersWithMetadataSuccessResponse> {
  const url = "/v1/users/admin/users";
  const searchParams = new URLSearchParams();
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetchClient(fullUrl, {
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.ListUsersWithMetadataSuccessResponse;
}

export async function GetUserWithMetadata({ pathParams: types.GetUserWithMetadataPathParams }): Promise<types.GetUserWithMetadataSuccessResponse> {
  const url = `/v1/users/admin/users/${pathParams.userId}`;
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetUserWithMetadataSuccessResponse;
}

export async function BanUser({ pathParams: types.BanUserPathParams, requestBody: types.BanUserRequestBody }): Promise<types.BanUserSuccessResponse> {
  const url = `/v1/users/admin/users/${pathParams.userId}/ban`;
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.BanUserSuccessResponse;
}

export async function UnbanUser({ pathParams: types.UnbanUserPathParams }): Promise<types.UnbanUserSuccessResponse> {
  const url = `/v1/users/admin/users/${pathParams.userId}/unban`;
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "POST"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.UnbanUserSuccessResponse;
}

export async function SetUserRole({ pathParams: types.SetUserRolePathParams, requestBody: types.SetUserRoleRequestBody }): Promise<types.SetUserRoleSuccessResponse> {
  const url = `/v1/users/admin/users/${pathParams.userId}/role`;
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.SetUserRoleSuccessResponse;
}

export async function ListProblems({ queryParams?: types.ListProblemsQueryParams }): Promise<types.ListProblemsSuccessResponse> {
  const url = "/v1/problems";
  const searchParams = new URLSearchParams();
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetchClient(fullUrl, {
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.ListProblemsSuccessResponse;
}

export async function CreateProblem({ requestBody: types.CreateProblemRequestBody }): Promise<types.CreateProblemSuccessResponse> {
  const url = "/v1/problems/create";
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.CreateProblemSuccessResponse;
}

export async function GetProblemByName({ pathParams: types.GetProblemByNamePathParams }): Promise<types.GetProblemByNameSuccessResponse> {
  const url = `/v1/problems/${pathParams.name}`;
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetProblemByNameSuccessResponse;
}

export async function ListTopics(): Promise<types.ListTopicsSuccessResponse> {
  const url = "/v1/problems/topics";
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.ListTopicsSuccessResponse;
}

export async function CreateTopic({ requestBody: types.CreateTopicRequestBody }): Promise<types.CreateTopicSuccessResponse> {
  const url = "/v1/problems/topics";
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.CreateTopicSuccessResponse;
}

export async function GetTestcases({ queryParams?: types.GetTestcasesQueryParams }): Promise<types.GetTestcasesSuccessResponse> {
  const url = "/v1/problems/testcases";
  const searchParams = new URLSearchParams();
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetchClient(fullUrl, {
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetTestcasesSuccessResponse;
}

export async function CreateOrReplaceTestcases({ requestBody: types.CreateOrReplaceTestcasesRequestBody }): Promise<types.CreateOrReplaceTestcasesSuccessResponse> {
  const url = "/v1/problems/testcases";
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.CreateOrReplaceTestcasesSuccessResponse;
}

export async function ListProblemsWithFiltering({ queryParams?: types.ListProblemsWithFilteringQueryParams }): Promise<types.ListProblemsWithFilteringSuccessResponse> {
  const url = "/v1/problems/problems";
  const searchParams = new URLSearchParams();
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetchClient(fullUrl, {
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.ListProblemsWithFilteringSuccessResponse;
}

export async function GetLanguages(): Promise<types.GetLanguagesSuccessResponse> {
  const url = "/v1/judge/languages";
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetLanguagesSuccessResponse;
}

export async function SubmitSolution({ queryParams?: types.SubmitSolutionQueryParams, requestBody: types.SubmitSolutionRequestBody }): Promise<types.SubmitSolutionSuccessResponse> {
  const url = "/v1/judge/submit";
  const searchParams = new URLSearchParams();
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetchClient(fullUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.SubmitSolutionSuccessResponse;
}

export async function GetSubmissionStatus({ queryParams?: types.GetSubmissionStatusQueryParams }): Promise<types.GetSubmissionStatusSuccessResponse> {
  const url = "/v1/judge/status";
  const searchParams = new URLSearchParams();
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetchClient(fullUrl, {
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetSubmissionStatusSuccessResponse;
}

export async function ListChannels({ queryParams?: types.ListChannelsQueryParams }): Promise<types.ListChannelsSuccessResponse> {
  const url = "/v1/channels";
  const searchParams = new URLSearchParams();
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetchClient(fullUrl, {
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.ListChannelsSuccessResponse;
}

export async function CreateChannel({ requestBody: types.CreateChannelRequestBody }): Promise<types.CreateChannelSuccessResponse> {
  const url = "/v1/channels/create";
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.CreateChannelSuccessResponse;
}

export async function GetChannelByName({ pathParams: types.GetChannelByNamePathParams }): Promise<types.GetChannelByNameSuccessResponse> {
  const url = `/v1/channels/${pathParams.channel_name}`;
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetChannelByNameSuccessResponse;
}

export async function GetChannelMessages({ pathParams: types.GetChannelMessagesPathParams, queryParams?: types.GetChannelMessagesQueryParams }): Promise<types.GetChannelMessagesSuccessResponse> {
  const url = `/v1/channels/${pathParams.channel_name}/messages`;
  const searchParams = new URLSearchParams();
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetchClient(fullUrl, {
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetChannelMessagesSuccessResponse;
}

export async function ListRooms({ queryParams?: types.ListRoomsQueryParams }): Promise<types.ListRoomsSuccessResponse> {
  const url = "/v1/rooms";
  const searchParams = new URLSearchParams();
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetchClient(fullUrl, {
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.ListRoomsSuccessResponse;
}

export async function CreateRoom({ requestBody: types.CreateRoomRequestBody }): Promise<types.CreateRoomSuccessResponse> {
  const url = "/v1/rooms/create";
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.CreateRoomSuccessResponse;
}

export async function GetRoomInfo({ pathParams: types.GetRoomInfoPathParams }): Promise<types.GetRoomInfoSuccessResponse> {
  const url = `/v1/rooms/${pathParams.roomId}/info`;
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetRoomInfoSuccessResponse;
}

export async function GetRoomProblems({ pathParams: types.GetRoomProblemsPathParams }): Promise<types.GetRoomProblemsSuccessResponse> {
  const url = `/v1/rooms/${pathParams.roomId}/problems`;
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetRoomProblemsSuccessResponse;
}

export async function JoinRoom({ pathParams: types.JoinRoomPathParams }): Promise<types.JoinRoomSuccessResponse> {
  const url = `/v1/rooms/${pathParams.roomId}/join`;
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "POST"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.JoinRoomSuccessResponse;
}

export async function LeaveRoom({ pathParams: types.LeaveRoomPathParams }): Promise<types.LeaveRoomSuccessResponse> {
  const url = `/v1/rooms/${pathParams.roomId}/leave`;
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "DELETE"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.LeaveRoomSuccessResponse;
}

export async function GetRoomMessages({ pathParams: types.GetRoomMessagesPathParams, queryParams?: types.GetRoomMessagesQueryParams }): Promise<types.GetRoomMessagesSuccessResponse> {
  const url = `/v1/rooms/${pathParams.roomId}/messages`;
  const searchParams = new URLSearchParams();
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetchClient(fullUrl, {
    method: "GET"
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GetRoomMessagesSuccessResponse;
}

export async function AskAI({ requestBody: types.AskAIRequestBody }): Promise<types.AskAISuccessResponse> {
  const url = "/v1/ai/ask";
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.AskAISuccessResponse;
}

export async function GenerateDescription({ requestBody: types.GenerateDescriptionRequestBody }): Promise<types.GenerateDescriptionSuccessResponse> {
  const url = "/v1/ai/description";
  const fullUrl = url;

  const response = await fetchClient(fullUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as types.GenerateDescriptionSuccessResponse;
}

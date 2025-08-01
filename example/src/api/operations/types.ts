export interface ListUsersQueryParams {
  page?: string;
  limit?: string;
  search?: string;
  role?: string;
  banned?: string;
  sortBy?: string;
  sortOrder?: string;
}

export type ListUsers200Response = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  image?: string;
  name?: string;
  emailVerified?: boolean;
}[];

export type GetSocialProviders200Response = string[];

export type GetUserSocialLinks200Response = {
  id: string;
  provider: string;
  socialId: string;
  link: string;
}[];

export type UpdateUserProfileRequestBody = {
  name?: string;
  username?: string;
  workplace?: string;
  location?: string;
  bio?: string;
  dob?: string;
  image?: string;
  socialLinks?: {
  provider: string;
  link?: unknown;
}[];
};

export type UpdateUserProfile200Response = {
  id: string;
  name: string;
  username: unknown;
  email: string;
  workplace: unknown;
  location: unknown;
  bio: unknown;
  shouldLoginAgain?: boolean;
};

export type GetActiveUsers200Response = {
  id: string;
  username: string;
  name: string;
  image: unknown;
}[];

export interface GetUserByUsernamePathParams {
  username: string;
}

export type GetUserByUsername200Response = {
  id: string;
  name: string;
  username: unknown;
  email: string;
  image: unknown;
  workplace: unknown;
  location: unknown;
  bio: unknown;
  dob: unknown;
  socialLinks?: {
  id: string;
  provider: string;
  link: string;
}[];
};

export interface CheckUsernameAvailabilityPathParams {
  username: string;
}

export type CheckUsernameAvailability200Response = {
  available: boolean;
};

export interface ListUsersWithMetadataQueryParams {
  page?: string;
  limit?: string;
  search?: string;
  role?: string;
  banned?: string;
  sortBy?: string;
  sortOrder?: string;
}

export type ListUsersWithMetadata200Response = {
  users: {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
  role?: string;
  banned?: boolean;
  banReason?: string;
  banExpires?: string;
  metadata?: {
  username?: string;
  workplace?: string;
  location?: string;
  level?: number;
  bio?: string;
  dob?: string;
  lastUsernameUpdate?: string;
  role?: string;
};
}[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export interface GetUserWithMetadataPathParams {
  userId: string;
}

export type GetUserWithMetadata200Response = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
  role?: string;
  banned?: boolean;
  banReason?: string;
  banExpires?: string;
  metadata?: {
  username?: string;
  workplace?: string;
  location?: string;
  level?: number;
  bio?: string;
  dob?: string;
  lastUsernameUpdate?: string;
  role?: string;
};
};

export interface BanUserPathParams {
  userId: string;
}

export type BanUserRequestBody = {
  reason?: string;
  expiresIn?: number;
  permanent?: boolean;
};

export type BanUser200Response = {
  message: string;
  user: {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
  role?: string;
  banned?: boolean;
  banReason?: string;
  banExpires?: string;
  metadata?: {
  username?: string;
  workplace?: string;
  location?: string;
  level?: number;
  bio?: string;
  dob?: string;
  lastUsernameUpdate?: string;
  role?: string;
};
};
};

export interface UnbanUserPathParams {
  userId: string;
}

export type UnbanUser200Response = {
  message: string;
  user: {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
  role?: string;
  banned?: boolean;
  banReason?: string;
  banExpires?: string;
  metadata?: {
  username?: string;
  workplace?: string;
  location?: string;
  level?: number;
  bio?: string;
  dob?: string;
  lastUsernameUpdate?: string;
  role?: string;
};
};
};

export interface SetUserRolePathParams {
  userId: string;
}

export type SetUserRoleRequestBody = {
  role: string;
};

export type SetUserRole200Response = {
  message: string;
  user: {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
  role?: string;
  banned?: boolean;
  banReason?: string;
  banExpires?: string;
  metadata?: {
  username?: string;
  workplace?: string;
  location?: string;
  level?: number;
  bio?: string;
  dob?: string;
  lastUsernameUpdate?: string;
  role?: string;
};
};
};

export interface ListProblemsQueryParams {
  page?: string;
  limit?: string;
  difficulty?: string;
  topics?: string;
  orderBy?: string;
  contributor?: string;
  order?: string;
}

export type ListProblems200Response = {
  total: number;
  page: number;
  limit: number;
  data: {
  id: number;
  title: string;
  difficulty: string;
  topics: {
  id: number;
  name: string;
}[];
}[];
};

export type CreateProblemRequestBody = {
  title: string;
  description: string;
  difficulty: string;
  topics: {
  id: number;
}[];
  constraints: string;
  fields: {
  name: string;
  type: string;
  dataType: string;
  description?: string;
}[];
  status?: string;
  examples: {
  input: string;
  output: string;
  description?: string;
}[];
  hints?: string[];
  codes: {
  language: string;
  code: string;
  runner: string;
}[];
  solution: {
  language: string;
  code: string;
};
};

export type CreateProblem201Response = {
  id: number;
  title: string;
  difficulty: string;
};

export interface GetProblemByNamePathParams {
  name: string;
}

export type GetProblemByName200Response = {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  constraints: unknown;
  status: string;
  createdAt: unknown;
  updatedAt: unknown;
  createdBy: string;
  examples: {
  input: string;
  output: string;
  explanation?: unknown;
}[];
  testcases: string[];
  codes: {
  id: string;
  language: string;
  code: string;
  runner: string;
}[];
  hints: {
  id: string;
  hint: string;
}[];
  fields: {
  name: string;
  type: string;
  description: unknown;
}[];
  topics: {
  id: number;
  name: string;
}[];
};

export type ListTopics200Response = {
  id: number;
  name: string;
}[];

export type CreateTopicRequestBody = {
  topics: string[];
};

export type CreateTopic201Response = unknown;

export interface GetTestcasesQueryParams {
  problemId: string;
}

export type GetTestcases200Response = {
  problemId: number;
  testcases: {
  input: string;
  expectedOutput: string;
  hidden: boolean;
}[];
};

export type CreateOrReplaceTestcasesRequestBody = {
  testcases: unknown;
  problemId: string;
};

export type CreateOrReplaceTestcases201Response = unknown;

export interface ListProblemsWithFilteringQueryParams {
  page?: string;
  limit?: string;
  status?: string;
  difficulty?: string;
  topics?: string;
  orderBy?: string;
  contributor?: string;
  order?: string;
}

export type ListProblemsWithFiltering200Response = {
  total: number;
  page: number;
  limit: number;
  data: {
  id: number;
  title: string;
  difficulty: string;
  topics: {
  id: number;
  name: string;
}[];
  status: string;
}[];
};

export type GetLanguages200Response = string[];

export interface SubmitSolutionQueryParams {
  problemId: string;
  roomId?: string;
  problemName?: string;
}

export type SubmitSolutionRequestBody = unknown;

export type SubmitSolution200Response = {
  submissionId: string;
};

export interface GetSubmissionStatusQueryParams {
  type: string;
  submissionId: string;
  roomId?: string;
  problemName?: string;
}

export type GetSubmissionStatus200Response = {
  code: string;
  language: string;
  total_memory: unknown;
  total_time: unknown;
  total_testcases: number;
  completed_testcases: number;
  status: {
  id: string;
  message: string;
};
  results: {
  stdin: unknown;
  stderr: unknown;
  stdout: unknown;
  expectedOutput?: string;
  status: {
  id: string;
  message: string;
};
}[];
} & {
  progress: number;
};
export type GetSubmissionStatus206Response = {
  code: string;
  language: string;
  total_memory: unknown;
  total_time: unknown;
  total_testcases: number;
  completed_testcases: number;
  status: {
  id: string;
  message: string;
};
  results: {
  stdin: unknown;
  stderr: unknown;
  stdout: unknown;
  expectedOutput?: string;
  status: {
  id: string;
  message: string;
};
}[];
} & {
  progress: number;
};

export interface ListChannelsQueryParams {
  role?: string;
  includePrivate?: boolean;
}

export type ListChannels200Response = {
  name: string;
  roleRequired: string;
  order: number;
}[];

export type CreateChannelRequestBody = {
  name: string;
  roleRequired?: string;
  order?: number;
};

export type CreateChannel201Response = {
  id: string;
  name: string;
  description: unknown;
  requiredRole: string;
  order: number;
  createdAt: unknown;
  updatedAt: unknown;
};

export interface GetChannelByNamePathParams {
  channel_name: string;
}

export type GetChannelByName200Response = {
  id: string;
  name: string;
  description: unknown;
  requiredRole: string;
  order: number;
  createdAt: unknown;
  updatedAt: unknown;
};

export interface GetChannelMessagesPathParams {
  channel_name: string;
}

export interface GetChannelMessagesQueryParams {
  limit?: string;
  cursor: string;
}

export type GetChannelMessages200Response = {
  total: number;
  limit: number;
  cursor: unknown;
  messages: {
  id: number;
  content: string;
  createdAt: string;
  channel: string;
  createdBy: string;
}[];
  nextCursor: unknown;
};

export interface ListRoomsQueryParams {
  cursor?: string;
  limit?: string;
}

export type ListRooms200Response = {
  id: string;
  name: string;
  createdAt: string;
  createdBy: string;
  isPrivate: boolean;
  difficulty: string;
  players: {
  id: string;
  username: string;
  name: string;
  image: unknown;
}[];
}[];

export type CreateRoomRequestBody = {
  name: string;
  isPrivate?: boolean;
  topics?: string[];
  difficulty?: string;
  settings?: {
  duration?: number;
};
};

export type CreateRoom201Response = {
  roomId: unknown;
};

export interface GetRoomInfoPathParams {
  roomId: string;
}

export type GetRoomInfo200Response = {
  id: string;
  name: string;
  isPrivate: boolean;
  createdBy: string;
  createdAt: string;
  difficulty: string;
  players: {
  id: string;
  name: string;
  email: string;
  image: string;
}[];
};

export interface GetRoomProblemsPathParams {
  roomId: string;
}

export type GetRoomProblems200Response = {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  constraints: unknown;
  status: string;
  createdAt: unknown;
  updatedAt: unknown;
  createdBy: string;
  examples: {
  input: string;
  output: string;
  explanation?: unknown;
}[];
  testcases: string[];
  codes: {
  id: string;
  language: string;
  code: string;
  runner: string;
}[];
  hints: {
  id: string;
  hint: string;
}[];
  fields: {
  name: string;
  type: string;
  description: unknown;
}[];
  topics: {
  id: number;
  name: string;
}[];
}[];

export interface JoinRoomPathParams {
  roomId: string;
}

export type JoinRoom201Response = {
  message: string;
};

export interface LeaveRoomPathParams {
  roomId: string;
}

export type LeaveRoom200Response = unknown;

export interface GetRoomMessagesPathParams {
  roomId: string;
}

export interface GetRoomMessagesQueryParams {
  cursor?: string;
  limit?: string;
}

export type GetRoomMessages200Response = {
  messages: unknown & {
  id: string;
  createdAt: string;
} & {
  userInfo: {
  username: string;
  name: string;
  image: unknown;
};
}[];
  total: number;
  nextCursor: unknown;
  limit: number;
};

export type AskAIRequestBody = {
  question: string;
};

export type AskAI200Response = {
  answer: string;
};

export type GenerateDescriptionRequestBody = {
  text: string;
};

export type GenerateDescription200Response = {
  description: string;
};

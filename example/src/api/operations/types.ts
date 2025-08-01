export interface ListUsersQueryParams {
  page?: string;
  limit?: string;
  search?: string;
  role?: string;
  banned?: string;
  sortBy?: string;
  sortOrder?: string;
}

export type ListUsersSuccessResponse = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  image?: string;
  name?: string;
  emailVerified?: boolean;
}[];
export type ListUsersResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type ListUsersResponse404Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type ListUsersResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type ListUsersResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export type GetSocialProvidersSuccessResponse = string[];

export type GetUserSocialLinksSuccessResponse = {
  id: string;
  provider: string;
  socialId: string;
  link: string;
}[];
export type GetUserSocialLinksResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetUserSocialLinksResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetUserSocialLinksResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetUserSocialLinksResponse404Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetUserSocialLinksResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetUserSocialLinksResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

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

export type UpdateUserProfileSuccessResponse = {
  id: string;
  name: string;
  username: unknown;
  email: string;
  workplace: unknown;
  location: unknown;
  bio: unknown;
  shouldLoginAgain?: boolean;
};
export type UpdateUserProfileResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type UpdateUserProfileResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type UpdateUserProfileResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type UpdateUserProfileResponse409Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type UpdateUserProfileResponse413Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type UpdateUserProfileResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type UpdateUserProfileResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export type GetActiveUsersSuccessResponse = {
  id: string;
  username: string;
  name: string;
  image: unknown;
}[];
export type GetActiveUsersResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetActiveUsersResponse404Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetActiveUsersResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetActiveUsersResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export interface GetUserByUsernamePathParams {
  username: string;
}

export type GetUserByUsernameSuccessResponse = {
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
export type GetUserByUsernameResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetUserByUsernameResponse404Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetUserByUsernameResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetUserByUsernameResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export interface CheckUsernameAvailabilityPathParams {
  username: string;
}

export type CheckUsernameAvailabilitySuccessResponse = {
  available: boolean;
};
export type CheckUsernameAvailabilityResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CheckUsernameAvailabilityResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CheckUsernameAvailabilityResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CheckUsernameAvailabilityResponse404Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CheckUsernameAvailabilityResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CheckUsernameAvailabilityResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
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

export type ListUsersWithMetadataSuccessResponse = {
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
export type ListUsersWithMetadataResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type ListUsersWithMetadataResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type ListUsersWithMetadataResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type ListUsersWithMetadataResponse404Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type ListUsersWithMetadataResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type ListUsersWithMetadataResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export interface GetUserWithMetadataPathParams {
  userId: string;
}

export type GetUserWithMetadataSuccessResponse = {
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
export type GetUserWithMetadataResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetUserWithMetadataResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetUserWithMetadataResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetUserWithMetadataResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetUserWithMetadataResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export interface BanUserPathParams {
  userId: string;
}

export type BanUserRequestBody = {
  reason?: string;
  expiresIn?: number;
  permanent?: boolean;
};

export type BanUserSuccessResponse = {
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
export type BanUserResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type BanUserResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type BanUserResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type BanUserResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type BanUserResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export interface UnbanUserPathParams {
  userId: string;
}

export type UnbanUserSuccessResponse = {
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
export type UnbanUserResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type UnbanUserResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type UnbanUserResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type UnbanUserResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type UnbanUserResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export interface SetUserRolePathParams {
  userId: string;
}

export type SetUserRoleRequestBody = {
  role: string;
};

export type SetUserRoleSuccessResponse = {
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
export type SetUserRoleResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type SetUserRoleResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type SetUserRoleResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type SetUserRoleResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type SetUserRoleResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
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

export type ListProblemsSuccessResponse = {
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
export type ListProblemsResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type ListProblemsResponse404Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type ListProblemsResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type ListProblemsResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
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

export type CreateProblemSuccessResponse = {
  id: number;
  title: string;
  difficulty: string;
};
export type CreateProblemResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateProblemResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateProblemResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateProblemResponse409Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateProblemResponse413Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateProblemResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateProblemResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export interface GetProblemByNamePathParams {
  name: string;
}

export type GetProblemByNameSuccessResponse = {
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

export type ListTopicsSuccessResponse = {
  id: number;
  name: string;
}[];

export type CreateTopicRequestBody = {
  topics: string[];
};

export type CreateTopicResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateTopicResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateTopicResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateTopicResponse409Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateTopicResponse413Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateTopicResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateTopicResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export interface GetTestcasesQueryParams {
  problemId: string;
}

export type GetTestcasesSuccessResponse = {
  problemId: number;
  testcases: {
  input: string;
  expectedOutput: string;
  hidden: boolean;
}[];
};
export type GetTestcasesResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetTestcasesResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetTestcasesResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetTestcasesResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetTestcasesResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export type CreateOrReplaceTestcasesResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateOrReplaceTestcasesResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateOrReplaceTestcasesResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateOrReplaceTestcasesResponse409Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateOrReplaceTestcasesResponse413Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateOrReplaceTestcasesResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateOrReplaceTestcasesResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

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

export type ListProblemsWithFilteringSuccessResponse = {
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
export type ListProblemsWithFilteringResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type ListProblemsWithFilteringResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type ListProblemsWithFilteringResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type ListProblemsWithFilteringResponse404Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type ListProblemsWithFilteringResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type ListProblemsWithFilteringResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export type GetLanguagesSuccessResponse = string[];

export interface SubmitSolutionQueryParams {
  problemId: string;
  roomId?: string;
  problemName?: string;
}

export type SubmitSolutionRequestBody = unknown;

export type SubmitSolutionSuccessResponse = {
  submissionId: string;
};
export type SubmitSolutionResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type SubmitSolutionResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type SubmitSolutionResponse413Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type SubmitSolutionResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type SubmitSolutionResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export interface GetSubmissionStatusQueryParams {
  type: string;
  submissionId: string;
  roomId?: string;
  problemName?: string;
}

export type GetSubmissionStatusSuccessResponse = unknown;
export type GetSubmissionStatusResponse206Response = unknown;
export type GetSubmissionStatusResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetSubmissionStatusResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetSubmissionStatusResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetSubmissionStatusResponse404Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetSubmissionStatusResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetSubmissionStatusResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export interface ListChannelsQueryParams {
  role?: string;
  includePrivate?: boolean;
}

export type ListChannelsSuccessResponse = {
  name: string;
  roleRequired: string;
  order: number;
}[];

export type CreateChannelRequestBody = {
  name: string;
  roleRequired?: string;
  order?: number;
};

export type CreateChannelSuccessResponse = {
  id: string;
  name: string;
  description: unknown;
  requiredRole: string;
  order: number;
  createdAt: unknown;
  updatedAt: unknown;
};
export type CreateChannelResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateChannelResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateChannelResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateChannelResponse409Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateChannelResponse413Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateChannelResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateChannelResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export interface GetChannelByNamePathParams {
  channel_name: string;
}

export type GetChannelByNameSuccessResponse = {
  id: string;
  name: string;
  description: unknown;
  requiredRole: string;
  order: number;
  createdAt: unknown;
  updatedAt: unknown;
};
export type GetChannelByNameResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetChannelByNameResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetChannelByNameResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetChannelByNameResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetChannelByNameResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export interface GetChannelMessagesPathParams {
  channel_name: string;
}

export interface GetChannelMessagesQueryParams {
  limit?: string;
  cursor: string;
}

export type GetChannelMessagesSuccessResponse = {
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
export type GetChannelMessagesResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetChannelMessagesResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetChannelMessagesResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetChannelMessagesResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetChannelMessagesResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export interface ListRoomsQueryParams {
  cursor?: string;
  limit?: string;
}

export type ListRoomsSuccessResponse = {
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
export type ListRoomsResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type ListRoomsResponse404Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type ListRoomsResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type ListRoomsResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export type CreateRoomRequestBody = {
  name: string;
  isPrivate?: boolean;
  topics?: string[];
  difficulty?: string;
  settings?: {
  duration?: number;
};
};

export type CreateRoomSuccessResponse = {
  roomId: unknown;
};
export type CreateRoomResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateRoomResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateRoomResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateRoomResponse409Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateRoomResponse413Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateRoomResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type CreateRoomResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export interface GetRoomInfoPathParams {
  roomId: string;
}

export type GetRoomInfoSuccessResponse = {
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
export type GetRoomInfoResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetRoomInfoResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetRoomInfoResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetRoomInfoResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetRoomInfoResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export interface GetRoomProblemsPathParams {
  roomId: string;
}

export type GetRoomProblemsSuccessResponse = {
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
export type GetRoomProblemsResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetRoomProblemsResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetRoomProblemsResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetRoomProblemsResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetRoomProblemsResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export interface JoinRoomPathParams {
  roomId: string;
}

export type JoinRoomSuccessResponse = {
  message: string;
};
export type JoinRoomResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type JoinRoomResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type JoinRoomResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type JoinRoomResponse409Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type JoinRoomResponse413Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type JoinRoomResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type JoinRoomResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export interface LeaveRoomPathParams {
  roomId: string;
}



export interface GetRoomMessagesPathParams {
  roomId: string;
}

export interface GetRoomMessagesQueryParams {
  cursor?: string;
  limit?: string;
}

export type GetRoomMessagesSuccessResponse = {
  messages: unknown[];
  total: number;
  nextCursor: unknown;
  limit: number;
};
export type GetRoomMessagesResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetRoomMessagesResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetRoomMessagesResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetRoomMessagesResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GetRoomMessagesResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export type AskAIRequestBody = {
  question: string;
};

export type AskAISuccessResponse = {
  answer: string;
};
export type AskAIResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type AskAIResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type AskAIResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type AskAIResponse404Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type AskAIResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type AskAIResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

export type GenerateDescriptionRequestBody = {
  text: string;
};

export type GenerateDescriptionSuccessResponse = {
  description: string;
};
export type GenerateDescriptionResponse400Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GenerateDescriptionResponse401Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GenerateDescriptionResponse403Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GenerateDescriptionResponse404Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GenerateDescriptionResponse429Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};
export type GenerateDescriptionResponse500Response = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  errors?: {
  field: string;
  message: string;
  code?: string;
}[];
};

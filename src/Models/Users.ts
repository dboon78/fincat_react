export type UserProfileToken = {
  userName: string;
  email: string;
  token: string;
  userCurrency: UserCurrency;
};

export type UserProfile = {
  userName: string;
  email: string;
};
export type UserCurrency = {
  code: string;
  symbol: string;
  name: string;
  digits: number;
  value: number;
};

export type UserSettingsPost = {
  currencyCode: string;
};

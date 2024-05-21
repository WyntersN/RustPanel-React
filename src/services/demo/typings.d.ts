/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
  interface UserInfo {
    id?: string;
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
    gender?: UserGenderEnum;
  }

  interface UserInfoVO {
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
  }

  type definitions_0 = null;
}

/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace USER {
  interface UserLoginFrom {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    mobile?: string;
    captcha?: number;
    loginType?: LoginType;
  }

  type MenuType = API.ResponseStructure<{
    menus: {
      name: string;
      path: string;
      component: string;
      icon: string;
      children: any[];
      key: string;
    }[];
  }>;

  type LoginType = 'phone' | 'account';

  interface UpdatePassword {
    oldPassword: string;
    newPassword: string;
    rePassword: string;
  }

  interface UserInfo {
    id?: string;
    name?: string;
    money?: string;
    nickname?: string;
    username?: string;
    email?: string;
    avatar?: string;
    mobile?: string;
    motto?: string;
    token?: string;
    gender?: number;
    refresh_token?: string;
  }

  type UserResult = API.ResponseStructure<{
    adminInfo: UserInfo;
    access: string[];
    settings?: { [key: string]: any };
    menus?: MenuType;
    web_setting: {
      logo: string;
      title: string;
      [key: string]: any;
    };
  }>;

  type LoginResult = API.ResponseStructure<{
    token: string;
    refresh_token: string;
  }>;
}

export const AuthController = {
  join: '/api/auth/join',
  refresh: '/api/auth/refresh',
  checkLogin: '/api/auth/check/login',
  logout: '/api/auth/logout',
  deleteAccount: '/api/auth/delete',
};

export const ProfileController = {
  socialProfile: '/api/common',
  userProfile: '/api/userprofile',
  groomerProfile: '/api/groomerprofile',
  detailGroomerProfile: '/api/groomerprofile/detail',
  dogProfile: '/api/dogprofile',
};

export const ImageController = {
  uploadImage: '/api/images',
};

export const ContestController = {
  rank: '/api/contest/winner-rank',
};

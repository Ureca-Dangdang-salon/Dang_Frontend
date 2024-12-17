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
  rank: '/api/contests/winner/rank',
  contests: '/api/contests',
  payments: '/api/contests/payment',
  posts: '/api/posts',
};

export const HomeController = {
  homegroomerProfile: '/api/groomerprofile/main',
  winnerProfile: '/api/contests/winner/last',
};

export const ReviewController = {
  review: '/api/review',
};

export const RequestController = {
  estimateRequest: '/api/estimaterequest',
  estimate: '/api/estimate',
  estimateDog: '/api/estimate/dogrequest',
};

export const NotificationController = {
  fcmToken: '/api/notification/fcm-token',
  getNotification: '/api/notification/list',
  markRead: '/api/notification/read?uuid=',
  unreadCount: '/api/notification/unread-count',
  markAllRead: '/api/notification/read-all',
  updateSetting: '/api/notification/update',
  subscribe: '/api/notification/subscribe',
  unsubscribe: '/api/notification/unsubscribe',
  isSubscribed: '/api/notification/is-subscribed?topicName=',
};

export const PaymentController = {
  paymentHistory: '/api/payments',
  paymentApprove: '/api/payments/approve',
  paymentCancel: '/api/payments/cancel',
};

export const ChatController = {
  chat: '/api/chatrooms',
  chatServer: '/ws/chat',
};

export const SimulationController = {
  generateImage: '/api/gpt/generate',
};

export const CouponController = {
  validCoupons: '/api/coupons/main', //mainpage
  couponDetail: '/api/coupons',
  myCoupons: '/api/coupons/users',
  issueCoupons: '/api/coupons/issued',
  queue: '/api/coupons/queue/updates',
};

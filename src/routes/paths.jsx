const paths = {
  home: '/home',
  login: '/',
  survey: {
    root: '/survey',
    groomer: '/survey/groomer',
    user: '/survey/user',
    dogProfile: '/survey/newdog',
  },
  contest: '/contest',
  entry: '/contest/entry',
  coupon: '/coupon',
  chat: '/chat',
  chatRoom: '/chat/:id',
  myRequest: '/chat/myrequest',
  myRequestDetail: '/chat/myrequest/:id',
  mypage: '/mypage',
  notification: '/notification',
  newRequest: '/newrequest',
  newReview: '/newreview',
  estimate: '/estimate',
  editEstimate: '/estimate/edit',

  editSocialProfile: '/mypage/editsocialprofile',
  editSalonProfile: '/mypage/editsalonprofile',
  newDogProfile: '/newdogprofile',
  editDogProfile: '/mypage/editDogProfile/:id',
  myCoupons: '/mypage/coupons',
  paymentHistory: '/mypage/paymenthistory',
  myReviews: '/mypage/myreviews',
  requestHistory: '/mypage/requesthistory',
  requestHistoryDetail: '/mypage/requesthistorydetail',

  salonProfile: '/salonprofile/:id',
  contestResult: '/contestresult',
};

export default paths;

const paths = {
  home: '/home',
  login: '/',
  survey: {
    root: '/survey',
    groomer: '/survey/groomer',
    user: '/survey/user',
    dogProfile: '/survey/newdog',
    groomerProfile: '/survey/newgroomer',
  },
  contest: '/contest',
  entry: '/contest/entry',
  coupon: '/coupon',
  simulation: '/simulation',
  chat: '/chat',
  chatRoom: '/chat/:id',
  myRequest: '/chat/myrequest',
  myRequestDetail: '/chat/myrequest/:id',
  mypage: '/mypage',
  notification: '/notification',
  newRequest: '/newrequest',
  newReview: '/newreview',
  editReview: '/editreview/:id',
  estimate: '/estimate',
  editEstimate: '/estimate/edit',

  editSocialProfile: '/mypage/editsocialprofile',
  editSalonProfile: '/mypage/editsalonprofile',
  editDogProfile: '/mypage/editDogProfile/:id',
  myCoupons: '/mypage/coupons',
  paymentHistory: '/mypage/paymenthistory',
  myReviews: '/mypage/myreviews',
  requestHistory: '/mypage/requesthistory',
  requestHistoryDetail: '/mypage/requesthistorydetail',

  salonProfile: '/salonprofile/:id',
  salonReviews: '/salonreviews',
  contestResult: '/contestresult',
};

export default paths;

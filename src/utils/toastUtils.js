import toast from 'react-hot-toast';

export const maxImagesReached = (maxImages) =>
  toast.error(`최대 ${maxImages}장까지 업로드 할 수 있습니다.`);

export const cantGoBack = () =>
  toast.error('이 페이지에서 뒤로가기 할 수 없습니다.');

export const validPhoneNum = (phoneNumber) => {
  const regex = /^\d{3}-\d{4}-\d{4}$/;
  const valid = regex.test(phoneNumber);
  if (!valid) {
    toast.error('전화번호 형식 오류: 000-0000-0000 형식으로 작성해주세요.');
    return false;
  } else return true;
};

export const validDogAge = (year, month) => {
  if (year > 0 || month > 0) return true;
  else {
    toast.error('반려견의 나이를 작성해주세요.');
    return false;
  }
};

export const validFeatures = () => {};

export const isNotZero = (value, field) => {
  if (value == 0) {
    toast.error(`${field} 이/가 0일 수 없습니다.`);
    return false;
  } else return true;
};

export const isNotNull = (item, field) => {
  if (item == null) {
    toast.error(`${field} 을/를 선택해주세요.`);
    return false;
  } else return true;
};

export const stringNotEmpty = (string, field) => {
  if (string === '') {
    toast.error(`${field} 작성/선택 후 저장해주세요.`);
    return false;
  } else return true;
};

export const listNotEmpty = (list, field) => {
  if (list.length == 0) {
    toast.error(`${field}에서 최소 1개의 항목을 추가해주세요.`);
    return false;
  } else return true;
};

import InputText from './InputText';

export default {
  title: 'InputText',
  component: InputText,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export const Default = {
  args: {
    value: '',
    placeholder: '이름을 입력해주세요',
    disabled: false,
  },
};

export const ForStoreName = {
  args: {
    value: '',
    placeholder: '가게 이름을 입력해주세요',
    disabled: false,
  },
};

export const ForPhoneNumber = {
  args: {
    value: '',
    placeholder: '전화번호를 입력해주세요',
    disabled: false,
  },
};

export const ForDogBreed = {
  args: {
    value: '',
    placeholder: '견종을 입력해주세요',
    disabled: false,
  },
};

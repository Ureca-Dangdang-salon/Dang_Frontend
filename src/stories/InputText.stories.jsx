import { useState } from 'react';
import InputText from './InputText';

export default {
  title: 'Components/InputText',
  component: InputText,
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

const Template = (args) => {
  const [value, setValue] = useState(args.value || '');

  return (
    <InputText
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  value: '',
  placeholder: '이름을 입력해주세요',
  disabled: false,
};

export const ForStoreName = Template.bind({});
ForStoreName.args = {
  value: '',
  placeholder: '가게 이름을 입력해주세요',
  disabled: false,
};

export const ForPhoneNumber = Template.bind({});
ForPhoneNumber.args = {
  value: '',
  placeholder: '전화번호를 입력해주세요',
  disabled: false,
};

export const ForDogBreed = Template.bind({});
ForDogBreed.args = {
  value: '',
  placeholder: '견종을 입력해주세요',
  disabled: false,
};

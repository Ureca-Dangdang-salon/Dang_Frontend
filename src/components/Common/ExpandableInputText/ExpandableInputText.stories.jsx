import ExpandableInputText from './ExpandableInputText';

export default {
  title: 'ExpandableInputText',
  component: ExpandableInputText,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
    disabled: { control: 'boolean' },
  },
};

export const Default = {
  args: {
    value: '',
    placeholder: '내용을 입력해주세요',
    rows: 4,
    disabled: false,
  },
};

export const ForServiceDescription = {
  args: {
    value: '',
    placeholder: '서비스 설명을 입력해주세요',
    rows: 4,
    disabled: false,
  },
};

export const ForRecruitment = {
  args: {
    value: '',
    placeholder: '채용 시작 문구를 입력해주세요',
    rows: 4,
    disabled: false,
  },
};

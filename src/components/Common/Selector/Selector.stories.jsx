import { Selector } from './Selector';

export default {
  title: 'Selector',
  component: Selector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const MainSelector = {
  args: {
    label: '견종을 선택해주세요',
    choices: ['골든 리트리버', '저먼 셰퍼드', '치와와', '푸들'],
  },
};

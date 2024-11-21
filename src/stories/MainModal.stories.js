import { MainModal } from './MainModal';

export default {
  title: 'Modal',
  component: MainModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    action: { action: 'clicked' },
  },
};

export const Main = {
  args: {
    openLabel: '삭제',
    buttonColor: 'delete',
    title: '정말 삭제하시겠습니까? 이 과정은 돌이킬 수 없습니다.',
    leftLabel: '취소',
    rightLabel: '삭제',
    action: () => alert('삭제 완료'),
  },
};

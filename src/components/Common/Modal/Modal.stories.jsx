import { Modal } from './Modal';

export default {
  title: 'Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    action: { action: 'clicked' },
  },
};

export const MainModal = {
  args: {
    openModalButton: '삭제',
    buttonColor: 'delete',
    title: '정말 삭제하시겠습니까? 이 과정은 돌이킬 수 없습니다.',
    secondaryButton: '취소',
    primaryButton: '삭제',
    action: () => alert('삭제 완료'),
  },
};

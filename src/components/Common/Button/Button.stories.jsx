import Button from './Button';

export default {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['large', 'medium'],
    },
    backgroundColor: {
      control: 'color', // 색상을 직접 선택 가능
    },
    label: {
      control: 'text', // 텍스트 입력 가능
    },
    onClick: {
      action: 'clicked', // 클릭 이벤트를 Storybook 액션으로 시뮬레이션
    },
  },
};

const Template = (args) => <Button {...args} />;

export const LargeYellow = Template.bind({});
LargeYellow.args = {
  size: 'large',
  backgroundColor: '#FDD94E',
  label: '다음으로',
};

export const MediumGray = Template.bind({});
MediumGray.args = {
  size: 'medium',
  backgroundColor: '#DCDBDC',
  label: '다음으로',
};

export const LargeGray = Template.bind({});
LargeGray.args = {
  size: 'large',
  backgroundColor: '#DCDBDC',
  label: '다음으로',
};

export const MediumYellow = Template.bind({});
MediumYellow.args = {
  size: 'medium',
  backgroundColor: '#FDD94E',
  label: '다음으로',
};

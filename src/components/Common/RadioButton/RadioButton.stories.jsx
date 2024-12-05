import RadioButton from './RadioButton';

export default {
  title: 'RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['large', 'small'],
    },
    selected: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    onChange: { action: 'changed' },
  },
};

const Template = (args) => <RadioButton {...args} />;

export const LargeUnselected = Template.bind({});
LargeUnselected.args = {
  size: 'large',
  selected: false,
  label: '라디오 버튼 선택 전',
};

export const LargeSelected = Template.bind({});
LargeSelected.args = {
  size: 'large',
  selected: true,
  label: '라디오 버튼 선택 후',
};

export const SmallUnselected = Template.bind({});
SmallUnselected.args = {
  size: 'small',
  selected: false,
  label: '선택 전',
};

export const SmallSelected = Template.bind({});
SmallSelected.args = {
  size: 'small',
  selected: true,
  label: '선택 후',
};

import AddButton from './AddButton';

export default {
  title: 'AddButton',
  component: AddButton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['large', 'medium'],
    },
    label: {
      control: 'text',
    },
    onClick: {
      action: 'clicked',
    },
  },
};
const Template = (args) => <AddButton {...args} />;

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: '추가하기',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
  label: '추가하기',
};

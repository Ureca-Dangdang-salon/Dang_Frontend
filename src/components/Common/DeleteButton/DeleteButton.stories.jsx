import DeleteButton from './DeleteButton';

export default {
  title: 'DeleteButton',
  component: DeleteButton,
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

const Template = (args) => <DeleteButton {...args} />;

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: '',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
  label: '',
};

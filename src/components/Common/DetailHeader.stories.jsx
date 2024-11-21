import { DetailHeader } from './DetailHeader';

export default {
  title: 'Header',
  component: DetailHeader,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const Detail = {
  args: {
    label: '회원가입',
  },
};

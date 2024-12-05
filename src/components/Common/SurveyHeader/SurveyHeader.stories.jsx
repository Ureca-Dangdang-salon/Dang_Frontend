import { SurveyHeader } from './SurveyHeader';

export default {
  title: 'Header',
  component: SurveyHeader,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const Survey = {
  args: {
    label: '회원가입',
    totalPage: 5,
    currPage: 2,
  },
};

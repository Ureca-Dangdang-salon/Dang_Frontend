import React from 'react';
import NumberPicker from './NumberPicker';

export default {
  title: 'NumberPicker',
  component: NumberPicker,
  tags: ['autodocs'], // 문서 자동 생성 활성화
  argTypes: {
    value: {
      control: 'number',
      description: '현재 NumberPicker의 값',
      defaultValue: 0,
    },
    min: {
      control: 'number',
      description: '최소값 (사용자가 설정 가능)',
      defaultValue: 0,
    },
    max: {
      control: 'number',
      description: '최대값 (사용자가 설정 가능)',
      defaultValue: 100,
    },
    label: {
      control: 'text',
      description: '값의 단위를 나타내는 텍스트 (ex: 년, 개월, kg 등)',
      defaultValue: '',
    },
    placeholder: {
      control: 'text',
      description: '입력 필드의 플레이스홀더 텍스트',
      defaultValue: '0',
    },
    onChange: {
      action: 'changed',
      description: '값이 변경될 때 실행되는 콜백 함수',
    },
    size: {
      control: 'radio',
      options: ['default', 'small'],
      description:
        'NumberPicker의 크기를 결정합니다. 기본값은 `default`이며, `small`은 더 작은 크기를 제공합니다.',
      defaultValue: 'default',
    },
  },
};

// Decorators: 공통 상태 관리
export const decorators = [
  (Story, context) => {
    const [value, setValue] = React.useState(context.args.value || 0);

    const handleChange = (newValue) => {
      setValue(newValue); // 로컬 상태 업데이트
      if (context.args.onChange) {
        context.args.onChange(newValue); // Action Logger 호출
      }
    };

    React.useEffect(() => {
      // args.value가 변경될 때 상태 동기화
      setValue(context.args.value || 0);
    }, [context.args.value]);

    return <Story {...context.args} value={value} onChange={handleChange} />;
  },
];

/**
 * 스토리: 년
 * NumberPicker를 "년" 단위로 설정
 */
export const Year = (args) => <NumberPicker {...args} />;
Year.args = {
  value: 0,
  min: 0,
  max: 100,
  placeholder: '0',
  label: '년',
};
Year.storyName = 'Year Picker'; // 스토리 이름 설정
Year.parameters = {
  docs: {
    description: {
      story: 'NumberPicker를 "년" 단위로 설정한 스토리입니다.',
    },
  },
};

/**
 * 스토리: 개월
 * NumberPicker를 "개월" 단위로 설정
 */
export const Month = (args) => <NumberPicker {...args} />;
Month.args = {
  value: 0,
  min: 0,
  max: 12,
  placeholder: '0',
  label: '개월',
};
Month.storyName = 'Month Picker';
Month.parameters = {
  docs: {
    description: {
      story: 'NumberPicker를 "개월" 단위로 설정한 스토리입니다.',
    },
  },
};

/**
 * 스토리: kg
 * NumberPicker를 "kg" 단위로 설정
 */
export const Weight = (args) => <NumberPicker {...args} />;
Weight.args = {
  value: 0,
  min: 0,
  max: 300,
  placeholder: '0',
  label: 'kg',
};
Weight.storyName = 'Weight Picker';
Weight.parameters = {
  docs: {
    description: {
      story: 'NumberPicker를 "kg" 단위로 설정한 스토리입니다.',
    },
  },
};

/**
 * 스토리: 시
 * NumberPicker를 "시" 단위로 설정
 */
export const Hour = (args) => <NumberPicker {...args} />;
Hour.args = {
  value: 0,
  min: 0,
  max: 23,
  placeholder: '0',
  label: '시',
};
Hour.storyName = 'Hour Picker';
Hour.parameters = {
  docs: {
    description: {
      story: 'NumberPicker를 "시" 단위로 설정한 스토리입니다.',
    },
  },
};

/**
 * 스토리: 분
 * NumberPicker를 "분" 단위로 설정
 */
export const Minute = (args) => <NumberPicker {...args} />;
Minute.args = {
  value: 0,
  min: 0,
  max: 59,
  placeholder: '0',
  label: '분',
};
Minute.storyName = 'Minute Picker';
Minute.parameters = {
  docs: {
    description: {
      story: 'NumberPicker를 "분" 단위로 설정한 스토리입니다.',
    },
  },
};

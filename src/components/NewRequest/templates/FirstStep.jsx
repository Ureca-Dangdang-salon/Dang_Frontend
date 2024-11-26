import Button from '@components/Common/Button/Button';
import SubTitle from '../atoms/SubTitle';
import PetList from '../modules/PetList';
import usePageStore from '@/store/usePageStore';

const FirstStep = () => {
  const { setNewRequestStep } = usePageStore();

  return (
    <>
      <SubTitle title="요청할 반려견 선택(다중 선택 가능)" />
      <PetList />
      <Button
        label="다음으로"
        size="large"
        backgroundColor=""
        onClick={() => setNewRequestStep(2)}
      />
    </>
  );
};

export default FirstStep;

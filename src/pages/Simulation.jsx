import { generateImage } from '@/api/generateimage';
import { useState } from 'react';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { Box, Typography } from '@mui/material';
import Button from '@components/Common/Button/Button';
import InputText from '@components/Common/InputText/InputText';
import { DogImg } from '@components/Request/modules/SelectDogImg';
import toast from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';

const Simulation = () => {
  const [inputValue, setInputValue] = useState('');
  const [file, setFile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImgChange = (img, imageKey) => {
    setFile(img);
    setImageUrl(imageKey);
  };

  const handleSubmit = async () => {
    if (!inputValue) {
      toast.error('Please enter something before submitting!');
      return;
    }
    if (!file) {
      toast.error('Please select a dog image before submitting!');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('prompt', inputValue);
    formData.append('file', file);

    try {
      const res = await generateImage(formData);
      setResult(res);
      console.log(res);
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error('이미지 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <DetailHeader label="우리 아이 시뮬레이션" />
      <Box p={4} textAlign="center">
        <Box my={3}>
          <Typography fontWeight={700} fontSize={18}>
            현재 강아지의 사진을 고르고 <br />
            원하시는 미용 스타일을 프롬프트에 입력해보세요!
          </Typography>
          <Typography color="secondary" mt={2}>
            TIP: 사진은 강아지의 모습이 잘 나와야 <br />
            가장 정확한 정보를 얻을 수 있습니다.
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center" mt={2}>
          <DogImg
            text="현재 반려견 사진 *"
            handleChange={handleImgChange}
            field="currentImageKey"
            returnFile={true}
            img={imageUrl}
          />
        </Box>

        <Box mt={4}>
          <InputText
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="예: 곰돌이 컷, 하이바 컷"
            disabled={isLoading}
          />
          <Button
            variant="contained"
            backgroundColor="primary"
            label={
              isLoading ? (
                <>
                  생성중
                  <CircularProgress
                    color="gray"
                    size={18}
                    style={{ marginLeft: 8 }}
                  />
                </>
              ) : (
                '확인'
              )
            }
            size="medium"
            onClick={handleSubmit}
            disabled={isLoading}
            style={{ marginTop: 30 }}
          />
          {isLoading && (
            <Typography color="red" fontSize={14} marginY={2}>
              이미지 생성까지 최대 몇분까지 걸릴 수 있습니다. <br />
              잠시만 기다려주세요!
            </Typography>
          )}
        </Box>

        {result && (
          <Box my={4} textAlign="left">
            <Typography fontSize={18} fontWeight={700} my={2}>
              시뮬레이션 결과:
            </Typography>
            <img
              src={result?.imageUrl}
              alt="시뮬레이션 이미지"
              style={{ maxWidth: '100%', borderRadius: '10px' }}
            />
            <Typography my={2}>{result?.analysisResult}</Typography>

            <Box display="flex" alignItems="center">
              <Typography fontSize={18} fontWeight={700} my={2}>
                재미로 보는 닮은 연예인 😎:
              </Typography>
              <Typography ml={2}>{result?.matchingCelebrity}</Typography>
            </Box>

            {result?.celebrityImageUrl && (
              <Box display="flex" justifyContent="center" mt={2}>
                <img
                  src={result.celebrityImageUrl}
                  alt="닮은 연예인"
                  style={{
                    maxWidth: '50%',
                    borderRadius: '10px',
                    margin: 'auto',
                  }}
                />
              </Box>
            )}
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Simulation;

import { Header } from '@components/Common/Header/Header';
import { Typography, Box, Divider, IconButton, Button } from '@mui/material';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import { useNavigate } from 'react-router-dom';

const MySalonPage = () => {
  const navigate = useNavigate();

  const data = {
    name: '홍길동',
    contactHours: '평일 오전 10시 ~ 오후 7시',
    phone: '010-1111-2222',
    serviceType: 'ANY',
    businessNumber: '123-45-67890',
    description:
      '펫살롱 포미는 강아지의 건강과 행복을 우선으로 생각하는 반려견 전문 미용실입니다. 오랜 경력과 다양한 자격을 갖춘 미용사가 고객님의 소중한 반려견에게 맞춤형 미용 서비스를 제공합니다. 피부 상태, 털의 특성, 기질 등을 고려하여 강아지의 스트레스를 최소화하며 편안한 미용 경험을 선사합니다. 기본 미용 외에도 건강 체크와 피부 관리, 맞춤형 스타일링까지 반려견에게 필요한 모든 서비스를 준비해 두었습니다.',
    chatStart:
      '안녕하세요, 펫살롱 포미입니다! 소중한 반려견의 스타일링과 관리를 도와드리겠습니다. 예약이나 상담을 원하시면 말씀해 주세요 😊 반려견의 종, 나이, 성격에 맞춘 세심한 미용을 약속드립니다!',
    address: '서울특별시 강남구 역삼동 123-45',
    faq: 'Question & Answer',
    averageReview: 2.5,
  };
  const totalStars = 5;
  const fullStars = Math.floor(data.averageReview);
  const hasHalfStar = data.averageReview % 1 != 0;
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <Box>
      <Box mt={3}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography fontWeight={700} mr={1}>
            미용사 프로필
          </Typography>
          <Box>
            <Button
              color="n2"
              sx={{ padding: 0, borderRadius: '10px', minWidth: '40px' }}
            >
              수정
            </Button>
            <Button
              color="delete"
              sx={{ padding: 0, borderRadius: '10px', minWidth: '40px' }}
            >
              삭제
            </Button>
          </Box>
        </Box>
        <Box display="flex" gap={7} flexWrap="wrap" mt={1}>
          <Box display="flex" alignItems="center">
            <Box justifyItems="center">
              <img src="/images/default-groomer-profile.png" width="100px" />
              <Typography mt={1} fontWeight={700}>
                {data.name}
              </Typography>
            </Box>
            <Box fontSize={14} ml={3} mr={1} lineHeight={1.7}>
              <text>서비스 이름: </text>
              <br />
              <text>전화번호: </text>
              <br />
              <text>연락 가능 시간: </text>
              <br />
              <text>서비스 지역: </text>
              <br />
              <text>제공 서비스: </text>
              <br />
            </Box>
            <Box fontWeight={600} fontSize={14} lineHeight={1.7}>
              <text>동길이네</text> <br />
              <text>{data.phone}</text>
              <br />
              <text>{data.contactHours}</text>
              <br />
              <text>서울특별시 성동구</text>
              <br />
              <text>목욕, 기본 미용, 발톱관리</text>
              <br />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <img
              key={`full-${index}`}
              src="/icons/StarRounded.png"
              width="30px"
            />
          ))}
        {hasHalfStar && <img src="/icons/StarHalfRounded.png" width="30px" />}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <img
              key={`empty-${index}`}
              src="/icons/StarBorderRounded.png"
              width="30px"
            />
          ))}
        <Typography fontWeight={700} fontSize={20} mx={1}>
          {data.averageReview}
        </Typography>
        <Typography fontWeight={700} color="n3">
          / 5
        </Typography>
      </Box>
      <Box textAlign="center">
        <Button color="n3" sx={{ p: 0, borderRadius: '10px' }}>
          <Typography fontWeight={700} fontSize={14}>
            (리뷰 10개)
          </Typography>
        </Button>
      </Box>

      <Box display="flex" justifyContent="center" textAlign="center" mt={3}>
        <Box
          flexDirection="column"
          sx={{
            cursor: 'pointer',
            '&:hover': { color: 'secondary.main' },
          }}
        >
          <Typography fontSize={14}>견적요청내역</Typography>
          <Typography fontSize={20} fontWeight={600} color="secondary.main">
            5
          </Typography>
        </Box>
      </Box>

      <Box fontSize={14} mt={3} lineHeight={1.7}>
        <text>사업자번호: {data.businessNumber}</text>
        <br />
        <text>가게 위치 정보: {data.address}</text>
        <br />
        <text>경력: 15년 경력 반려동물 전문 미용사</text>
      </Box>

      <Box fontSize={14} mt={3} lineHeight={1.7}>
        <text>자격증:</text>
        <ul style={{ marginLeft: '20px' }}>
          <li>애견미용사 자격증 1급</li>
          <li>반려동물 행동 상담사 2급</li>
          <li>반려견 피부 관리사 자격증</li>
        </ul>
      </Box>

      <Box fontSize={14} mt={3} lineHeight={1.7}>
        <text>서비스 설명:</text>
        <br />
        {data.description}
      </Box>

      <Box fontSize={14} mt={3} lineHeight={1.7}>
        <text>채팅 시작 문구:</text>
        <br />
        {data.chatStart}
      </Box>
    </Box>
  );
};

export default MySalonPage;

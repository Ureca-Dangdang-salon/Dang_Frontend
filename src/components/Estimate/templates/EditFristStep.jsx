import { Box } from '@mui/material';
import Button from '@components/Common/Button/Button';
import SetDesc from '../modules/SetDesc';
import SelectDate from '@components/Request/modules/SelectDate';
import EditSelectDogList from '../modules/EditSelectDogList';
import useEstimateEditStore from '@/store/useEstimateEditStore';
import { putEditEstimateDog } from '@/api/estimate';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import paths from '@/routes/paths';
import useUserStore from '@/store/useUserStore';

const EditFristStep = ({ isValid, estimateId, roomId }) => {
  const Url = import.meta.env.VITE_SOCKET_URL;
  const { estimateEdit, setEstimateEdit, estimateDogPrice } =
    useEstimateEditStore();
  const { role, userId } = useUserStore();
  const navigate = useNavigate();
  const stompClient = useRef(null);

  const setDate = (date) => {
    setEstimateEdit({ date: date });
  };

  const setDesc = (field, value) => {
    setEstimateEdit({ [field]: value });
  };

  const isAllValid = () => {
    const len = estimateEdit?.estimateList.length;
    for (let i = 0; i < len; i++) {
      if (!isValid(i)) {
        return false;
      }
    }
    return true;
  };
  const transDogPriceList = () => {
    const list = estimateDogPrice.map((dog) => ({
      dogProfileId: dog.dogProfileId,
      aggressionCharge: dog.aggressionCharge,
      healthIssueCharge: dog.healthIssueCharge,
      serviceList: dog.serviceList.map((service) => ({
        serviceId: service.serviceId,
        price: service.price,
      })),
    }));
    return list;
  };

  const transSendMessage = () => {
    const list = {
      dogProfileList: estimateEdit.estimateList?.map((dog, idx) => ({
        dogName: dog.dogProfileResponseDto.name,
        servicePriceList: dog.serviceList?.map((service, sIdx) => ({
          serviceId: service.serviceId,
          description: service.description,
          price: estimateDogPrice[idx]?.serviceList[sIdx].price,
        })),
        aggressionCharge: estimateDogPrice[idx]?.aggressionCharge,
        healthIssueCharge: estimateDogPrice[idx]?.healthIssueCharge,
      })),
      totalAmount: estimateEdit.totalAmount,
    };
    return list;
  };

  const handleEstimate = async () => {
    if (isAllValid()) {
      const res = await putEditEstimateDog(
        estimateId,
        estimateEdit,
        transDogPriceList()
      );
      if (res) {
        const sendEstimateMessage = transSendMessage();
        connect(sendEstimateMessage);
      }
    }
  };

  const sendEstimate = (content, sendEstimateMessage) => {
    if (stompClient.current && stompClient.current.connected) {
      const message = {
        roomId: roomId,
        senderId: userId,
        senderRole: role,
        messageText: content,
        sendAt: new Date().toISOString(),
        imageUrl: null,
        estimateInfo: sendEstimateMessage,
      };
      stompClient.current.send(
        `/pub/chat/send/${roomId}`,
        {},
        JSON.stringify(message)
      );
    }
  };

  const connect = async (sendEstimateMessage) => {
    const socket = new SockJS(Url, null, {
      withCredentials: true,
    });
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, () => {
      stompClient.current.subscribe(`/sub/chat/${roomId}`);
      sendEstimate(null, sendEstimateMessage);
      sendEstimate('견적서가 수정되었습니다.', null);
      stompClient.current.disconnect();
      navigate(paths.chatRoom.replace(':id', roomId));
    });
  };

  useEffect(() => {
    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect();
      }
    };
  }, []);

  return (
    <>
      <Box display="flex" flexDirection="column" gap={3} width="100%" pb={8}>
        <SelectDate value={estimateEdit?.date} set={setDate} />
        <EditSelectDogList
          title="반려견 요청 목록"
          selectDogList={estimateEdit?.estimateList}
        />
        <SetDesc info={estimateEdit} set={setDesc} />
      </Box>
      <Button
        label="견적서 수정하기"
        size="large"
        backgroundColor={isAllValid() ? 'primary' : 'n3'}
        onClick={handleEstimate}
      />
    </>
  );
};

export default EditFristStep;

import { Box } from '@mui/material';
import InputText from '@components/Common/InputText/InputText';
import AddButton from '@components/Common/AddButton/AddButton';
import DeleteButton from '@components/Common/DeleteButton/DeleteButton';

const CertificationsForm = ({ certs, setCertifications }) => {
  const handleAddCertification = () => {
    const updatedCertifications = [...certs, ''];
    setCertifications(updatedCertifications);
  };

  const handleRemoveCertification = (index) => {
    const updatedCertifications = certs.filter((_, i) => i !== index);
    setCertifications(updatedCertifications);
  };

  return (
    <>
      {certs.map((cert, index) => (
        <Box key={index} display="flex" gap={1} mb={1.5}>
          <InputText
            size="large"
            placeholder="자격증을 입력해주세요"
            value={cert}
            onChange={(e) => {
              const updatedCertifications = [...certs];
              updatedCertifications[index] = e.target.value;
              setCertifications(updatedCertifications);
            }}
          />
          <DeleteButton
            size="medium"
            label=""
            onClick={() => handleRemoveCertification(index)}
          />
        </Box>
      ))}
      <AddButton
        size="large"
        label="추가하기"
        onClick={handleAddCertification}
      />
    </>
  );
};

export default CertificationsForm;

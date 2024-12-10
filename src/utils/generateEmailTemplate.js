import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const EmailTemplate = `
<!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>댕댕살롱 예약 알림</title>
      </head>
      <body
        style={{
          lineHeight: 1.6,
          color: '#3B3B3B',
          margin: '0 auto',
          padding: '20px',
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFBE9',
            padding: '20px',
            textAlign: 'center',
            borderRadius: '10px 10px 0 0',
          }}
        >
          <h1>🐾 댕댕살롱 예약 알림 🐾</h1>
        </div>
        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '0 0 10px 10px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <p>
              안녕하세요, <strong>{userName}</strong>님!
            </p>
            <p>반려견 미용 예약이 내일 예정되어 있습니다.</p>
          </div>

          <div
            style={{
              backgroundColor: '#FFFBE9',
              border: '1px solid #FDD94E',
              padding: '15px',
              borderRadius: '8px',
              margin: '15px 0',
            }}
          >
            <strong>🕒 예약 일시: {reservationDateTime}</strong>
            <br />
            <br />
            <p>선택 준비사항:</p>
            <ul style={{ marginLeft: '20px' }}>
              <li>건강검진 기록</li>
              <li>반려견 좋아하는 간식 혹은 장난감</li>
              <li>평소 사용하는 리드줄</li>
            </ul>
          </div>
        </div>
      </body>
    </html>
  `;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'email-template.html');
fs.writeFileSync(filePath, EmailTemplate);

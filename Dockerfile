# 베이스 이미지 설정
FROM nginx:latest

# 빌드된 파일 복사
COPY build/ /usr/share/nginx/html

# Nginx 설정 복사 (필요 시 수정)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 컨테이너 실행
CMD ["nginx", "-g", "daemon off;"]
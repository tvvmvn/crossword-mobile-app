# 1. 수정한 코드를 main에 커밋하고 푸시
```zsh
git add .
git commit -m "출시 버전 준비"
git push origin main
```

# 2. 지금 내 위치(main 최신 상태)에 v1.0.0 태그 찍기
```zsh
git tag -a v1.0.0 -m "v1.0.0 첫 출시"
```

# 3. 태그를 깃허브로 푸시 (EAS Workflows 프로덕션 빌드 자동 시작!)
```zsh
git push origin v1.0.0
```
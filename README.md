# Next.JS

### Use ( Zero Install )

`Yarn dev`

<br />

### Yarn Berry

`yarn create next-app —typescript`

`rm -rf .git`

`yarn set version stable`

`yarn plugin import typescript`

`yarn dlx @yarnpkg/sdks vscode`

`yarn`

`yarn dev`

---

### prettier

```javascript
module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  endOfLine: 'auto',
  useTabs: false,
  jsxSingleQuote: true,
  bracketSpacing: true,
  arrowParens: 'always',
};
```

---

### prettierignore

```
dist
reset.css
eslintrc.json
```

---

### gitignore

Zero-Install을 사용하겠다면?

```
.yarn/*
!.yarn/cache
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions
```

Zero-Install을 사용하지 않겠다면?

```
.yarn/*
!.yarn/patches
!.yarn/releases
!.yarn/plugins
!.yarn/sdks
!.yarn/versions
.pnp.*
```

---

### Tailwind

```
yarn add -D tailwindcss postcss autoprefixer
yarn tailwindcss init -p
```

```javascript
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

`styles/globals.css`

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`unknown at rule @tailwindcss(unknownatrules)`

**.vscode folder**

```javascript
// settings.json
"css.customData": [".vscode/css_custom.json"],

//css_custom.json
"version": 1.1,
  "atDirectives": [
    {
      "name": "@tailwind",
      "description": "Use the `@tailwind` directive to insert Tailwind's `base`, `components`, `utilities` and `screens` styles into your CSS.",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#tailwind"
        }
      ]
    },

    ...other
  ]
```

---

### [AWS Deploy, Github Actions](https://blog.doitreviews.com/development/2021-08-13-react-automatic-deploy/)

**`S3 버킷 생성`**

1. 서비스 검색 -> S3
2. 버킷 생성 -> 버킷 이름 지정 -> AWS 리전 지정
3. **이 버킷의 퍼블릭 액세스 차단 설정** -> **모든 퍼블릭 액세스차단 체크해제** -> **경고문구 체크**
4. 버킷 선택 -> 속성탭 -> **정적 웹 사이트 호스팅** 편집
5. **정적 웹 사이트 호스팅 활성화** -> **인덱스문서, 오류문서** -> **index.html**
6. 권한탭 -> **버킷 정책** 편집 -> 아래의 json으로 변경

```js
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "1",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::<YOUR-BUCKET-NAME>/*"
    }
  ]
}
```

7. 버킷 라벨 -> **퍼블릭 액세스 가능** 확인
8. (선택) 버킷에 next export 폴더를 업로드하면 수동으로 배포가 가능하다.

<br />

**`CloudFront 배포등록`**

1. 서비스 검색 -> CloudFront
2. Origin Domain -> S3 버킷 선택
3. **뷰어** -> **뷰어 프로토콜 정책** -> **Redirect HTTP to HTTPS**
4. **허용된 HTTP 방법** -> **GET, HEAD** _or_ **GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE**
5. 생성된 ID 확인

<br />

**`IAM 권한설정`**

1. 서비스 검색 -> IAM
2. 엑세스 관리 -> 사용자
3. 사용자 -> 사용자 추가
4. 사용자 이름 추가 -> 액세스키, 프로그래밍 방식 액세스 체크 -> 다음
5. 기존 정책 직접 연결 -> 정책 필터 검색 -> **S3FullAccess**, **CloudFrontFullAccess** 체크

<br />

**`Github Secret 생성`**

- **AWS_ACCESS_KEY_ID**: 배포를 위해 이번에 생성한 IAM 유저의 Access key ID
- **AWS_REGION**: S3의 region
- **AWS_SECRET_ACCESS_KEY**: 배포를 위해 이번에 생성한 IAM 유저의 Secret access key
- **DEV_AWS_DISTRIBUTION_ID**: CloudFront Distribution Id
- **DEV_AWS_S3_BUCKET**: S3 버킷 이름

![스크린샷 2022-04-10 오전 12 24 12](https://user-images.githubusercontent.com/85790271/162580763-fc7b04dd-bd8a-427a-adad-6e7da89c3883.png)

<br />

**`Gtihub Actions`**

    name: MASTER DEPLOYMENT

    on:
      pull_request: # Pull Request가 발생했을 때
        branches:
          - master # 타겟 브랜치 ( develop, etc.. )
        types: [closed] # 타겟 브랜치에 Pull Request가 Closed 되면 아래의 jobs 실행

    jobs:
      deploy:
        if: github.event.pull_request.merged == true # Pull Request가 Merge 됐을때
        runs-on: ubuntu-latest
        strategy:
          matrix:
            node-versions: [16.x] # Node Version

        steps:
          - name: Checkout source code.
            uses: actions/checkout@v2 # Source를 checkout해서 가져오고

          # - name: Install Dependencies
          # run: yarn # yarn scripts 실행 및 dependency 설치
          # 현재 ZeroInstall 사용중이라 Dependency들을 설치할 필요없음 ( 배포시간 감소 )

          - name: Build
            run: yarn build # yarn build scripts 실행 및 export 실행

          - name: Configure AWS Credentials
            uses: aws-actions/configure-aws-credentials@v1 # AWS Credential 확인 ( Github Secret에 저장된 정보로 )
            with:
              aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }} # Github Secret에 저장된 Access Key
              aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }} # Github Secret에 저장된 Secret Access Key
              aws-region: ${{ secrets.AWS_REGION }} # Github Secret에 저장된 Region

          - name: Deploy to S3
            run: aws s3 sync ./out s3://${{ secrets.DEV_AWS_S3_BUCKET }} --delete # Build 실행 후 생성된 out폴더를 S3에 배포 (--delete 옵션 추가)

          - name: Invalidate CloudFront Cache # CloudFront에 캐시를 갱신하기 위해 invalidation 실행
            run: aws cloudfront create-invalidation --distribution-id ${{secrets.DEV_AWS_DISTRIBUTION_ID}} --paths "/*"

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

### AWS

**`IAM 권한설정, CLI 설정`**

1. 서비스 검색 -> IAM
2. 엑세스 관리 -> 사용자
3. 사용자 -> 사용자 추가
4. 사용자 이름 추가 -> 액세스키, 프로그래밍 방식 액세스 체크 -> 다음
5. 기존 정책 직접 연결 -> 정책 필터 검색 -> S3FullAccess 체크

**`S3 버킷 생성 or 선택`**

1. 속성 -> 정적 웹 사이트 호스팅
2. 인덱스 문서 -> index.html
3. 오류 문서 -> index.html

**`권한`**

```js
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AddPerm",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::<YOUR-BUCKET-NAME>/*"
    }
  ]
}
```

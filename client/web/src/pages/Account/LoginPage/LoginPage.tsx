import InputField from '@/components/account/InputField'

const LoginPage = () => {
  return (
    <div>
      <InputField label="아이디" placeholder="아이디를 입력하세요." />
      <InputField label="비밀번호" placeholder="비밀번호를 입력하세요." />
    </div>
  )
}

export default LoginPage

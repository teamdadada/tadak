import InputField from '@/components/account/InputField'
import LogoImage from '@/assets/images/logo.png'

import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const signupSchema = z
  .object({
    nickname: z
      .string()
      .min(1, ' ')
      .max(10, '닉네임은 10자 이하여야 합니다.')
      .regex(/^[가-힣]+$/, '닉네임은 한글만 입력 가능합니다.'),
    id: z
      .string()
      .min(1, ' ')
      .max(50, '아이디는 50자 이하여야 합니다.')
      .regex(/^[a-zA-Z0-9]+$/, '아이디는 영문과 숫자만 사용 가능합니다.'),
    password: z
      .string()
      .min(1, ' ')
      .max(50, '비밀번호는 50자 이하여아 합니다.'),
    confirm: z.string().min(1, ' '),
  })
  .refine((data) => data.password === data.confirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirm'],
  })

type SignupFormData = z.infer<typeof signupSchema>

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
    defaultValues: {
      nickname: '',
      id: '',
      password: '',
      confirm: '',
    },
  })

  const onSubmit = (data: SignupFormData) => {
    console.log(data)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        <Link to="/main" className="flex justify-center">
          <img src={LogoImage} alt="타닥 로고" className="h-16" />
        </Link>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <InputField
            id="nickname"
            type="text"
            label="닉네임"
            placeholder="닉네임을 입력하세요."
            error={errors.nickname?.message}
            {...register('nickname')}
          />
          <InputField
            id="id"
            type="text"
            label="아이디"
            placeholder="아이디를 입력하세요."
            error={errors.id?.message}
            {...register('id')}
          />
          <InputField
            id="password"
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력하세요."
            error={errors.password?.message}
            {...register('password')}
          />
          <InputField
            id="confirm"
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 한 번 더 입력하세요."
            error={errors.confirm?.message}
            {...register('confirm')}
          />

          <Button
            type="submit"
            className="w-full py-6 rounded-lg bg-tadak-primary hover:bg-tadak-primary shadow-none"
          >
            회원가입
          </Button>
        </form>

        <div className="flex justify-center text-sm text-tadak-dark-gray">
          <p>
            이미 계정이 있다면?{' '}
            <a href="/account/login" className="hover:underline">
              로그인
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage

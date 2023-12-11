'use client'
import Link from 'next/link'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const LoginModal = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      const response = await signIn('username-login', {
        username: id,
        password,
        // redirect: false,
      })
      if (!response?.ok) {
        setMessage('아이디와 비밀번호가 일치하지 않습니다.')
      } else {
        router.replace('/home')
      }
    } catch (err) {
      console.error(err)
      setMessage('아이디와 비밀번호가 일치하지 않습니다.')
    }
  }

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value)
  }

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value)
  }
  return (
    <div className="loginP notLoggedP centered">
      <h2>Log into USports</h2>
      <form onSubmit={onSubmit} action="/api/auth/callback/credentials">
        <div>
          <input
            type="text"
            name="id"
            id="id"
            placeholder="id"
            required
            value={id}
            onChange={onChangeId}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>
        <div>{message}</div>
        <input type="submit" value="Log in" disabled={!id && !password} />
      </form>
      <div className="linkWrap">
        <Link href={'/findPassword'}>Find Password</Link>
        <Link href={'/createAccount'}>Create Account</Link>
      </div>
      <hr />
      <div className="kakaoLogBtn"></div>
    </div>
  )
}

export default LoginModal

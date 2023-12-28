'use client'
import Avatar from '@/components/avatar'
import CateUl from '@/components/cateUl'
import Records from '@/app/(logged)/profile/_component/records'
import Recruits, { Recruit } from '@/components/recruits'
import { Getfetch, Postfetch } from '@/func/fetchCall'
import React, { useEffect, useRef, useState } from 'react'
import { QueryClient, useQuery } from '@tanstack/react-query'
import { getProfileUser } from '../../_lib/getProfileUser'
import { ProfileUserType } from '@/types/types'
import UserAvatar from '@/components/userAvatar'
import Button from '@/components/commonButton'
import { useRecoilState } from 'recoil'
import { UserDetailState } from '@/store/user'
import { RiUserFollowLine, RiUserFollowFill } from 'react-icons/ri'
const Content = ({ accountName }: { accountName: string }) => {
  const [number, setNum] = useState(0)
  const [user, _] = useRecoilState(UserDetailState)
  const [followStatus, setFollowStatus] = useState<string | null>(null)
  const divRef = useRef<HTMLDivElement | null>(null)
  const cateOnclick = (e: React.MouseEvent<HTMLUListElement>) => {
    const num = [...e.currentTarget.children].indexOf(e.target as HTMLLIElement)
    setNum(num)
  }
  const { data, isFetching } = useQuery<ProfileUserType, Object>({
    queryKey: ['profile', accountName],
    queryFn: getProfileUser,
  })
  useEffect(() => {
    ;[...(divRef.current as HTMLDivElement).children].forEach((div, idx) => {
      idx === number
        ? div.classList.add('active')
        : div.classList.remove('active')
    })
  }, [number])
  useEffect(() => {
    console.log(data)
    setFollowStatus(data?.followStatus!)
  }, [data])
  const goFollow = async () => {
    try {
      const res = await Postfetch(`follow/${data?.memberInfo.memberId}`)
      if (res.status === 200) {
        alert('팔로우 신청 완료!')
        setFollowStatus('ACTIVE')
      }
    } catch (error) {}
  }
  const cancelFollow = async () => {
    try {
      const res = await Postfetch(`follow/${data?.memberInfo.memberId}`)
      if (res.status === 200) {
        alert('팔로우 취소 완료')
        setFollowStatus(null)
      }
    } catch (error) {}
  }
  return (
    <>
      <div className="profile_info">
        <div className="inner">
          <UserAvatar
            accountName={accountName}
            image={data?.memberInfo.profileImage!}
          />
          <div className="user_info">
            <h3>{accountName}</h3>
            <p>{data?.memberInfo.email}</p>
          </div>
          {accountName !== user.accountName && (
            <div className="follow">
              {followStatus === 'ACTIVE' ? (
                <Button
                  tailwindStyles="py-0 px-2"
                  theme="black"
                  onClick={cancelFollow}
                >
                  팔로잉취소
                  <RiUserFollowLine />
                </Button>
              ) : followStatus === null ? (
                <Button
                  tailwindStyles="py-0 px-2"
                  theme="blue"
                  onClick={goFollow}
                >
                  팔로우하기
                  <RiUserFollowFill />
                </Button>
              ) : (
                <Button tailwindStyles="py-0 px-2" theme="gray">
                  팔로우대기
                  <RiUserFollowLine />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="profile_contents">
        <CateUl onClick={cateOnclick} categories={['Record', 'Recruit']} />
        <div className="tab_contents" ref={divRef}>
          {number === 0 ? (
            <div className="records">
              <Records accoutName={accountName} />
            </div>
          ) : (
            <div className="recruits">
              <Recruits accoutName={accountName} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Content

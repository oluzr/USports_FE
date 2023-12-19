import Avatar from '@/components/avatar'
import Link from 'next/link'
import React from 'react'
import LogoutBtn from '@/components/logoutBtn'
import ModeToggle from '@/components/modeToggle'
import MypageBtn from '@/components/mypageBtn'
import { GoHomeFill } from 'react-icons/go'
import { FaUserAlt } from 'react-icons/fa'
import { MdExplore } from 'react-icons/md'
import { IoMail, IoNotifications } from 'react-icons/io5'
import { IoMdSettings } from 'react-icons/io'
import WritingBtn from '@/components/writingBtn'
import { cookies } from 'next/headers'
import RoleChange from '@/components/roleChange'
import UserProfile from '@/components/user_profile'
const Header = () => {
  const navList = [
    {
      href: '/',
      title: 'home',
      icon: <GoHomeFill />,
    },
    {
      href: '/explore',
      title: 'Explore',
      icon: <MdExplore />,
    },
    {
      href: '/notifications',
      title: 'Notifications',
      icon: <IoNotifications />,
    },
    {
      href: '/messages',
      title: 'Messages',
      icon: <IoMail />,
    },
    {
      href: '/profile',
      title: 'Profile',
      icon: <FaUserAlt />,
    },
    {
      href: '/mypage',
      title: 'Mypage',
      icon: <IoMdSettings />,
    },
  ]
  return (
    <header id="header">
      <RoleChange />
      <div className="head_inner">
        <UserProfile />
        <nav>
          <ul>
            {navList.map((cate, idx) => {
              return (
                <li key={idx}>
                  <Link href={cate.href}>
                    <span>
                      {cate.icon}
                      {cate.title}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="iconWrap bg-primary">
          <ModeToggle />
          <LogoutBtn />
          <MypageBtn />
          <WritingBtn />
        </div>
      </div>
    </header>
  )
}

export default Header

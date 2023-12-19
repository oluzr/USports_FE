import { atom } from 'recoil'
const token = localStorage.getItem('usportsAccessToekn')
export const UserState = atom({
  key: 'userState',
  default: {
    id: '0',
    name: '',
    email: '',
    profileImage: 'https://via.placeholder.com/200',
    accessToken: token || '',
  },
})
export const UserDetailState = atom({
  key: 'userDetailState',
  default: {
    member: {
      accountName: '',
      activeRegion: '',
      // interestedSports: [''],
      attributes: {},
      authorities: [
        {
          authority: '',
        },
      ],
      birthDate: '',
      email: '',
      emailAuthAt: '2023-12-18T09:39:45.148Z',
      enabled: true,
      evaluationCount: 0,
      gender: '',
      kindnessScore: 0,
      loginBy: '',
      mannerScore: 0,
      memberId: 0,
      name: '',
      passionScore: 0,
      password: '',
      phoneNumber: '',
      profileImage: '',
      profileOpen: true,
      registeredAt: '2023-12-18T09:39:45.148Z',
      role: 'U',
      teamworkScore: 0,
      updatedAt: '2023-12-18T09:39:45.148Z',
      username: '',
    },
    tokenDto: {
      accessToken: '',
      refreshToken: '',
      tokenType: '',
    },
    interestSportsList: [0],
  },
})

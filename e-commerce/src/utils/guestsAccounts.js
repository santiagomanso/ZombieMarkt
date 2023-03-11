export const guestAccounts = () => {
  const accounts = [
    {
      id: 1,
      email: 'user1@test.com',
      password: '123456',
    },
    {
      id: 2,
      email: 'commentPolice@police.com',
      password: '123456',
    },
    {
      id: 3,
      email: 'toxicUser@test.com',
      password: '123456',
    },
    {
      id: 4,
      email: 'pickyUser@test.com',
      password: '123456',
    },
    {
      id: 5,
      email: 'user2@test.com',
      password: '123456',
    },
    {
      id: 6,
      email: 'user3@test.com',
      password: '123456',
    },
    {
      id: 7,
      email: 'user4@test.com',
      password: '123456',
    },
    {
      id: 8,
      email: 'user5@test.com',
      password: '123456',
    },
    {
      id: 1,
      email: 'commentPolice@test.com',
      password: '123456',
    },
    {
      id: 9,
      email: 'pickyUser@test.com',
      password: '123456',
    },
    {
      id: 10,
      email: 'guest@guest.com',
      password: '123456',
    },
    {
      id: 11,
      email: 'user7@test.com',
      password: '123456',
    },
    {
      id: 12,
      email: 'user7@test.com',
      password: '123456',
    },
    {
      id: 13,
      email: 'user3@test.com',
      password: '123456',
    },
  ]

  return accounts[Math.floor(Math.random() * accounts.length)]
}

export const guestAccounts = () => {
  const accounts = [
    {
      id: 1,
      email: 'user1@test.com',
      password: '123456',
    },
    {
      id: 1,
      email: 'commentPolice@police.com',
      password: '123456',
    },
    {
      id: 1,
      email: 'toxicUser@test.com',
      password: '123456',
    },
    {
      id: 1,
      email: 'pickyUser@test.com',
      password: '123456',
    },
    {
      id: 1,
      email: 'user2@test.com',
      password: '123456',
    },
    {
      id: 1,
      email: 'user3@test.com',
      password: '123456',
    },
    {
      id: 1,
      email: 'user4@test.com',
      password: '123456',
    },
    {
      id: 1,
      email: 'user5@test.com',
      password: '123456',
    },
    {
      id: 1,
      email: 'commentPolice@test.com',
      password: '123456',
    },
    {
      id: 1,
      email: 'pickyUser@test.com',
      password: '123456',
    },
    {
      id: 1,
      email: 'guest@guest.com',
      password: '123456',
    },
    {
      id: 1,
      email: 'user7@test.com',
      password: '123456',
    },
    {
      id: 1,
      email: 'user7@test.com',
      password: '123456',
    },
    {
      id: 1,
      email: 'user3@test.com',
      password: '123456',
    },
  ]

  return accounts[Math.floor(Math.random() * accounts.length)]
}

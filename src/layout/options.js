
const options = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    leftIcon: 'user',
  },
  {
    key: 'cek',
    label: 'Menu tiga',
    leftIcon: 'user',
  },
  {
    key: 'balik',
    label: 'Test Balik',
    leftIcon: 'user',
  },
  {
    key: 'maintain',
    label: 'Maintain',
    leftIcon: 'team',
    children: [
      {
        key: 'nav1',
        label: 'Nav 1'
      },
      {
        key: 'nav2',
        label: 'Nav 2'
      },
    ],
  },
];
export default options;

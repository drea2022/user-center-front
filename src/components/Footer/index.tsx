import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
const Footer: React.FC = () => {
  const defaultMessage = '旭辉出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: '豫ICP备2023016802号-1',
          title: '豫ICP备2023016802号-1',
          href: 'https://beian.miit.gov.cn/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/drea2022?tab=repositories',
          blankTarget: true,
        },
        {
          key: '春之虎帝',
          title: '春之虎帝',
          href: 'https://www.douyu.com/',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;

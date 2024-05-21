import { DefaultFooter } from '@ant-design/pro-components';

export default () => {
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${'Yi'}`}
    />
  );
};

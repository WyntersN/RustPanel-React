import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  GithubFilled,
} from '@ant-design/icons';

import { SelectLang } from '@umijs/max';
import { useState } from 'react';

type Props = {
  isMobile?: boolean;
};

const FullScreen = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  return (
    <div
      className="flex items-center justify-center"
      title={fullscreen ? '退出全屏' : '全屏显示'}
      onClick={() => {
        /* 获取 documentElement (<html>) 以全屏显示页面 */
        let elem = document.documentElement;
        /* 全屏查看 */
        if (document.fullscreenElement) {
          setFullscreen(false);
          document.exitFullscreen();
        } else {
          setFullscreen(true);
          elem.requestFullscreen();
        }
      }}
    >
      {fullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
    </div>
  );
};

//以下此均不得进行修改
export default (props: Props) => {
  if (props.isMobile) return [];
  if (typeof window === 'undefined') return [];
  return [
    <span key="version">V0.0.1</span>,
    <FullScreen key="FullScreen" />,
    <SelectLang style={{ padding: 4 }} key="SelectLang" />,
    <a  key="GithubFilled" href="https://github.com/WyntersN/RustPanel" target="_blank" rel="noreferrer"><GithubFilled /></a>,
  ];
};

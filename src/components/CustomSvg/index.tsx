import Icon from '@ant-design/icons';
import * as svg from './svg'; // 确保路径正确

const getSvgComponent = (icon: string) => {
  const icons: any = {
    dir: svg.dir,
    php: svg.php,
    sql: svg.sql,
    db: svg.db,
    db2: svg.db,
    db3: svg.db,
    python: svg.python,
    py: svg.python,
    c: svg.c,
    cpp: svg.cpp,
    java: svg.java,
    png: svg.png,
    jpg: svg.jpg,
    jpeg: svg.jpg,
    html: svg.html,
    htm: svg.html,
    css: svg.css,
    js: svg.js,
    ts: svg.ts,
    json: svg.json,
    xml:svg.xml,
    txt: svg.txt,
    yaml: svg.yaml,
    yml: svg.yaml,
    go: svg.go,
    exe:svg.exe,
   // ini:svg.ini,
    z7: svg.z7,
    zip: svg.zip,
    rar: svg.rar,
    '7z': svg.z7,
    tar: svg.tar,
    log:svg.log,
   
  };

  return icons[icon] || svg.file;
};

const CustomIcon = (props: any) => {
  // 如果 props 中没有传递 width 属性，则使用默认值
  const style = props.style || { fontSize: '32px' };

  return (
    <Icon component={getSvgComponent(props.icon)} {...props} style={style} />
  );
};

export default CustomIcon;

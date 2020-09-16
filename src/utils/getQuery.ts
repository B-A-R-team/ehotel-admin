import { useHistory } from 'react-router-dom';

/**
 * 获取url中的query
 * @param name 参数名
 * @param reg 参数值需要匹配的正则
 */
export default function (name: string, reg: RegExp) {
  const h = useHistory();
  const { search } = h.location;
  const queryArr = search.slice(search.indexOf('?') + 1).split('=');
  if (queryArr[0] === name && reg.test(queryArr[1])) {
    return queryArr[1];
  } else {
    return '';
  }
}

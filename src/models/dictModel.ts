/*
 * @Descripttion: 
 * @version: 
 * @Author: Wynters
 * @Date: 2024-05-12 14:13:03
 * @LastEditTime: 2024-05-12 14:31:47
 * @FilePath: \UmiMax\src\models\dictModel.ts
 */
// 全局共享数据示例
import { gitDict } from '@/services/admin/system';
import { useEffect, useState } from 'react';

interface DictItem {
  label: string;
  value: string;
  type?: 'badge' | 'tag';
  status?: 'success' | 'error' | 'default' | 'processing' | 'warning';
}

interface DictDate {
  code: string;
  name: string;
  type?: number;
  dictItems: DictItem[];
}

const useDict = () => {
  const [dictionaryCache, setDictionaryCache] = useState<
    Map<string, DictItem[]>
  >(new Map());

  /**
   * 格式化字典
   * @param data
   */
  const setDictJson = (data: DictDate[]): Map<string, DictItem[]> => {
    let dictMap: Map<string, DictItem[]> = new Map();
    // data.forEach((dict: DictDate) => {
    //   dictMap.set(
    //     dict.code,
    //     dict.dictItems.map((a) => Object.assign(a, { type: dict.type })),
    //   );
    // });
    return dictMap;
  };

  /**
   * 通过键值获取字典
   * @param key
   */
  const getDictionaryData = (key: string): DictItem[] => {
    if (!dictionaryCache.size && localStorage.getItem('dictMap')) {
      setDictionaryCache(
        setDictJson(JSON.parse(localStorage.getItem('dictMap')!)),
      );
    }
    return dictionaryCache.has(key) ? dictionaryCache.get(key)! : [];
  };

  const refreshDict = () => {
    gitDict().then((res) => {
      let { success, data } = res;
      if (success) {
        localStorage.setItem('dictMap', JSON.stringify(data));
        setDictionaryCache(setDictJson(data));
      }
    });
  };

  useEffect(() => {
    let token = localStorage.getItem('token');
    const dictMap = localStorage.getItem('dictMap');
    if (token) {
      if (dictMap) {
        setDictionaryCache(setDictJson(JSON.parse(dictMap)));
      } else {
        refreshDict();
      }
    }
  }, []);

  return {
    refreshDict,
    getDictionaryData,
  };
};

export default useDict;

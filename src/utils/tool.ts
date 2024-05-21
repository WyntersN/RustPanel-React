/*
 * @Descripttion: 
 * @version: 
 * @Author: Wynters
 * @Date: 2024-05-17 20:22:24
 * @LastEditTime: 2024-05-20 17:24:27
 * @FilePath: \umi-rust-panel\src\utils\tool.ts
 */
import * as CryptoJs from "crypto-js";
interface Tool {
  dateNumFormat(time?: number, format?: string): string;
  bytesAuto(bytes: number, partition?: string): string;
  md5(str: string): string;
  sha1(str: string): string;
  sha256(str: string): string;
  sm4Login(str: string,key:string,iv:string): string;
  sm4FileDecrypt(str:string): string;
  sm4FileEncrypt(str:string): string;
}

const tool: Tool = {
  dateNumFormat: function (
    time: number = 0,
    format: string = 'yyyy-MM-dd hh:mm:ss',
  ): string {
    const t = new Date(time.toString().length === 13 ? time : time * 1000);
    const tf = function (i: number): string {
      return (i < 10 ? '0' : '') + i;
    };
    return format.replace(/yyyy|MM|dd|hh|mm|ss/g, function (a: string) {
      switch (a) {
        case 'yyyy':
          return tf(t.getFullYear());
        case 'MM':
          return tf(t.getMonth() + 1);
        case 'mm':
          return tf(t.getMinutes());
        case 'dd':
          return tf(t.getDate());
        case 'hh':
          return tf(t.getHours());
        case 'ss':
          return tf(t.getSeconds());
        default:
          return '';
      }
    });
  },
  bytesAuto: function (bytes: number, partition: string = ' '): string {
    if (bytes < 1024) {
      return bytes + ' B';
    } else if (bytes < 1048576) {
      return (bytes / 1024).toFixed(2) + partition + 'KB';
    } else if (bytes < 1073741824) {
      return (bytes / 1048576).toFixed(2) + partition + ' MB';
    } else if (bytes < 1099511627776) {
      return (bytes / 1073741824).toFixed(2) + partition + ' GB';
    } else {
      return (bytes / 1099511627776).toFixed(2) + partition + ' TB';
    }
  },
  md5(str) {
    return CryptoJs.MD5(str).toString();
  },
  sha1(str) {
    return CryptoJs.SHA1(str).toString();
  },
  sha256(str) {
    return CryptoJs.SHA256(str).toString();
  },
  sm4Login(str,key,iv){
    let IV = this.md5(iv)
    
    return require('sm-crypto').sm4.encrypt(str, this.md5(key+IV),{mode:'cbc',iv:IV})
  },
  sm4FileDecrypt(str){
    let key = this.md5("01b394cebf636ef53fe44c46a10abea2f54f60e6")
    return require('sm-crypto').sm4.decrypt(str, key,{mode:'cbc',iv:key})
  },
  sm4FileEncrypt(str){
    let key = this.md5("01b394cebf636ef53fe44c46a10abea2f54f60e6")
    return require('sm-crypto').sm4.encrypt(str, key,{mode:'cbc',iv:key})
  }

};
export default tool;

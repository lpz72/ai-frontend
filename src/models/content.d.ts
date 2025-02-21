/**
 * 识别结果类别
 */
export type ContentType = {
  id: number;
  content: string;
  type: string;
  createTime: Date;
  modifyTime: Date;
  isDeleted: number;
  userId:number
};
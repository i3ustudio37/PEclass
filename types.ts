export interface StudentRecord {
  '序號'?: string;
  '學生系所年級': string;
  '學號': string;
  '姓名': string;
  '請假'?: string;
  '未請假'?: string;
  '缺席'?: string;
  '平時分'?: string;
  '球類'?: string;
  '游泳'?: string;
  '跑步'?: string;
  '總分'?: string;
  [key: string]: string | undefined; // Allow for other columns or trailing commas
}

export type ParseResult = {
  data: StudentRecord[];
  errors: any[];
  meta: any;
}
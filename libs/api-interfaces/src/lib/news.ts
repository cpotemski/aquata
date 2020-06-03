export class News {
  id: string;
  userId: string;
  type: NewsTypeEnum;
  title: String;
  text: String;
}

enum NewsTypeEnum {
  FLEET= 'FLEET',
  FIGHT= 'FIGHT',
  SCAN= 'SCAN',
}

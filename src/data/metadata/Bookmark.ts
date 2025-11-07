/**
 * 书签类，用于存储和管理书签信息
 * 
 * @class Bookmark
 * @description 表示一个书签对象，包含位置、尺寸、文本等属性
 */
export class Bookmark {
  /** 书签的唯一标识符 */
  id: number = 0;

  /** 书签的 X 坐标位置 */
  x: number = 0;

  /** 书签的 Y 坐标位置 */
  y: number = 0;

  /** 书签的宽度，默认值为 512 */
  width: number = 512;

  /** 书签的高度，默认值为 512 */
  height: number = 512;

  /** 书签显示的文本内容，默认为"标签" */
  text: string = "标签";

  /** 书签关联的视图对象 */
  view: any = null; // Consider specifying a type for 'view' if possible

  /** 书签的类型标识，固定为 "Bookmark" */
  type: string = "Bookmark";

  /** 书签视图对象 */
  bookmarkView: any = null; // Consider specifying a type for 'bookmarkView' if possible

  /**
   * 创建书签实例
   * 
   * @constructor
   * @description 初始化书签对象，所有属性都有默认值
   */
  constructor() {
    // Since all properties have default values, the constructor can be omitted.
    // If you need to initialize with different values, you can add parameters here.
  }
}


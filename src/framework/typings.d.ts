declare module "*.html" {
  const content: string;
  export default content;
}


declare module "*.scss" {
  const content: Array<any>;
  export default content[0][0];
}

declare module "*.html"
declare module "*.yml"
declare module "*.ttf"
declare module "*.woff2"
// declare module "*.jpg"
// declare module "*.png"
{
  const content: string
  export default content
}

/**
 * ref: https://stackoverflow.com/a/45887328/9422455
 */
declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

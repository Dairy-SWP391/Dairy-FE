declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module "*.svg" {
  import React from "react";
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
  const src: string;
  export default src;
}

declare module "*.webp" {
  const ref: string;
  export default ref;
}

declare module "*.jpg";

declare module "*.png";

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

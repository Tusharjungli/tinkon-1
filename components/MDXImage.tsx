import Image, { ImageProps } from "next/image";

type MDXImageProps = ImageProps & {
  className?: string;
};

export default function MDXImage({
  src,
  alt = "",
  width = 900,
  height = 500,
  className = "",
  ...rest
}: MDXImageProps) {
  return (
    <div className="relative my-6 w-full">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`rounded-xl shadow-lg ${className}`}
        {...rest}
      />
    </div>
  );
}
import Image from "next/image";

export default function MDXImage(props: any) {
  const {
    src,
    alt = "",
    width = 900,
    height = 500,
    className = "",
    ...rest
  } = props;

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

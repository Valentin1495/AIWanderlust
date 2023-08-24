type LoaderProps = {
  width?: string;
  height?: string;
};

export default function Loader({
  width = 'w-10',
  height = 'h-10',
}: LoaderProps) {
  return <div className={`loader ${width} ${height}`}></div>;
}

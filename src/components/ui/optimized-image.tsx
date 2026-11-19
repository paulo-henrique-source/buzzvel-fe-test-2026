import { getImageProps, type ImageProps } from 'next/image';

type OptimizedImageProps = Pick<
  ImageProps,
  'src' | 'alt' | 'width' | 'height' | 'fill' | 'sizes' | 'className' | 'quality'
>;

export function OptimizedImage(props: OptimizedImageProps) {
  const { props: imageProps } = getImageProps(props);

  // Next generates optimized image attributes on the server; no client image state is needed.
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...imageProps} />;
}

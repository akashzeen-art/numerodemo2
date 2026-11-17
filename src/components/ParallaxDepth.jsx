/** Decorative soft blobs that drift with scroll for section depth */
export default function ParallaxDepth({ variant = 'default' }) {
  if (variant === 'hero') {
    return (
      <div className="parallax-depth" aria-hidden="true">
        <div className="parallax-blob mint b1" data-parallax="0.22" data-parallax-x="-0.15" />
        <div className="parallax-blob violet b2" data-parallax="0.14" data-parallax-x="0.2" />
        <div className="parallax-blob peach b3" data-parallax="0.28" />
      </div>
    )
  }

  return (
    <div className="parallax-depth" aria-hidden="true">
      <div className="parallax-blob mint b1" data-parallax="0.16" data-parallax-x="-0.1" />
      <div className="parallax-blob violet b2" data-parallax="0.12" data-parallax-x="0.12" />
    </div>
  )
}

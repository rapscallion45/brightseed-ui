export default function RecentWorksIntro() {
  return (
    <section className="agency-work-showcase" aria-label="Selected project previews">
      <img
        src="/img/layers/phone-collage-sm-draft.jpg"
        width="1500"
        height="863"
        loading="lazy"
        decoding="async"
        alt="Collage of brightseed website designs and application interfaces"
      />
      <div id="layout-collage-fullwidth-bottom" className="agency-work-divider" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" width="100%" preserveAspectRatio="none" focusable="false">
          <path d="M0,288L80,288C160,288,320,288,480,272C640,256,800,224,960,176C1120,128,1280,64,1360,32L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
        </svg>
      </div>
    </section>
  );
}

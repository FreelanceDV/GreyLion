import FooterLegalLinks from './FooterLegalLinks';
import FooterSocialLinks from './FooterSocialLinks';

export default function FooterBottomBar() {
  return (
    <section className="grid grid-cols-[1fr_auto_auto] gap-[24px] items-center pt-[23px] border-t border-[rgba(125,185,241,0.2)] max-[900px]:grid-cols-1 max-[900px]:gap-[16px]">
      <p className="text-[11px]">© 2026 GreyLion Maritime S.A. Todos los derechos reservados.</p>
      <FooterLegalLinks />
      <FooterSocialLinks />
    </section>
  );
}

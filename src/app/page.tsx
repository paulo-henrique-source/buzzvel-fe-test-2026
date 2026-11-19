import { SiteHeader } from '@/src/components/layout/site-header';
import { SiteFooter } from '@/src/components/layout/site-footer';
import { HeroSection } from '@/src/components/sections/hero-section';
import { CourseCategories } from '@/src/components/sections/course-categories';
import { FeaturedCourse } from '@/src/components/sections/featured-course';
import { HowItWorks } from '@/src/components/sections/how-it-works';
import { TestimonialSection } from '@/src/components/sections/testimonial-section';
import { CommunitySection } from '@/src/components/sections/community-section';
import { ContactSection } from '@/src/components/sections/contact-section';
import { FinalCta } from '@/src/components/sections/final-cta';

export default function HomePage() {
  return (
    <>
      <a
        href="#main-content"
        className="skip-link fixed top-3 left-3 z-100 -translate-y-[180%] rounded-lg bg-ink px-5 py-3 font-semibold text-white focus:translate-y-0"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <CourseCategories />
        <FeaturedCourse />
        <HowItWorks />
        <TestimonialSection />
        <CommunitySection />
        <ContactSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}

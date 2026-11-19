import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HeroSection } from '@/src/components/sections/hero-section';
import { CourseCategories } from '@/src/components/sections/course-categories';
import { FeaturedCourse } from '@/src/components/sections/featured-course';
import { HowItWorks } from '@/src/components/sections/how-it-works';
import { TestimonialSection } from '@/src/components/sections/testimonial-section';
import { CommunitySection } from '@/src/components/sections/community-section';
import { ContactSection } from '@/src/components/sections/contact-section';
import { FinalCta } from '@/src/components/sections/final-cta';

const meta = {
  title: 'Sections/Landing sections',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Hero: Story = { render: () => <HeroSection /> };
export const Categories: Story = { render: () => <CourseCategories /> };
export const Featured: Story = { render: () => <FeaturedCourse /> };
export const Steps: Story = { render: () => <HowItWorks /> };
export const Testimonial: Story = { render: () => <TestimonialSection /> };
export const Community: Story = { render: () => <CommunitySection /> };
export const Contact: Story = { render: () => <ContactSection /> };
export const CallToAction: Story = { render: () => <FinalCta /> };

export const navigation = [
  { label: 'Courses', href: '#courses' },
  { label: 'For Teams', href: '#contact' },
  { label: 'Community', href: '#community' },
  { label: 'About', href: '#how-it-works' },
] as const;

export const learningSteps = [
  {
    id: 'choose',
    number: '01',
    title: 'Choose your focus',
    description:
      'Find courses based on the skill you want to build, not endless content categories.',
    shape: 'focus',
  },
  {
    id: 'learn',
    number: '02',
    title: 'Learn from experience',
    description: 'Follow concise lessons created by professionals who use these skills.',
    shape: 'experience',
  },
  {
    id: 'practice',
    number: '03',
    title: 'Put it into practice',
    description:
      'Every course includes practical exercises designed to turn knowledge into action.',
    shape: 'practice',
  },
] as const;

export const metrics = [
  { value: '24K+', description: 'active learners' },
  { value: '120+', description: 'expert-led courses' },
  { value: '92%', description: 'complete their first course' },
] as const;

export const learnerAvatars = [
  '/images/learner-ava.webp',
  '/images/learner-noah.webp',
  '/images/learner-ken.webp',
  '/images/learner-sam.webp',
] as const;

// Each layout uses the photo rectangles from its own Figma canvas.
export const communityPhotos = [
  {
    id: 'teacher',
    image: '/images/community-teacher.webp',
    sourceAspectRatio: 560 / 374,
    x: 35,
    y: 106,
    width: 103,
    height: 154,
    mobile: { x: 22, y: 62, width: 72, height: 96 },
  },
  {
    id: 'team',
    image: '/images/community-team.webp',
    sourceAspectRatio: 560 / 373,
    x: 0,
    y: 273,
    width: 138,
    height: 207,
    mobile: { x: 0, y: 166, width: 94, height: 129 },
  },
  {
    id: 'library',
    image: '/images/community-library.webp',
    sourceAspectRatio: 560 / 373,
    x: 154,
    y: 25,
    width: 102,
    height: 171,
    mobile: { x: 106, y: 0, width: 72, height: 107 },
  },
  {
    id: 'conversation',
    image: '/images/community-conversation.webp',
    sourceAspectRatio: 560 / 839,
    x: 154,
    y: 208,
    width: 102,
    height: 173,
    mobile: { x: 106, y: 114, width: 72, height: 109 },
  },
  {
    id: 'studying',
    image: '/images/community-studying.webp',
    sourceAspectRatio: 560 / 747,
    x: 154,
    y: 394,
    width: 102,
    height: 129,
    mobile: { x: 106, y: 230, width: 72, height: 80 },
  },
  {
    id: 'graduate',
    image: '/images/community-graduate.webp',
    sourceAspectRatio: 560 / 847,
    x: 273,
    y: 33,
    width: 102,
    height: 138,
    mobile: { x: 190, y: 13, width: 72, height: 86 },
  },
  {
    id: 'workspace',
    image: '/images/community-workspace.webp',
    sourceAspectRatio: 560 / 373,
    x: 273,
    y: 183,
    width: 102,
    height: 139,
    mobile: { x: 190, y: 107, width: 72, height: 86 },
  },
  {
    id: 'online',
    image: '/images/community-online.webp',
    sourceAspectRatio: 560 / 374,
    x: 273,
    y: 334,
    width: 102,
    height: 154,
    mobile: { x: 190, y: 201, width: 72, height: 96 },
  },
  {
    id: 'campus',
    image: '/images/community-campus.webp',
    sourceAspectRatio: 560 / 373,
    x: 392,
    y: 86,
    width: 128,
    height: 205,
    mobile: { x: 274, y: 46, width: 88, height: 128 },
  },
  {
    id: 'speaker',
    image: '/images/community-speaker.webp',
    sourceAspectRatio: 560 / 698,
    x: 392,
    y: 303,
    width: 102,
    height: 133,
    mobile: { x: 274, y: 181, width: 72, height: 84 },
  },
] as const;

export const footerGroups = [
  {
    title: 'Explore',
    links: [
      { label: 'Courses', href: '#featured-course' },
      { label: 'Categories', href: '#courses' },
      { label: 'Instructors', href: '#community' },
      { label: 'For Teams', href: '#contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#how-it-works' },
      { label: 'Careers', href: '#contact' },
      { label: 'Journal', href: '#community' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#contact' },
      { label: 'Contact', href: '#contact' },
      { label: 'Terms', href: '#contact' },
      { label: 'Privacy', href: '#contact' },
    ],
  },
] as const;

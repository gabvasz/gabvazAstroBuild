export type Skill = {
  id: string;
  title: string;
  text: string;
  children?: Skill[];
};

export const skills: Skill = {
  id: 'web',
  title: 'web development',
  text: 'Design and front-end development for the web.',
  children: [
    {
      id: 'wordpress',
      title: 'WordPress',
      text: 'Custom themes, plugins, ACF and Gutenberg blocks.',
      children: [
        { id: 'woo', title: 'WooCommerce', text: 'Custom stores and checkout flows.' },
        { id: 'acf', title: 'ACF Pro', text: 'Flexible content models and options pages.' },
        { id: 'gutenberg', title: 'Gutenberg blocks', text: 'Custom blocks and block patterns.' },
        { id: 'integrations', title: 'Integrations', text: 'REST API, CRMs, forms and third-party services.' },
        { id: 'headless', title: 'Headless CMS', text: 'WordPress as a backend for Next.js or Astro.' },
        { id: 'tracking', title: 'Content and Tracking', text: 'GA4, GTM, schema and technical SEO.' },
      ],
    },
    {
      id: 'js',
      title: 'JavaScript frameworks',
      text: 'Component-based front ends.',
      children: [{ id: 'react', title: 'React, TypeScript, Next.js', text: 'App architecture and SSR.' }],
    },
    {
      id: 'ai',
      title: 'AI automation',
      text: 'Agents and workflows that remove repetitive work.',
      children: [{ id: 'claude', title: 'Claude Agents', text: 'Agent-assisted development workflows.' }],
    },
    { id: 'astro', title: 'Astro', text: 'Fast, content-focused sites with islands.' },
  ],
};

// 3. Helpers (AFTER the data)
export type FlatSkill = Skill & { parentId?: string };

export function flattenSkills(n: Skill, parentId?: string): FlatSkill[] {
  return [
    { ...n, parentId },
    ...(n.children ?? []).flatMap((c) => flattenSkills(c, n.id)),
  ];
}

export const allSkills: FlatSkill[] = flattenSkills(skills);
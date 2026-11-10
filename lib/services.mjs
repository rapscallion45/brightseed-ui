export const services = [
  {
    id: 'website-development',
    title: 'Website design and development',
    image: '/design/agency/website-design-development.jpg',
    imageWidth: 3908,
    imageHeight: 4885,
    description: 'Clear, responsive websites that explain your offer and help customers take the next step.',
    intro: 'Your website should help people understand your business, find what they need and get in touch. We bring content, design and development together around that journey.',
    sections: [
      { title: 'Start with the customer journey', text: 'We work through who the site is for, what visitors need to know and the action you want them to take. That informs the page structure, content and navigation before development begins.' },
      { title: 'Build for everyday use', text: 'The scope can include a new business website, a redesign or a storefront. We plan responsive layouts, accessible interactions and a content workflow that suits the people maintaining the site.' },
      { title: 'Make launch a clear handover', text: 'We agree which pages, integrations and devices are in scope, then review the site against that plan. Existing URLs, page metadata and redirects are part of planning a replacement site.' },
      { title: 'Plan what comes next', text: 'Hosting, content updates, third-party services and ongoing support affect the total cost. We discuss these alongside the build so you can choose an approach you can maintain.' },
    ],
    deliverables: ['Page structure and content priorities', 'Responsive interface design and development', 'Agreed integrations and content editing', 'Launch checks and a maintenance plan'],
    questions: [
      { question: 'Can you improve an existing website?', answer: 'Yes. Share the current site and the problems you want to solve. We can discuss whether a focused improvement or a larger rebuild makes sense.' },
      { question: 'What does a website cost?', answer: 'The estimate depends on the number and complexity of pages, content preparation, integrations and editing needs. We agree the scope before providing a project estimate.' },
    ],
    projectSlugs: ['tacoma-sound', 'eurocham-myanmar', 'conyat-create'],
  },
  {
    id: 'web-app-development',
    title: 'Custom web application development',
    image: '/design/agency/custom-web-app-development.jpg',
    imageWidth: 3543,
    imageHeight: 2365,
    description: 'Purpose-built web applications for your customers and team, from a first prototype to a working product.',
    intro: 'When an off-the-shelf tool does not fit the way you work, a custom application can connect the right people, data and tasks. Start with a specific problem and a useful first release.',
    sections: [
      { title: 'Define a useful first version', text: 'We identify the users, core workflow and decisions the product needs to support. A prototype can help test the journey before investing in the full application.' },
      { title: 'Connect the interface and the data', text: 'Depending on your scope, a web app may need accounts, permissions, dashboards or integrations. We consider these together so the interface reflects what each user should be able to see and do.' },
      { title: 'Build and review in stages', text: 'A staged delivery plan makes progress visible and creates opportunities to review working features. Priorities and acceptance criteria help keep the next release focused.' },
      { title: 'Prepare to operate the product', text: 'A working application needs more than a launch. We discuss deployment, backups, monitoring, dependencies and support, with responsibilities and recurring costs made clear in the project scope.' },
    ],
    deliverables: ['User journeys and an agreed first-release scope', 'Interface, application logic and data model', 'Integrations and permission checks within scope', 'Testing, deployment and handover'],
    questions: [
      { question: 'Should we start with a prototype or an MVP?', answer: 'A prototype helps explore an interaction or idea. A minimum viable product lets real users complete a useful task. The right starting point depends on what you need to learn.' },
      { question: 'Can you connect an app to our existing tools?', answer: 'We can assess the available APIs, data access and integration requirements. Share the systems you use so we can identify constraints before committing to an approach.' },
    ],
    projectSlugs: ['bugtrakr', 'fpl-frog'],
  },
  {
    id: 'ai-development',
    title: 'AI development and integration',
    image: '/design/agency/ai-development.png',
    imageWidth: 1632,
    imageHeight: 918,
    description: 'Practical AI features and workflows built around a defined task, with attention to data, reliability and human oversight.',
    intro: 'Start with the work you want to improve. We help you explore where AI could be useful, test an approach and plan how it would fit into your website, application or business workflow.',
    sections: [
      { title: 'Choose a task worth testing', text: 'Possible starting points include finding information, extracting fields from documents or drafting material for review. We first consider whether a simpler rule or existing tool would solve the problem.' },
      { title: 'Understand the data and boundaries', text: 'Before a prototype uses business information, define what it may access, which providers may process it and what users are allowed to do. The scope should include retention, permissions and actions that require approval.' },
      { title: 'Evaluate before expanding', text: 'A promising demonstration is a starting point. Test representative examples, difficult inputs and cases where the system should decline or ask for help. Review accuracy, response time and cost against the task you set out to improve.' },
      { title: 'Integrate with a way to recover', text: 'Plan human review for consequential actions, a fallback when the model or service is unavailable and a way to observe errors. Wider rollout should follow evidence from the pilot, with clear operating responsibilities.' },
    ],
    deliverables: ['A defined use case and feasibility assessment', 'A focused prototype and evaluation examples', 'An integration plan with data boundaries', 'A staged rollout and human review approach'],
    questions: [
      { question: 'Do we need to train a model from scratch?', answer: 'Not necessarily. An existing model, a connection to your information or a conventional automation may be a better starting point. The decision should follow the task, data and evaluation results.' },
      { question: 'Can AI run a process without a person checking it?', answer: 'That depends on the consequences of an error and the evidence from testing. Start with appropriate review and limits, especially where a system can change records or send messages.' },
    ],
    projectSlugs: [],
  },
];
export function getService(slug) {
  return services.find((service) => service.id === slug) || null;
}

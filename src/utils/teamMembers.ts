import anna from '@assets/normal_images/anna.jpg';
import lena from '@assets/normal_images/lena.jpeg';
import oleg from '@assets/normal_images/oleg.png';

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
  github: string;
  contributions: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Lenok (Kupina Olena)',
    role: 'front-end developer',
    bio: 'Olena is passionate front-end developer who grasps information on the fly and is ready to gain experience for future career',
    photo: lena,
    github: 'https://github.com/lenok-kup',
    contributions:
      'is responsible for specific tasks such as user registration, displaying the personal account and compiling this page. Offers ideas for easier code writing and supports the team',
  },
  {
    name: 'Program wizard (Khizhnyakova Anna)',
    role: 'front-end developer and QA',
    bio: 'Anna is a passionate QA Engineer with more than 5 years of experience. She takes on difficult tasks during our work and combine it with her main job ',
    photo: anna,
    github: 'https://github.com/AnnaKh85',
    contributions:
      'is a specialist in API requests and was involved in setting up commerce tools, as well as all routing on our website. She also took responsibility for unit tests and provided advice on the appearance of the site',
  },
  {
    name: 'Letmezep (Oleg Zhapov)',
    role: 'front-end developer and team leader',
    bio: 'Oleg is a true programming wizard and leader from God. Specializes in React, although he wanted to study Angular',
    photo: oleg,
    github: 'https://github.com/letmezep',
    contributions:
      ', as the team leader, is responsible for organizational issues and cross-check checks, takes on complex tasks of logging in users and displaying products, as well as adding them to CommerceTools',
  },
];

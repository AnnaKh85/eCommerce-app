import './AboutUs.css';

import schoolLogo from '@assets/rs_school_js.svg';

import { teamMembers } from '../../utils/teamMembers';

const AboutUs: React.FC = () => {
  return (
    <div className="about-us-wrapper">
      <h1 className="about-us-title">About Us</h1>
      <p className="about-us-collaboration">
        Team members hold meetings every two or three days to discuss problems, assign tasks and provide assistance at
        the request of one of the team members. There are individual tasks that certain members of the team perform. For
        example, Anya is responsible for the unit tests and site design, as it is well received. Oleg plays a guiding
        role, engages in github and develops site logic. Lena is responsible for comprehensive work on specific
        components and parts of the site. All team members complement each other and successfully work on site creation.
      </p>
      <div className="about-us-school-logo">
        <a href="https://rs.school/courses" target="_blank" rel="noreferrer" className="about-us-school-link">
          <img src={schoolLogo} alt="school-logo" />
        </a>
      </div>
      <div className="about-us-contribution">
        <h2 className="about-us-contribution-title">Contribution</h2>
        {teamMembers.map((member, index) => (
          <p key={index} className="about-us-block">
            {' '}
            <a href={member.github} target="_blank" rel="noreferrer" className="about-us-link-github">
              {member.name}
            </a>{' '}
            {member.contributions}
          </p>
        ))}
      </div>
      {teamMembers.map((member, index) => (
        <div key={index} className="about-us-employee">
          <div className="about-us-photo">
            <img src={member.photo} alt={member.name} className="photo" />
          </div>
          <div className="about-us-personal-info">
            <p className="about-us-name">{member.name}</p>
            <p className="about-us-position">{member.role}</p>
          </div>
          <p className="about-us-bio">{member.bio}</p>
        </div>
      ))}
    </div>
  );
};

export default AboutUs;

import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import PillButton from "@/components/PillButton";
import { faEnvelope, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Landing = () => {
  const experience = [
    {
      date: "July 2022",
      org: "Infosys",
      designation: "Mobile Application Developer",
    },
    {
      date: "Sep 2021",
      org: "RowthTech (Pvt) Ltd",
      designation: "Mobile Application Developer / Team Lead",
    },
    {
      date: "Feb 2021",
      org: "Suffescom Solutions Pvt. Ltd",
      designation: "React Native Developer",
    },
    {
      date: "June 2019",
      org: "AppsMaven",
      designation: "Android Developer / React Native Developer",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col py-16 items-center px-4 lg:px-0">
      <section className="w-full lg:w-1/2">
        <h1 className="text-2xl lg:text-4xl">
          Hi, I&apos;m <b>Rishabh Sehgal</b>
        </h1>
        <h2 className="text-primary font-black text-2xl lg:text-4xl">
          Mobile Application Expert
        </h2>
        <div
          id="social-buttons"
          className="mt-4 overflow-x-scroll flex lg:overflow-x-hidden"
        >
          <PillButton icon={faGithub} title="Github" />
          <PillButton
            className="ms-2 lg:ms-4"
            icon={faLinkedin}
            title="LinkedIn"
          />
          <PillButton
            className="ms-2 lg:ms-4"
            icon={faEnvelope}
            title="Email"
          />
        </div>
        <p id="about" className="mt-4 text-white-light">
          I&apos;m a software developer with a problem solving attitude. I am
          focused to provide maximum productivity with minimal efforts and open
          to learning new technologies with changing times.
        </p>
        <hr className="my-4 text-white-light" />
      </section>
      <section className="w-full lg:w-1/2">
        <strong className="text-xl lg:text-2xl">My Timeline</strong>

        <div className="timeline">
          <ul>
            {experience.map((item, index) => {
              return (
                <li key={index}>
                  <div className="date">
                    <h4>{item.date}</h4>
                  </div>
                  <div className="point" />
                  <div className="content">
                    <h3>
                      <FontAwesomeIcon icon={faBriefcase} /> {item.org}
                    </h3>
                    <p>{item.designation}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Landing;

import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import PillButton from "@/components/PillButton";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Landing = () => {
  return (
    <main className="flex min-h-screen flex-col py-16 items-center px-4 lg:px-0">
      <section className="lg:w-1/2">
        <h1 className="text-2xl lg:text-4xl">
          Hi, I&apos;m <b>Rishabh Sehgal</b>
        </h1>
        <h1 className="text-primary font-black text-2xl lg:text-4xl">
          Mobile Application Expert
        </h1>
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
        <hr className="mt-4 text-white-light" />
      </section>
    </main>
  );
};

export default Landing;

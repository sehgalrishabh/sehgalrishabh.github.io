"use client";
import React from "react";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import PillButton from "@/components/PillButton";
import {
  faEnvelope,
  faBriefcase,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import projects from "../data/projects.json";
import contributions from "../data/contributions.json";
import TechnologiesWrapper from "@/components/TechnologiesWrapper";

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

  const technologies = [
    {
      image: "../assets/android.png",
      title: "Android",
    },
    {
      image: "../assets/angular.png",
      title: "Angular",
    },
    {
      image: "../assets/aws.png",
      title: "Amazon Web Services",
    },
    {
      image: "../assets/azure.png",
      title: "Microsoft Azure",
    },
    {
      image: "../assets/bootstrap.png",
      title: "Bootstrap",
    },
    {
      image: "../assets/es-ecmascript-logo.png",
      title: "ES",
    },
    {
      image: "../assets/firebase.png",
      title: "Firebase",
    },
    {
      image: "../assets/Flutter.png",
      title: "Flutter",
    },
    {
      image: "../assets/google-cloud.png",
      title: "Google Cloud",
    },
    {
      image: "../assets/graphql.png",
      title: "GraphlQL",
    },
    {
      image: "../assets/javascript.png",
      title: "Javascript",
    },
    {
      image: "../assets/laravel.png",
      title: "Laravel",
    },
    {
      image: "../assets/material-ui.png",
      title: "Material UI",
    },
    {
      image: "../assets/mongodb.png",
      title: "MongoDB",
    },
    {
      image: "../assets/mysql.png",
      title: "MySQL",
    },
    {
      image: "../assets/node.svg",
      title: "NodeJS",
    },
    {
      image: "../assets/react.png",
      title: "ReactJS/React-Native",
    },
    {
      image: "../assets/redis.png",
      title: "Redis",
    },
    {
      image: "../assets/socket-io.svg",
      title: "SocketIO",
    },
    {
      image: "../assets/swift.png",
      title: "Swift",
    },
    {
      image: "../assets/twilio.png",
      title: "Twilio",
    },

    {
      image: "../assets/typescript.png",
      title: "TypeScript",
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
          <Link
            href={"https://github.com/sehgalrishabh/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <PillButton icon={faGithub} title="Github" />
          </Link>
          <Link
            href={"https://www.linkedin.com/in/rshbhshgl/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <PillButton
              className="ms-2 lg:ms-4"
              icon={faLinkedin}
              title="LinkedIn"
            />
          </Link>
          <Link href={"mailto:rishabbh004@gmail.com"}>
            <PillButton
              className="ms-2 lg:ms-4"
              icon={faEnvelope}
              title="Email"
            />
          </Link>
        </div>
        <p id="about" className="mt-4 text-white-light">
          I&apos;m a software developer with a problem solving attitude. I am
          focused to provide maximum productivity with minimal efforts and keen
          to learn new technologies with changing times.
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
        <hr className="my-4 text-white-light" />
      </section>

      <section className="w-full lg:w-1/2">
        <strong className="text-xl lg:text-2xl">Projects</strong>
        <div className="flex flex-row">
          {/* <span className="-ml-[32px] p-[16px] cursor-pointer mt-[68px]">
            <FontAwesomeIcon icon={faChevronLeft} />
          </span> */}
          {/* Projects List */}
          <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
            {projects.map((item, index) => (
              <div
                key={index}
                className="p-4 cursor-pointer shadow-md rounded-xl duration-500 hover:scale-110 hover:shadow-xl bg-dark-accent"
              >
                <div>
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p className="mt-2 line-clamp-3">{item.desc}</p>
                  <div className="additional-data mt-2 hidden">
                    <p>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <span className="-mr-[32px] p-[16px] cursor-pointer mt-[68px]">
            <FontAwesomeIcon icon={faChevronRight} />
          </span> */}
        </div>
        <hr className="my-4 text-white-light" />
      </section>

      {/* <section className="w-full lg:w-1/2">
        <strong className="text-xl lg:text-2xl">Contributions</strong>
        <ul className="showcase columns-2">
          {contributions.map((item, index) => {
            return (
              <li
                key={index}
                className="p-4 cursor-pointer transition-all duration-300 transform"
              >
                <div className="bg-dark-accent rounded-lg shadow-md p-4 h-full overflow-hidden transition-all duration-300">
                  <h2 className="text-xl font-bold"> {item.title}</h2>
                  <p className="mt-2 line-clamp-3">{item.desc}</p>
                </div>
                <div className="additional-data mt-2 hidden">
                  <p>
                    sdjshdjksjdsda sdjshdjksjdsda sdjshdjksjdsda sdjshdjksjdsda
                    sdjshdjksjdsda
                  </p>
                  <PillButton icon={faLink} title="Pub.dev" />
                </div>
              </li>
            );
          })}
        </ul>
        <hr className="my-4 text-white-light" />
      </section> */}

      <section className="w-full lg:w-1/2">
        <strong className="text-xl lg:text-2xl">Technologies</strong>
        <TechnologiesWrapper technologies={technologies} />
        <hr className="my-4 text-white-light" />
      </section>
    </main>
  );
};

export default Landing;

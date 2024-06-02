"use client";
import React from "react";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import PillButton from "@/components/PillButton";
import {
  faEnvelope,
  faBriefcase,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import projects from "../data/projects.json";

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
      </section>
      <section className="w-full lg:w-1/2">
        <div className="flex flex-row">
          <span className="-ml-[32px] p-[16px] cursor-pointer mt-[68px]">
            <FontAwesomeIcon icon={faChevronLeft} />
          </span>
          {/* Projects List */}
          <ul className="showcase overflow-x-scroll flex space-x-4 relative">
            {projects.map((item, index) => (
              <li
                key={index}
                className="flex-shrink-0 w-1/2 p-4 cursor-pointer transition-all duration-300 transform"
              >
                <div className="bg-dark-accent rounded-lg shadow-md p-4 h-full overflow-hidden transition-all duration-300">
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p className="mt-2 line-clamp-3">{item.desc}</p>
                  <div className="additional-data mt-2 hidden">
                    <p>
                      {item.desc} {item.desc} {item.desc}
                      {item.desc} {item.desc} {item.desc}
                      {item.desc} {item.desc} {item.desc}
                      {item.desc} {item.desc} {item.desc}
                      {item.desc} {item.desc} {item.desc}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <span className="-mr-[32px] p-[16px] cursor-pointer mt-[68px]">
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
        </div>
      </section>
    </main>
  );
};

export default Landing;

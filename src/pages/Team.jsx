"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  faUsers,
  faArrowRight,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const teamMembers = [
  {
    name: "Sanjoy Ghosh",
    role: "Founder & Tutor",
    bio: "Master's in Data Analytics · Google Certified Educator · B.Ed. from the University of Calcutta",
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQEvAIqzUKuexw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1694203412946?e=2147483647&v=beta&t=Tpfq5blf1Qy60AyYc83DX0waBHX-f12CtCgcnS2cpL0",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
      facebook: "#",
      instagram: "#",
    },
  },
];

const creatorInfo = {
  name: "Sulagna Pradhan",
  role: "Creator Of This Page",
  bio: "Built the BitLearning platform under Sanjoy Sir's guidance",
  bion: "I'm grateful to Sanjoy Sir for trusting me with this opportunity to create BitLearning.",
  image: "/me.jpg",
  social: { instagram: "#", github: "#" },
};

const SocialIcon = ({ href, icon }) => (
  <a
    href={href}
    className="text-gray-500 hover:text-indigo-600 transition"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FontAwesomeIcon icon={icon} className="w-5 h-5" />
  </a>
);

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView]);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      ref={ref}
      id="team-section"
      className="min-h-screen py-24 bg-gradient-to-br from-[#f2f2f2] via-[#e0e0e0] to-[#d4d4d4] text-gray-900"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full mb-4 shadow">
            <FontAwesomeIcon icon={faUsers} className="mr-2 w-4 h-4" />
            <span className="font-medium">Our Team</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The <span className="text-blue-600">Minds</span> Behind{" "}
            <span className="text-green-600">BitLearning</span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Passionate professionals dedicated to unlocking every student's
            potential.
          </p>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        {/* Primary Team Member - Centered */}
        <div className="flex justify-center mb-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={controls}
            custom={1}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col max-w-md w-full"
          >
            <div className="relative h-64 w-full group">
              <img
                src={teamMembers[0].image}
                alt={teamMembers[0].name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xl font-bold text-white">
                  {teamMembers[0].name}
                </h3>
                <p className="text-indigo-200">{teamMembers[0].role}</p>
              </div>
            </div>

            <div className="p-6 flex-grow">
              <p className="text-gray-600 mb-4">{teamMembers[0].bio}</p>

              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-3">
                    {teamMembers[0].social.linkedin && (
                      <SocialIcon
                        href={teamMembers[0].social.linkedin}
                        icon={faLinkedin}
                      />
                    )}
                    {teamMembers[0].social.twitter && (
                      <SocialIcon
                        href={teamMembers[0].social.twitter}
                        icon={faTwitter}
                      />
                    )}
                    {teamMembers[0].social.github && (
                      <SocialIcon
                        href={teamMembers[0].social.github}
                        icon={faGithub}
                      />
                    )}
                    {teamMembers[0].social.facebook && (
                      <SocialIcon
                        href={teamMembers[0].social.facebook}
                        icon={faFacebookF}
                      />
                    )}
                    {teamMembers[0].social.instagram && (
                      <SocialIcon
                        href={teamMembers[0].social.instagram}
                        icon={faInstagram}
                      />
                    )}
                  </div>
                  <a
                    href="#"
                    className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center text-sm font-medium"
                  >
                    <FontAwesomeIcon icon={faLink} className="w-4 h-4 mr-1" />
                    Portfolio
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Developer Credit - Smaller and Below */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={controls}
          custom={2}
          className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-12"
        >
          <div className="p-6">
            <div className="flex items-center mb-4">
              <img
                src={creatorInfo.image}
                alt={creatorInfo.name}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-medium text-gray-900">
                  {creatorInfo.name}
                </h4>
                <p className="text-sm text-indigo-600">{creatorInfo.role}</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">{creatorInfo.bio}</p>
            <p className="text-gray-500 text-sm italic">{creatorInfo.bion}</p>

            <div className="flex space-x-3 mt-4">
              {creatorInfo.social.instagram && (
                <SocialIcon
                  href={creatorInfo.social.instagram}
                  icon={faInstagram}
                />
              )}
              {creatorInfo.social.github && (
                <SocialIcon href={creatorInfo.social.github} icon={faGithub} />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

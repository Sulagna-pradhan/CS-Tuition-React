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
  {
    name: "Sulagna Pradhan",
    role: "Creator of This Page",
    bio: "Feel free to explore all features and reach out with any feedback or questions!",
    bion: "I built BitLearning under the guidance of Sanjoy Sir. I'm grateful to him for trusting me with this opportunity.",
    image: "/me.jpg",
    social: { instagram: "#", github: "#" },
  },
];

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

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              variants={fadeUp}
              initial="hidden"
              animate={controls}
              custom={index + 1}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Rest of the card content remains the same */}
              <div className="relative h-64 w-full group">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">
                    {member.name}
                  </h3>
                  <p className="text-indigo-200">{member.role}</p>
                </div>
              </div>

              <div className="p-6 flex-grow">
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <p className="text-gray-600 mb-4 font-semibold">
                  {member.bion}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      {member.social.linkedin && (
                        <SocialIcon
                          href={member.social.linkedin}
                          icon={faLinkedin}
                        />
                      )}
                      {member.social.twitter && (
                        <SocialIcon
                          href={member.social.twitter}
                          icon={faTwitter}
                        />
                      )}
                      {member.social.github && (
                        <SocialIcon
                          href={member.social.github}
                          icon={faGithub}
                        />
                      )}
                      {member.social.facebook && (
                        <SocialIcon
                          href={member.social.facebook}
                          icon={faFacebookF}
                        />
                      )}
                      {member.social.instagram && (
                        <SocialIcon
                          href={member.social.instagram}
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
          ))}
        </div>

        {/* CTA Section */}
        {/*
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={controls}
          className="mt-20 bg-white rounded-xl p-8 md:p-12 shadow-lg max-w-4xl mx-auto text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Join Our Team of Educators
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're always looking for passionate educators to join our mission.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/careers"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-500 transition rounded-md text-white font-medium shadow-md hover:shadow-lg"
            >
              View Open Positions
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-4 h-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-gray-300 bg-white hover:border-indigo-500 text-gray-700 hover:text-indigo-600 rounded-md font-medium transition-colors shadow-sm hover:shadow-md"
            >
              Contact HR Team
            </a>
          </div>
        </motion.div>
        */}
      </div>
    </section>
  );
}
